/**
 * Leaky bucket engine — TimeMachine mode.
 *
 * Mirrors:
 *   pkg/leakybucket/bucket.go        – Leaky struct, Pour, LeakRoutine (sync version)
 *   pkg/leakybucket/timemachine.go   – TimeMachinePour
 *   pkg/leakybucket/manager_load.go  – BucketFactory, LoadBuckets
 *   pkg/leakybucket/manager_run.go   – PourItemToHolders, LoadOrStoreBucketFromHolder
 *   pkg/leakybucket/buckettype.go    – LeakyType, TriggerType, CounterType, ConditionalType
 *   pkg/leakybucket/blackhole.go     – BlackholeProcessor
 *   pkg/leakybucket/uniq.go          – UniqProcessor
 *   pkg/leakybucket/conditional.go   – ConditionalProcessor
 *
 * Key difference from Go: this is synchronous (no goroutines).
 * Pour() is called inline, and overflow detection is synchronous.
 */

import yaml from 'js-yaml'
import { evalBool, evalString, ExprEnv } from './expr'
import type { CrowdSecEvent, BucketSpec } from './types'
import { sha1 } from './sha1'

// ---------------------------------------------------------------------------
// Duration parsing
// ---------------------------------------------------------------------------

/** Parse a Go duration string like "10s", "5m", "1h", "2h30m" into milliseconds */
export function parseDuration(s: string): number {
  if (!s) return 0
  let ms = 0
  const re = /(\d+(?:\.\d+)?)\s*(ms|s|m|h|d)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(s)) !== null) {
    const n = parseFloat(m[1])
    switch (m[2]) {
      case 'ms': ms += n; break
      case 's':  ms += n * 1000; break
      case 'm':  ms += n * 60 * 1000; break
      case 'h':  ms += n * 3600 * 1000; break
      case 'd':  ms += n * 86400 * 1000; break
    }
  }
  return ms
}

// ---------------------------------------------------------------------------
// BucketFactory
// ---------------------------------------------------------------------------

export interface BucketFactory {
  spec: BucketSpec
  leakspeedMs: number
  durationMs: number
  overflowChan: OverflowEvent[]   // shared output — we collect overflows here
}

export interface OverflowEvent {
  factory: BucketFactory
  leaky: LeakyBucket
  queue: CrowdSecEvent[]
}

/** Parse scenario YAML(s) and produce factories */
export function loadBucketFactories(yamlText: string, overflowChan: OverflowEvent[]): BucketFactory[] {
  const docs = yaml.loadAll(yamlText) as BucketSpec[]
  const factories: BucketFactory[] = []
  for (const doc of docs) {
    if (!doc || typeof doc !== 'object' || !doc.name) continue
    const f: BucketFactory = {
      spec: doc,
      leakspeedMs: parseDuration(doc.leakspeed ?? ''),
      durationMs:  parseDuration(doc.duration  ?? ''),
      overflowChan,
    }
    factories.push(f)
  }
  return factories
}

// ---------------------------------------------------------------------------
// Leaky bucket instance
// ---------------------------------------------------------------------------

export interface LeakyBucket {
  factory: BucketFactory
  mapkey: string
  // Token bucket state (TimeMachine: tokens are computed from event time)
  tokens: number            // current token count (float)
  capacity: number          // max tokens (= spec.capacity)
  lastRefillTime: Date | null
  // Event cache
  queue: CrowdSecEvent[]
  // Timestamps
  firstTs: Date | null
  lastTs: Date | null
  ovflwTs: Date | null
  totalCount: number
  // Overflow / cancel flags
  overflowed: boolean
  canceled: boolean
  // Duration timer (for counter / conditional types)
  durationDeadline: Date | null
  timedOverflow: boolean
  conditionalOverflow: boolean
  // Distinct cache (UniqProcessor)
  distinctSeen: Set<string>
  // Blackhole: map of mapkey → expiry
  blackholeExpiry: Date | null
  // Bayesian probability accumulator
  bayesianProb: number
}

