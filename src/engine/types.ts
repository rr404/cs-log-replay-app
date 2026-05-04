/** Core event type — mirrors pipeline.Event from the Go source */
export interface CrowdSecEvent {
  // Input line
  Line: {
    Raw: string
    Src: string
    Time: Date
    Labels: Record<string, string>
    Module: string
  }
  // Parser outputs
  Parsed: Record<string, string>
  Enriched: Record<string, string>
  Unmarshaled: Record<string, unknown>
  Meta: Record<string, string>
  // Stage tracking
  Stage: string
  Process: boolean
  Whitelisted: boolean
  // Timestamp extracted from the log line (TIMEMACHINE mode)
  MarshaledTime: string   // ISO8601 string set by ParseDate
  Time: Date              // parsed Date object (same as MarshaledTime but as Date)
  StrTime: string         // raw string from parser, before date parsing
  StrTimeFormat: string   // optional user-specified format hint
  // Event type
  Type: 'LOG' | 'OVFLW'
}

export function makeEvent(raw: string, labels: Record<string, string> = {}, src = 'user-paste'): CrowdSecEvent {
  return {
    Line: { Raw: raw, Src: src, Time: new Date(), Labels: labels, Module: 'file' },
    Parsed: {},
    Enriched: {},
    Unmarshaled: {},
    Meta: {},
    Stage: '',
    Process: false,
    Whitelisted: false,
    MarshaledTime: '',
    Time: new Date(),
    StrTime: '',
    StrTimeFormat: '',
    Type: 'LOG',
  }
}

/** A scenario bucket specification (from YAML) */
export interface BucketSpec {
  name: string
  type: 'leaky' | 'trigger' | 'counter' | 'conditional' | 'bayesian'
  description?: string
  filter: string
  groupby?: string
  capacity: number
  leakspeed?: string       // e.g. "10s", "5m"
  duration?: string        // for counter type
  condition?: string       // for conditional type
  distinct?: string
  blackhole?: string
  cancel_on?: string
  overflow_filter?: string
  reprocess?: boolean
  labels?: Record<string, unknown>
  scope?: { type?: string; expression?: string }
  bayesian_prior?: number
  bayesian_threshold?: number
  bayesian_conditions?: BayesianCondition[]
  cache_size?: number
  references?: string[]
}

export interface BayesianCondition {
  condition: string
  prob_given_evil: number
  prob_given_benign: number
  guillotine?: boolean
}

/** A compiled bucket factory (runtime state derived from BucketSpec) */
export interface BucketFactory {
  spec: BucketSpec
  leakspeedMs: number    // parsed from spec.leakspeed
  durationMs: number     // parsed from spec.duration
  // Processors are instantiated per-factory and copied per-bucket
  processorFactories: ProcessorFactory[]
}

/** A live bucket instance */
export interface Leaky {
  factory: BucketFactory
  mapkey: string
  mode: 'LIVE' | 'TIMEMACHINE'
  // Token bucket state
  tokens: number           // current token count
  capacity: number         // max tokens
  lastLeakTime: Date       // wall or log time of last token replenishment calc
  // Event cache
  queue: CrowdSecEvent[]
  // Timestamps
  firstTs: Date | null
  lastTs: Date | null
  ovflwTs: Date | null
  totalCount: number
  // Overflow state
  overflowed: boolean
  canceled: boolean
  // Processor instances (copied from factory at creation)
  processors: Processor[]
  // Distinct cache (for UniqProcessor)
  distinctSeen: Set<string>
  // Blackhole state
  blackholeExpiry: Date | null
  // Conditional overflow probability (bayesian)
  bayesianProb: number
}

/** Alert produced when a bucket overflows */
export interface RuntimeAlert {
  mapkey: string
  scenario: string
  scenarioDescription: string
  capacity: number
  eventsCount: number
  leakspeed: string
  startAt: string
  stopAt: string
  message: string
  sources: AlertSource[]
  events: AlertEvent[]
  labels: Record<string, unknown>
  remediation: boolean
  simulated: boolean
}

export interface AlertSource {
  ip: string
  range: string
  scope: string
  value: string
  cn: string
  asNumber: string
  asOrg: string
  latitude: number
  longitude: number
}

export interface AlertEvent {
  timestamp: string
  meta: Array<{ key: string; value: string }>
}

/** Processor hook interface */
export interface Processor {
  onBucketInit?(): void
  onBucketPour(factory: BucketFactory, event: CrowdSecEvent, leaky: Leaky): CrowdSecEvent | null
  afterBucketPour(factory: BucketFactory, event: CrowdSecEvent, leaky: Leaky): CrowdSecEvent | null
  onBucketOverflow(factory: BucketFactory, leaky: Leaky): boolean  // returns false to discard overflow
}

export interface ProcessorFactory {
  create(): Processor
}

/** Parser node (from YAML) */
export interface ParserNodeConfig {
  name?: string
  stage?: string
  filter?: string
  onsuccess?: string
  debug?: boolean
  nodes?: ParserNodeConfig[]
  pattern_syntax?: Record<string, string>
  grok?: {
    name?: string
    pattern?: string
    expression?: string
    apply_on?: string
    statics?: StaticConfig[]
  }
  statics?: StaticConfig[]
  stash?: StashConfig[]
  whitelist?: WhitelistConfig
}

export interface StaticConfig {
  target?: string
  parsed?: string
  meta?: string
  enriched?: string
  value?: string
  expression?: string
  method?: string
}

export interface StashConfig {
  name: string
  key: string
  value: string
  ttl?: string
  size?: number
  type?: string
}

export interface WhitelistConfig {
  reason?: string
  ip?: string[]
  cidr?: string[]
  expression?: string[]
}

/** Parsed stage map: stage name → list of compiled nodes */
export interface ParsedStage {
  name: string
  nodes: CompiledNode[]
}

export interface CompiledNode {
  config: ParserNodeConfig
  stage: string
  leaves: CompiledNode[]
}

/** Bucket report entry */
export interface BucketReport {
  scenario: string
  mapkey: string
  partitionValue: string
  totalEvents: number
  capacity: number
  fillPercent: number   // 0–100
  firstSeen: string
  lastSeen: string
  overflowed: boolean
}
