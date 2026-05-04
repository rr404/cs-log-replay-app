# CrowdSec Detection Pipeline: Code Map

This document maps every component involved in turning raw log lines into alerts — from acquisition through parsing, bucket filling, and overflow. It is written to support porting the `crowdsec -dsn` flow to a self-contained JavaScript implementation.

---

## Overview: Five Stages

```
[Raw log lines]
      │
      ▼
[1. Acquisition]  ─ builds pipeline.Event{Line{Raw, Src, Labels}}
      │
      ▼  logLines chan
[2. Parser]       ─ extracts fields, enriches, normalises
      │
      ▼  inEvents chan
[3. Bucket pouring] ─ matches events to scenarios, fills buckets
      │
      ▼  overflow chan (AllOut)
[4. Overflow / Alert creation] ─ produces RuntimeAlert / models.Alert
      │
      ▼
[5. Post-overflow parser + output] ─ whitelist check, push to LAPI
```

---

## Stage 1 – Acquisition

**Entry point:** `cmd/crowdsec/crowdsec.go`

### `initCrowdsec()` — `cmd/crowdsec/crowdsec.go:28`
Top-level init. Calls `LoadParsers`, `LoadBuckets`, and `LoadAcquisition`. Returns `*parser.Parsers` and a slice of `DataSource`s ready to be started.

### `runCrowdsec()` — `cmd/crowdsec/crowdsec.go:139`
Creates the two shared channels (`logLines` and `inEvents`), starts all goroutine pools (parser routines, bucket routines, output routines), then calls `acquisition.StartAcquisition()` to begin feeding logs.

### `acquisition.StartAcquisition()` — `pkg/acquisition/acquisition.go`
Starts each configured datasource. Each datasource reads log lines and writes `pipeline.Event` values to the `logLines` channel.

### `acquisition.LoadAcquisitionFromDSN()` — `pkg/acquisition/acquisition.go`
DSN-mode entry point (used with `crowdsec -dsn file:///path -type syslog`). Parses the DSN string (e.g. `file://`, `syslog://`, `cloudwatch://`), finds the matching datasource module, and calls `ConfigureByDSN()` on it. This is the function to replicate for a JS "paste logs here" input.

### `pipeline.Line` — `pkg/pipeline/line.go`
The raw-input struct attached to every event:
```go
type Line struct {
    Raw     string            // the verbatim log line
    Src     string            // origin (file path, etc.)
    Time    time.Time         // acquisition timestamp
    Labels  map[string]string // e.g. {"type": "syslog"}
    Process bool
    Module  string            // datasource module name ("file", "syslog", …)
}
```

### `pipeline.Event` — `pkg/pipeline/event.go`
The central data structure that flows through every stage:
```go
type Event struct {
    Type        int                // LOG=0, OVFLW=1, APPSEC=2
    ExpectMode  int                // LIVE or TIMEMACHINE
    Line        Line               // original raw input
    Parsed      map[string]string  // fields extracted by grok
    Enriched    map[string]string  // GeoIP, DNS, ASN, etc.
    Unmarshaled map[string]any     // result of JSON unmarshal
    Meta        map[string]string  // normalised fields (source_ip, etc.)
    Stage       string             // current parser stage
    Process     bool               // false = discard
    Whitelisted bool
    MarshaledTime string           // ISO timestamp from log (timemachine mode)
    Overflow    pipeline.RuntimeAlert // filled when Type==OVFLW
}
```

---

## Stage 2 – Parsing

**Files:** `cmd/crowdsec/parse.go`, `pkg/parser/runtime.go`, `pkg/parser/node.go`

### `runParse()` — `cmd/crowdsec/parse.go:59`
Goroutine pool worker. Reads from `logLines`, calls `parseEvent()`, and if the result is non-nil writes to `inEvents`.

### `parseEvent()` — `cmd/crowdsec/parse.go:15`
Wrapper around `parser.Parse()`. Discards APPSEC events (they go straight to output), checks `event.Process`, runs metrics, and drops whitelisted events.

### `parser.Parse()` — `pkg/parser/runtime.go:233`
Core parsing engine. Drives the event through ordered stages (e.g. `s00-raw`, `s01-parse`, `s02-enrich`). For each stage it iterates over `[]Node`:
- Skips nodes whose `Stage` field doesn't match the current stage.
- Calls `node.process()` on matching nodes.
- If a node succeeds and has `OnSuccess: next_stage`, advances the event to the next stage.
- Sets `event.Process = true` only when all stages have been passed successfully.