function newBucket(factory: BucketFactory, mapkey: string): LeakyBucket {
  const spec = factory.spec
  const capacity = spec.capacity ?? 0
  return {
    factory,
    mapkey,
    tokens: capacity,  // start full — TimeMachinePour uses Limiter.AllowN(t, 1)
    capacity,
    lastRefillTime: null,
    queue: [],
    firstTs: null,
    lastTs: null,
    ovflwTs: null,
    totalCount: 0,
    overflowed: false,
    canceled: false,
    durationDeadline: null,
    timedOverflow: factory.durationMs > 0,
    conditionalOverflow: spec.type === 'conditional',
    distinctSeen: new Set(),
    blackholeExpiry: null,
    bayesianProb: spec.bayesian_prior ?? 0,
  }
}

// ---------------------------------------------------------------------------
// BucketStore
// ---------------------------------------------------------------------------

export class BucketStore {
  private store = new Map<string, LeakyBucket>()

  get(key: string): LeakyBucket | undefined {
    return this.store.get(key)
  }

  set(key: string, bucket: LeakyBucket): void {
    this.store.set(key, bucket)
  }

  delete(key: string): void {
    this.store.delete(key)
  }

  getOrCreate(key: string, factory: BucketFactory): LeakyBucket {
    let b = this.store.get(key)
    if (!b) {
      b = newBucket(factory, key)
      this.store.set(key, b)
    }
    return b
  }

  snapshot(): LeakyBucket[] {
    return Array.from(this.store.values())
  }

  size(): number {
    return this.store.size
  }

  clear(): void {
    this.store.clear()
  }

  serialize(): string {
    const data = Array.from(this.store.entries()).map(([key, b]) => ({
      key,
      scenario: b.factory.spec.name,
      mapkey: b.mapkey,
      tokens: b.tokens,
      capacity: b.capacity,
      firstTs: b.firstTs?.toISOString() ?? null,
      lastTs: b.lastTs?.toISOString() ?? null,
      totalCount: b.totalCount,
      overflowed: b.overflowed,
      queueLen: b.queue.length,
    }))
    return JSON.stringify(data, null, 2)
  }
}

// ---------------------------------------------------------------------------
// Token bucket (TimeMachine)
// ---------------------------------------------------------------------------

/**
 * TimeMachine token bucket AllowN equivalent.
 * In Go: rate.Limiter.AllowN(t, 1)
 *   - At time t, refill tokens based on elapsed time since lastRefillTime
 *   - Try to consume 1 token
 *   - Returns true if token was available (event queued), false = overflow
 */
function timeMachineAllow(bucket: LeakyBucket, eventTime: Date): boolean {
  const spec = bucket.factory.spec
  const capacity = bucket.capacity

  // Trigger type: always overflows immediately
  if (spec.type === 'trigger') return false

  // Counter and conditional: always allow (capacity = -1)
  if (capacity === -1) return true

  // Refill tokens based on elapsed time
  if (bucket.lastRefillTime !== null && bucket.factory.leakspeedMs > 0) {
    const elapsedMs = eventTime.getTime() - bucket.lastRefillTime.getTime()
    if (elapsedMs > 0) {
      // tokens per millisecond = 1 / leakspeedMs
      const newTokens = elapsedMs / bucket.factory.leakspeedMs
      bucket.tokens = Math.min(capacity, bucket.tokens + newTokens)
    }
  }

  bucket.lastRefillTime = eventTime

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1
    return true  // allowed
  }
  return false  // overflow
}

// ---------------------------------------------------------------------------
// Main pour entry point
// ---------------------------------------------------------------------------

/**
 * Pour a parsed event into all matching bucket holders.
 * Mirrors PourItemToHolders() in Go.
 * Overflows are pushed synchronously into factory.overflowChan.
 */