### `node.process()` — `pkg/parser/node.go`
Executes a single parser node:
1. Evaluates the node's `filter` expression against the event — skips if false.
2. Runs grok pattern against `event.Line.Raw` — populates `event.Parsed`.
3. Processes sub-nodes (leaf nodes) recursively.
4. Runs statics: calls enrichment methods or sets `Parsed`/`Meta`/`Enriched` fields.
5. Checks whitelist; marks `event.Whitelisted` if matched.

### `RuntimeStatic.Apply()` — `pkg/parser/runtime.go:118`
Executes one static assignment. Evaluates an optional expression, then writes the result into `event.Parsed[key]`, `event.Meta[key]`, `event.Enriched[key]`, or calls an enrichment method (GeoIP, DNS, ParseDate, UnmarshalJSON, …).

### Enrichment functions — `pkg/parser/enrich*.go`
Called by `Apply()` via the method name in a static:
- `enrich_geoip.go` — fills `Enriched[IsoCode]`, `Enriched[ASNOrg]`, `Enriched[Latitude/Longitude]`
- `enrich_dns.go` — reverse DNS lookup into `Enriched`
- `enrich_date.go` — parses log timestamps into `event.MarshaledTime`
- `enrich_unmarshal.go` — JSON decode into `event.Unmarshaled`

### `parser.LoadParsers()` — `pkg/parser/unix_parser.go`
Loads all parser YAML files from the hub and compiles them into `[]Node`. Returns a `*Parsers` that contains both the normal parser nodes and the post-overflow parser nodes.

---

## Stage 3 – Bucket Pouring (Scenario Matching)

**Files:** `cmd/crowdsec/pour.go`, `pkg/leakybucket/manager_load.go`, `pkg/leakybucket/manager_run.go`, `pkg/leakybucket/bucket.go`

### `runPour()` — `cmd/crowdsec/pour.go:38`
Goroutine pool worker. Reads from `inEvents` and calls `leaky.PourItemToHolders()`. In timemachine mode, triggers garbage collection every 5000 events.

### `leaky.LoadBuckets()` — `pkg/leakybucket/manager_load.go:184`
Loads all scenario YAML files from the hub. For each scenario file, calls `loadBucketFactoriesFromFile()` which decodes the YAML into a `BucketSpec` and calls `BucketFactory.LoadBucket()`. Returns `[]BucketFactory` (the compiled scenario templates) and a shared `chan pipeline.Event` for all overflows.

### `BucketSpec` — `pkg/leakybucket/manager_load.go:29`
The declarative YAML schema for a scenario:
```go
type BucketSpec struct {
    Name                string    // e.g. "crowdsecurity/ssh-bf"
    Type                string    // "leaky", "trigger", "counter", "conditional", "bayesian"
    Capacity            int       // max tokens before overflow; -1 = unlimited
    LeakSpeed           string    // "5m" means 1 token leaks every 5 minutes
    Filter              string    // expr evaluated against Event — determines eligibility
    GroupBy             string    // expr for partition key, typically evt.Meta["source_ip"]
    Distinct            string    // only count distinct values
    ConditionalOverflow string    // expr that triggers overflow when true
    Duration            string    // fixed lifetime for counter buckets
    Blackhole           string    // suppress duplicate overflows for this duration
    OverflowFilter      string    // final gate expr before alert is emitted
    CancelOnFilter      string    // kills bucket when this expr matches
    Labels              map[string]any // attached to the alert
    Reprocess           bool      // re-inject overflow event into the parser
    // Bayesian fields omitted for brevity
}
```

### `BucketFactory` — `pkg/leakybucket/manager_load.go:57`
The compiled, reusable template produced from a `BucketSpec`. Holds the compiled expressions and processor list:
```go
type BucketFactory struct {
    Spec           BucketSpec
    RunTimeFilter  *vm.Program  // compiled Filter
    RunTimeGroupBy *vm.Program  // compiled GroupBy
    leakspeed      time.Duration
    duration       time.Duration
    ret            chan pipeline.Event // shared overflow output channel
    processors     []Processor        // hooks: uniq, blackhole, cancel_on, overflow_filter, etc.
    scenarioHash   string
    Simulated      bool
}
```