export function pourItemToHolders(
  event: CrowdSecEvent,
  factories: BucketFactory[],
  store: BucketStore,
): boolean {
  let poured = false
  const eventTime = event.Time ?? new Date()

  console.groupCollapsed(`[bucket] pour  src=${event.Meta['source_ip'] ?? '?'}  t=${eventTime.toISOString()}`)

  for (const factory of factories) {
    const spec = factory.spec

    // 1. Filter
    if (spec.filter) {
      const ok = evalBool(spec.filter, makeEnv(event))
      if (!ok) {
        console.info(`[bucket]   scenario "${spec.name}" filter="${spec.filter}" → false, skip`)
        continue
      }
    }

    // 2. GroupBy partition key
    let groupby = ''
    if (spec.groupby) {
      groupby = evalString(spec.groupby, makeEnv(event))
    }

    // 3. BucketKey: sha1(filter + NUL + groupby + NUL + name)
    const bucketKey = makeBucketKey(spec.filter ?? '', groupby, spec.name)

    // 4. Get or create bucket
    const existed = store.get(bucketKey) !== undefined
    const bucket = store.getOrCreate(bucketKey, factory)
    if (!existed) {
      console.info(`[bucket]   scenario "${spec.name}" groupby="${groupby}" → BUCKET CREATED  key=${bucketKey.slice(0, 8)}`)
    }

    // 5. Pour
    const overflow = pourIntoBucket(bucket, event, eventTime)
    console.info(
      `[bucket]   scenario "${spec.name}" groupby="${groupby}" → poured  count=${bucket.totalCount}  tokens=${bucket.tokens.toFixed(2)}/${bucket.capacity}  overflow=${overflow}`,
    )

    if (overflow) {
      handleOverflow(bucket, factory, store)
    }

    poured = true
  }

  console.groupEnd()
  return poured
}

function pourIntoBucket(bucket: LeakyBucket, event: CrowdSecEvent, eventTime: Date): boolean {
  const spec = bucket.factory.spec
  const name = spec.name

  // UniqProcessor: discard if distinct value already seen
  if (spec.distinct) {
    const val = evalString(spec.distinct, makeEnv(event))
    if (bucket.distinctSeen.has(val)) {
      console.info(`[bucket]     "${name}" DISTINCT duplicate val="${val}", discard`)
      return false
    }
    bucket.distinctSeen.add(val)
    console.info(`[bucket]     "${name}" DISTINCT new val="${val}"`)
  }

  // CancelOn processor
  if (spec.cancel_on) {
    const cancel = evalBool(spec.cancel_on, makeEnv(event))
    if (cancel) {
      console.info(`[bucket]     "${name}" CANCEL_ON matched → bucket canceled`)
      bucket.canceled = true
      return false
    }
  }

  // Update timestamps
  bucket.totalCount++
  if (!bucket.firstTs) bucket.firstTs = eventTime
  bucket.lastTs = eventTime

  // Initialize duration deadline on first event
  if (!bucket.durationDeadline && bucket.factory.durationMs > 0) {
    bucket.durationDeadline = new Date(eventTime.getTime() + bucket.factory.durationMs)
    console.info(`[bucket]     "${name}" duration deadline set to ${bucket.durationDeadline.toISOString()}`)
  }

  // Check duration deadline for counter buckets
  if (bucket.timedOverflow && bucket.durationDeadline && eventTime > bucket.durationDeadline) {
    console.info(`[bucket]     "${name}" DURATION EXPIRED → overflow (count=${bucket.totalCount})`)
    bucket.queue.push(event)
    bucket.ovflwTs = eventTime
    return true
  }

  // TimeMachine token bucket
  const allowed = timeMachineAllow(bucket, eventTime)

  if (allowed || bucket.conditionalOverflow) {
    bucket.queue.push(event)
    if (spec.type === 'trigger') {
      console.info(`[bucket]     "${name}" type=trigger → immediate overflow`)
    }
  } else {
    // Capacity overflow
    console.info(`[bucket]     "${name}" CAPACITY OVERFLOW  tokens=${bucket.tokens.toFixed(2)}  count=${bucket.totalCount}`)
    bucket.queue.push(event)
    bucket.ovflwTs = eventTime
    return true
  }

  // Conditional overflow: check condition after pour
  if (bucket.conditionalOverflow && spec.condition) {
    const queueExposure = { Queue: bucket.queue, GetQueue: () => bucket.queue, L: bucket.queue.length }
    const cond = evalBool(spec.condition, { evt: event, queue: queueExposure, leaky: bucket })
    if (cond) {
      console.info(`[bucket]     "${name}" CONDITIONAL matched → overflow (count=${bucket.totalCount})`)
      bucket.ovflwTs = eventTime
      return true
    }
  }

  return false
}