### `BucketFactory.LoadBucket()` — `pkg/leakybucket/manager_load.go:355`
Validates and compiles a `BucketFactory` for runtime: parses durations, compiles filter and groupby expressions, selects and instantiates the type-specific processors (`LeakyType`, `TriggerType`, etc.), appends optional processors (uniq, cancel_on, overflow_filter, blackhole, conditional, bayesian), and loads any data files.

### `BucketFactory.BucketKey()` — `pkg/leakybucket/manager_load.go:391`
Computes the storage key for a bucket instance: `sha1(filter + "\x00" + groupby_value + "\x00" + name)`. This is the partition key — one unique bucket per (scenario, groupby-value) pair.

### Bucket types — `pkg/leakybucket/buckettype.go`
| Type | Capacity | Overflow trigger |
|------|----------|-----------------|
| `leaky` | > 0 | rate limiter full (`Allow()` returns false) |
| `trigger` | 0 | immediately on first matching event |
| `counter` | -1 | duration timer expires |
| `conditional` | -1 (typically) | `condition` expression returns true |
| `bayesian` | -1 | Bayesian probability exceeds threshold |

### `PourItemToHolders()` — `pkg/leakybucket/manager_run.go:206`
Main dispatch loop. For each `BucketFactory`:
1. Evaluates `RunTimeFilter` against the event — skips if false.
2. Evaluates `RunTimeGroupBy` to get a partition string (e.g. the source IP).
3. Calls `BucketFactory.BucketKey()` to get the storage key.
4. Calls `LoadOrStoreBucketFromHolder()` to get or create the `Leaky` instance.
5. Calls `PourItemToBucket()` to send the event.

### `LoadOrStoreBucketFromHolder()` — `pkg/leakybucket/manager_run.go:153`
Gets the `Leaky` instance from the `BucketStore` for this partition key. If it doesn't exist, creates one (`NewLeakyFromFactory` for LIVE, `NewTimeMachine` for TIMEMACHINE), stores it, and launches `LeakRoutine()` as a goroutine. Waits on `fresh_bucket.ready` before returning.

### `PourItemToBucket()` — `pkg/leakybucket/manager_run.go:66`
Sends the event to the bucket's `In` channel. Handles dead buckets by deleting them from the store and creating a replacement. In timemachine mode, checks whether the event's timestamp has moved past the bucket's deadline and creates a new bucket if so.

### `BucketStore` — `pkg/leakybucket/bucketstore.go`
Thread-safe map `string → *Leaky`. Holds all live bucket instances.  
Key methods: `Load`, `LoadOrStore`, `Delete`, `Snapshot`, `Len`, `BeginPour` / `FreezePours` (RW locking for GC vs. pour concurrency).

### `Leaky` — `pkg/leakybucket/bucket.go:23`
A single live bucket instance:
```go
type Leaky struct {
    Mode          int                // LIVE or TIMEMACHINE
    Limiter       rate.RateLimiter   // golang token bucket; controls overflow
    Queue         *pipeline.Queue    // in-memory cache of poured events
    In            chan *pipeline.Event
    Out           chan *pipeline.Queue // capacity-overflow signal
    AllOut        chan pipeline.Event  // shared channel for all overflows
    Mapkey        string              // partition key
    First_ts      time.Time
    Last_ts       time.Time
    Ovflw_ts      time.Time
    Total_count   int
    Factory       *BucketFactory
    Duration      time.Duration
    Pour          func(*Leaky, pourGate, pipeline.Event) // = Pour()
    timedOverflow bool               // true for counter/duration buckets
    conditionalOverflow bool
    cancel        context.CancelFunc
}
```

### `Leaky.LeakRoutine()` — `pkg/leakybucket/bucket.go:120`
Long-running goroutine (one per live bucket). The main loop selects on:
- `l.In` — receives an event, runs `OnBucketPour` processors, calls `Pour()`, runs `AfterBucketPour` processors, resets the duration ticker.
- `l.Out` — capacity overflow signal from `Pour()`; calls `l.overflow()` and returns.
- `l.Suicide` — external kill; emits a cleanup event to `AllOut`.
- duration ticker — for counter/timed buckets: calls `NewAlert()` on timeout, runs `OnBucketOverflow` processors, emits to `AllOut`.
- `ctx.Done()` — external cancellation; drains `Out` and emits cleanup to `AllOut`.

### `Pour()` — `pkg/leakybucket/bucket.go:272`
Core leaky-bucket logic. Increments `Total_count` and updates timestamps. Calls `l.Limiter.Allow()`:
- If **true** (token available): adds event to `l.Queue`.
- If **false** (bucket full): adds event to `l.Queue` and sends the queue to `l.Out`, triggering overflow.

For conditional buckets (`conditionalOverflow = true`), `Allow()` is always treated as true here; the overflow is decided by the `ConditionalProcessor` in `AfterBucketPour`.

### `Leaky.overflow()` — `pkg/leakybucket/bucket.go:292`
Called on capacity overflow. Calls `NewAlert()`, runs all `OnBucketOverflow` processor hooks (which may discard the alert), then emits `pipeline.Event{Type: OVFLW, Overflow: alert}` to `AllOut`.

---

## Stage 4 – Alert Creation

**File:** `pkg/leakybucket/overflows.go`

### `NewAlert()` — `pkg/leakybucket/overflows.go:287`
Constructs a `pipeline.RuntimeAlert` from the overflowed `Leaky` and its `Queue`:
- Serialises `First_ts`, `Ovflw_ts`.
- Calls `alertFormatSource()` → `SourceFromEvent()` to extract sources (IPs, ranges, etc.) from all queued events.
- Calls `EventsFromQueue()` to build `[]*models.Event` with per-event metadata.
- Calls `alertcontext.EventToContext()` to attach alert context fields.
- Generates one `models.Alert` per source (for deduplication downstream).
- Sets `runtimeAlert.Reprocess = true` if the scenario has `reprocess: true`.

### `pipeline.RuntimeAlert` — `pkg/pipeline/event.go` (or `pkg/pipeline/`)
The in-process alert representation:
```go
type RuntimeAlert struct {
    Mapkey      string
    BucketId    string
    Sources     map[string]models.Source
    Alert       *models.Alert           // pointer to APIAlerts[0]
    APIAlerts   []models.Alert          // one per source
    Whitelisted bool
    Reprocess   bool
}
```

### `SourceFromEvent()` — `pkg/leakybucket/overflows.go:22`
Extracts source information from one queued event. Reads `event.Meta["source_ip"]`, enrichment fields (`ASNumber`, `IsoCode`, `ASNOrg`, `Latitude`, `Longitude`, `SourceRange`) and maps them to a `models.Source`. Handles IP vs Range scopes.

### `EventsFromQueue()` — `pkg/leakybucket/overflows.go:202`
Iterates the event cache. For each event, copies `Meta` key-value pairs and the event timestamp into a `models.Event`. This is the per-event detail attached to the alert.

---

## Stage 5 – Post-Overflow Processing and Output

**File:** `cmd/crowdsec/output.go`

### `runOutput()` — `cmd/crowdsec/output.go:83`
Output goroutine. Selects on:
- `overflow` channel (= `AllOut` from buckets): receives overflow events.
  - If the alert is nil (bucket GC signal), deletes from `BucketStore` and continues.
  - Runs the event through the **post-overflow parser** (`parser.Parse()` with `postOverflowNodes`) — allows whitelist matching and enrichment of alerts.
  - Checks `ov.Whitelisted` — discards if true.
  - If `ov.Reprocess` — sends event back to `inEvents` (re-inject into the parser pipeline).
  - Adds to `pendingAlerts` buffer.
- 1-second ticker: drains `pendingAlerts`, calls `PushAlerts()` in a goroutine.

### `dedupAlerts()` — `cmd/crowdsec/output.go:46`
If a `RuntimeAlert` has more than one source, creates a copy of the `models.Alert` for each source. Otherwise passes through as-is.

### `PushAlerts()` — `cmd/crowdsec/output.go:72`
Calls `dedupAlerts()` then `client.Alerts.Add()` to POST the batch to the Local API.

---

## Processor Hooks

**File:** `pkg/leakybucket/processor.go`

```go
type Processor interface {
    OnBucketInit(f *BucketFactory) error
    OnBucketPour(f *BucketFactory, msg Event, leaky *Leaky) *Event   // nil = discard event
    AfterBucketPour(f *BucketFactory, msg Event, leaky *Leaky) *Event
    OnBucketOverflow(f *BucketFactory, leaky *Leaky, alert RuntimeAlert, queue *Queue) (RuntimeAlert, *Queue) // nil queue = discard overflow
}
```