function handleOverflow(bucket: LeakyBucket, factory: BucketFactory, store: BucketStore): void {
  const name = factory.spec.name

  // Blackhole check
  if (factory.spec.blackhole && bucket.blackholeExpiry) {
    if (bucket.ovflwTs && bucket.blackholeExpiry > bucket.ovflwTs) {
      console.info(`[bucket]   "${name}" BLACKHOLED until ${bucket.blackholeExpiry.toISOString()} → overflow discarded, bucket reset`)
      resetBucket(bucket, store)
      return
    }
  }

  // Overflow filter
  if (factory.spec.overflow_filter) {
    const pass = evalBool(factory.spec.overflow_filter, { leaky: bucket, queue: bucket.queue })
    if (!pass) {
      console.info(`[bucket]   "${name}" overflow_filter="${factory.spec.overflow_filter}" → false, overflow discarded`)
      resetBucket(bucket, store)
      return
    }
  }

  // Set blackhole expiry for next overflow
  if (factory.spec.blackhole && bucket.ovflwTs) {
    const bhMs = parseDuration(factory.spec.blackhole)
    bucket.blackholeExpiry = new Date(bucket.ovflwTs.getTime() + bhMs)
    console.info(`[bucket]   "${name}" blackhole next expiry: ${bucket.blackholeExpiry.toISOString()}`)
  }

  console.info(
    `[bucket] *** OVERFLOW "${name}"  groupby="${bucket.mapkey.slice(0, 8)}"  events=${bucket.queue.length}  at=${bucket.ovflwTs?.toISOString() ?? '?'} ***`,
  )

  bucket.overflowed = true
  factory.overflowChan.push({ factory, leaky: bucket, queue: [...bucket.queue] })

  // Reset bucket state so it can be reused (new bucket starts from this point)
  resetBucket(bucket, store)
}

function resetBucket(bucket: LeakyBucket, store: BucketStore): void {
  // Remove from store so next event creates a fresh bucket
  store.delete(bucket.mapkey)
}

// ---------------------------------------------------------------------------
// Garbage collection (TimeMachine)
// ---------------------------------------------------------------------------

/**
 * GarbageCollectBuckets — port of manager_run.go:GarbageCollectBuckets.
 * Called every ~5000 events to evict buckets that have fully recovered
 * (tokens restored to capacity) by the time of the current event.
 */
export function garbageCollectBuckets(currentEventTime: Date, store: BucketStore): void {
  for (const bucket of store.snapshot()) {
    if (bucket.overflowed || bucket.canceled) {
      store.delete(bucket.mapkey)
      continue
    }

    const spec = bucket.factory.spec
    const capacity = spec.capacity ?? 0
    if (capacity <= 0) continue  // counter/conditional: no GC by token count

    const leakspeedMs = bucket.factory.leakspeedMs
    if (leakspeedMs <= 0 || !bucket.lastRefillTime) continue

    // Compute tokens at currentEventTime
    const elapsedMs = currentEventTime.getTime() - bucket.lastRefillTime.getTime()
    const tokensAtNow = Math.min(capacity, bucket.tokens + elapsedMs / leakspeedMs)

    if (tokensAtNow >= capacity) {
      // Bucket has fully recovered — it would underflow, kill it
      store.delete(bucket.mapkey)
    }
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeEnv(event: CrowdSecEvent): ExprEnv {
  return { evt: event }
}

function makeBucketKey(filter: string, groupby: string, name: string): string {
  return sha1(`${filter}\x00${groupby}\x00${name}`)
}