| Processor | File | Role |
|-----------|------|------|
| `DumbProcessor` | `processor.go` | Pass-through; used by leaky, counter, conditional, bayesian |
| `TriggerProcessor` | `trigger.go` | Immediately sends `l.Queue` to `l.Out` on first event |
| `UniqProcessor` | `uniq.go` | Discards event if `distinct` expr value was already seen |
| `BlackholeProcessor` | `blackhole.go` | Discards overflow if the same partition overflowed within `blackhole` duration |
| `OverflowProcessor` | `overflow_filter.go` | Discards overflow if `overflow_filter` expr is false |
| `CancelProcessor` | `cancel.go` | Kills bucket (sends to `Suicide` chan) if `cancel_on` expr matches |
| `ConditionalProcessor` | `conditional.go` | Overflows when `condition` expr evaluates to true |
| `BayesianProcessor` | `bayesian.go` | Accumulates conditional probabilities; overflows when threshold exceeded |

---

## Concurrency Architecture

```
logLines chan ──► [parser goroutine × N] ──► inEvents chan ──► [bucket goroutine × M]
                                                                        │
                                                          (one LeakRoutine goroutine per live bucket)
                                                                        │
                                                               AllOut chan (shared)
                                                                        │
                                                         [output goroutine × K] ──► LAPI HTTP POST
```

- `ParserRoutinesCount`, `BucketsRoutinesCount`, `OutputRoutinesCount` are all configurable.
- Channels between stages are unbuffered except `AllOut` which has capacity 1.
- `BucketStore` serialises all reads/writes with a mutex; a second RW mutex (`muFlow`) allows GC to freeze pours.

---

## Key Data Contracts for a JS Port

To implement a self-contained JS version of the pipeline, these are the data contracts you need to replicate:

### Input per log line
```json
{
  "raw": "<original log line>",
  "labels": { "type": "syslog" },
  "src": "user-paste"
}
```

### After parsing (what goes into bucket matching)
```json
{
  "parsed": { "source_ip": "1.2.3.4", "http_path": "/login", … },
  "meta":   { "source_ip": "1.2.3.4", "service": "http", … },
  "enriched": { "IsoCode": "FR", "ASNOrg": "OVH", … }
}
```

### Scenario YAML fields that matter for the bucket engine
```yaml
type: leaky          # or trigger / counter / conditional / bayesian
filter: "evt.Meta['service'] == 'http'"  # expression against Event
groupby: "evt.Meta['source_ip']"         # partition key expression
capacity: 10         # max tokens (leaky) or -1 (counter/conditional/bayesian)
leakspeed: "10m"     # duration between token leaks
duration: "4h"       # lifetime for counter buckets
condition: "..."     # overflow condition for conditional type
blackhole: "1h"      # suppress duplicate overflows
distinct: "evt.Parsed['http_path']"      # deduplicate on value
labels:
  remediation: true
```

### Alert output shape (from `models.Alert`)
```json
{
  "scenario": "crowdsecurity/http-bf",
  "scenario_hash": "abc123",
  "capacity": 10,
  "events_count": 14,
  "leakspeed": "10m0s",
  "start_at": "2024-01-01T00:00:00Z",
  "stop_at":  "2024-01-01T01:00:00Z",
  "message": "Ip 1.2.3.4 performed 'crowdsecurity/http-bf' (14 events over 1h0m0s) at ...",
  "source": { "ip": "1.2.3.4", "scope": "Ip", "value": "1.2.3.4", "cn": "FR", … },
  "events": [ { "meta": [{"key":"source_ip","value":"1.2.3.4"}, …], "timestamp": "…" } ]
}
```

### Bucket state fields useful for a "fill report"
From `Leaky`:
- `Total_count` — total events received
- `Factory.Spec.Capacity` — overflow threshold
- `First_ts`, `Last_ts`, `Ovflw_ts` — timestamps
- `Queue.GetQueue()` — cached events
- `Limiter.GetTokensCountAt(t)` — current token level (how full the bucket is)

Fill percentage ≈ `1.0 - (current_tokens / capacity)`. A bucket at ≥ 50% fill means `current_tokens ≤ capacity * 0.5`.
