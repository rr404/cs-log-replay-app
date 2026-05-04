/**
 * Parser pipeline engine.
 *
 * Mirrors the logic in:
 *   pkg/parser/runtime.go   – Parse() function, stage traversal
 *   pkg/parser/node.go      – node.process(), processGrok(), processFilter(), processLeaves()
 *   pkg/parser/static.go    – RuntimeStatic.Apply()
 *   pkg/parser/enrich_date.go – ParseDate method
 *
 * Parser YAML files are loaded by parseParserYAML(), producing CompiledParser objects
 * that can then be applied to events via runParsers().
 */

import yaml from 'js-yaml'
import { grokEngine, GrokEngine } from './grok'
import { evalBool, evalString, ExprEnv } from './expr'
import { parseDate } from './dateparse'
import type { CrowdSecEvent, ParserNodeConfig, StaticConfig } from './types'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CompiledParser {
  name: string
  stage: string
  filter: string
  onsuccess: string
  leaves: CompiledParser[]
  grok?: CompiledGrok
  statics: CompiledStatic[]
  whitelist?: CompiledWhitelist
  localGrok?: GrokEngine   // node-local grok engine with pattern_syntax overrides
}

interface CompiledGrok {
  applyOn: string          // field name or "Line.Raw"
  patternExpr?: string     // raw grok expression string (used if expressionSrc is empty)
  expressionSrc?: string   // expr expression whose result is the input string
  regex: RegExp
  statics: CompiledStatic[]
}

interface CompiledStatic {
  config: StaticConfig
}

interface CompiledWhitelist {
  reason: string
  ips: Set<string>
  cidrs: string[]
  expressions: string[]
}

// ---------------------------------------------------------------------------
// YAML loading
// ---------------------------------------------------------------------------

/**
 * Parse one or more parser YAML documents (multi-doc YAML is supported with ---).
 * Returns an array of CompiledParser ready for execution.
 */
export function parseParserYAML(yamlText: string, defaultStage = 's01-parse'): CompiledParser[] {
  const docs = yaml.loadAll(yamlText) as ParserNodeConfig[]
  const result: CompiledParser[] = []
  for (const doc of docs) {
    if (!doc || typeof doc !== 'object') continue
    // Inherit pattern_syntax into a local grok engine copy
    const nodeGrok = buildLocalGrok(doc.pattern_syntax ?? {})
    const compiled = compileNode(doc, defaultStage, nodeGrok)
    if (compiled) result.push(compiled)
  }
  return result
}

function buildLocalGrok(patternSyntax: Record<string, string>): GrokEngine {
  // We always start from the global singleton and layer additional patterns on top.
  // We can't mutate the singleton, so create a thin wrapper class or just register
  // into the global engine (patterns are additive and non-conflicting in practice).
  for (const [name, pattern] of Object.entries(patternSyntax)) {
    grokEngine.addPattern(name, pattern)
  }
  return grokEngine
}

function compileNode(cfg: ParserNodeConfig, inheritedStage: string, _grok: GrokEngine): CompiledParser | null {
  const stage = cfg.stage ?? inheritedStage

  // Recurse into sub-nodes first (they inherit stage)
  const nodeGrok = buildLocalGrok(cfg.pattern_syntax ?? {})
  const leaves: CompiledParser[] = []
  for (const child of cfg.nodes ?? []) {
    const compiled = compileNode(child, stage, nodeGrok)
    if (compiled) leaves.push(compiled)
  }

  // Compile grok if present
  let compiledGrok: CompiledGrok | undefined
  if (cfg.grok) {
    compiledGrok = compileGrok(cfg.grok, nodeGrok)
  }

  // Compile statics
  const statics = (cfg.statics ?? []).map(s => ({ config: s }))

  // Compile whitelist
  let wl: CompiledWhitelist | undefined
  if (cfg.whitelist) {
    wl = {
      reason: cfg.whitelist.reason ?? '',
      ips: new Set(cfg.whitelist.ip ?? []),
      cidrs: cfg.whitelist.cidr ?? [],
      expressions: cfg.whitelist.expression ?? [],
    }
  }

  // A node is valid if it has a grok, leaves, statics, or whitelist
  if (!compiledGrok && leaves.length === 0 && statics.length === 0 && !wl && !cfg.filter) {
    return null
  }

  return {
    name: cfg.name ?? '',
    stage,
    filter: cfg.filter ?? '',
    onsuccess: cfg.onsuccess ?? 'continue',
    leaves,
    grok: compiledGrok,
    statics,
    whitelist: wl,
    localGrok: nodeGrok,
  }
}

function compileGrok(cfg: NonNullable<ParserNodeConfig['grok']>, grok: GrokEngine): CompiledGrok {
  // Load any grok-level pattern_syntax (rare but used in nginx parser)
  // already merged above via buildLocalGrok

  let regex: RegExp = /(?!)/  // never-matches sentinel by default
  let patternExpr: string | undefined

  if (cfg.pattern) {
    patternExpr = cfg.pattern
    regex = grok.compile(cfg.pattern)
  } else if (cfg.name) {
    patternExpr = `%{${cfg.name}}`
    regex = grok.compile(`%{${cfg.name}}`)
  }

  // Statics nested inside a grok apply when grok succeeds
  const statics = (cfg.statics ?? []).map(s => ({ config: s }))

  return {
    applyOn: cfg.apply_on ?? 'Line.Raw',
    patternExpr,
    expressionSrc: cfg.expression,
    regex,
    statics,
  }
}

// ---------------------------------------------------------------------------
// Execution
// ---------------------------------------------------------------------------

/**
 * Run all parsers (from all stages) against an event.
 * parsers is a map: stageName → CompiledParser[]
 * stages is the ordered list of stage names.
 * Returns the modified event.
 */
export function runParsers(
  event: CrowdSecEvent,
  parsersByStage: Map<string, CompiledParser[]>,
  stages: string[],
): CrowdSecEvent {
  if (stages.length === 0) return event

  // Set initial stage if not set
  if (!event.Stage) event.Stage = stages[0]

  event.Process = false

  console.groupCollapsed(`[parser] line: ${JSON.stringify(event.Line.Raw.slice(0, 120))}`)

  for (const stage of stages) {
    // If event stage is ahead of current stage, skip
    const eventStageIdx = stages.indexOf(event.Stage)
    const currentStageIdx = stages.indexOf(stage)
    if (eventStageIdx > currentStageIdx) continue

    // If event stage doesn't match current stage, it didn't pass the previous stage
    if (event.Stage !== stage) {
      console.info(`[parser]   stage ${stage}: SKIP (event stuck at stage ${event.Stage})`)
      event.Process = false
      console.groupEnd()
      return event
    }

    const nodes = parsersByStage.get(stage) ?? []
    let stageOK = false
    console.groupCollapsed(`[parser]   stage ${stage} (${nodes.length} node(s))`)

    for (const node of nodes) {
      const ret = processNode(node, event)
      if (ret) {
        stageOK = true
        console.info(`[parser]     node "${node.name || '(anon)'}" → MATCH  parsed=%o`, { ...event.Parsed })
        if (node.onsuccess === 'next_stage') {
          // Advance event.Stage to the next stage so the outer loop can proceed
          const nextStage = stages[stages.indexOf(stage) + 1]
          if (nextStage) {
            event.Stage = nextStage
            console.info(`[parser]     onsuccess=next_stage → advancing to ${nextStage}`)
          }
          break
        }
      } else {
        console.info(`[parser]     node "${node.name || '(anon)'}" → no match`)
      }
      // If node moved stage, break and redo outer loop
      if (event.Stage !== stage) break
    }

    if (!stageOK) {
      console.info(`[parser]   stage ${stage}: FAILED — event discarded`)
      console.groupEnd()
      event.Process = false
      console.groupEnd()
      return event
    }

    console.info(`[parser]   stage ${stage}: OK`)
    console.groupEnd()
  }

  event.Process = true
  console.info(`[parser] → PARSED  Process=true  parsed=%o  meta=%o`, { ...event.Parsed }, { ...event.Meta })
  console.groupEnd()
  return event
}

/** Process a single node. Returns true if node succeeded. */
function processNode(node: CompiledParser, event: CrowdSecEvent): boolean {
  const label = node.name || '(anon)'

  // 1. Filter
  if (node.filter) {
    const ok = evalBool(node.filter, makeEnv(event))
    if (!ok) {
      console.info(`[parser]       "${label}" filter "${node.filter}" → false, skip`)
      return false
    }
    console.info(`[parser]       "${label}" filter "${node.filter}" → true`)
  }

  // 2. Whitelist
  if (node.whitelist) {
    checkWhitelist(node.whitelist, event)
    if (event.Whitelisted) {
      console.info(`[parser]       "${label}" WHITELISTED (reason: ${node.whitelist.reason})`)
    }
  }

  // 3. Grok
  let nodeHasOKGrok = false
  let nodeState = true

  if (node.grok) {
    const [grokState, grokOK] = processGrok(node.grok, event, label)
    nodeState = grokState
    nodeHasOKGrok = grokOK
  }

  // 4. Leaves
  if (node.leaves.length > 0) {
    const leafState = processLeaves(node, event, nodeState, nodeHasOKGrok)
    nodeState = leafState
  }

  if (!nodeState) return false

  // 5. Statics (only if node succeeded)
  for (const st of node.statics) {
    applyStatic(st.config, event, label)
  }

  return true
}

/** Evaluate grok pattern against the event. Returns [nodeState, grokOK]. */
function processGrok(grok: CompiledGrok, event: CrowdSecEvent, nodeLabel = ''): [boolean, boolean] {
  let input: string

  if (grok.expressionSrc) {
    input = evalString(grok.expressionSrc, makeEnv(event))
  } else if (grok.applyOn === 'Line.Raw') {
    input = event.Line.Raw
  } else {
    input = event.Parsed[grok.applyOn] ?? ''
  }

  const patternLabel = grok.patternExpr ?? grok.expressionSrc ?? '(regex)'
  const applyLabel   = grok.expressionSrc ? `expr(${grok.expressionSrc})` : grok.applyOn

  if (!input) {
    console.info(`[parser]       "${nodeLabel}" grok apply_on="${applyLabel}" → empty input, skip`)
    return [false, false]
  }

  const result = grokEngine.matchRegex(grok.regex, input)
  if (!result) {
    console.info(`[parser]       "${nodeLabel}" grok pattern="${patternLabel}" apply_on="${applyLabel}" → NO MATCH  input=${JSON.stringify(input.slice(0, 120))}`)
    return [false, false]
  }

  // Merge captured fields into event.Parsed
  const captured: Record<string, string> = {}
  for (const [k, v] of Object.entries(result)) {
    if (v !== undefined && v !== '') {
      event.Parsed[k] = v
      captured[k] = v
    }
  }
  console.info(`[parser]       "${nodeLabel}" grok pattern="${patternLabel}" → MATCH  captured=%o`, captured)

  // Apply grok-level statics
  for (const st of grok.statics) {
    applyStatic(st.config, event, nodeLabel)
  }

  return [true, true]
}

function processLeaves(
  parent: CompiledParser,
  event: CrowdSecEvent,
  parentState: boolean,
  parentHasOKGrok: boolean,
): boolean {
  let leafState = parentState

  for (const child of parent.leaves) {
    const ret = processNode(child, event)
    if (ret) {
      leafState = true
      if (parent.onsuccess === 'next_stage') break
    } else if (!parentHasOKGrok) {
      leafState = false
    }
  }

  return leafState
}

function checkWhitelist(wl: CompiledWhitelist, event: CrowdSecEvent): void {
  const srcIp = event.Meta['source_ip'] ?? event.Parsed['source_ip'] ?? ''

  // IP whitelist
  if (srcIp && wl.ips.has(srcIp)) {
    event.Whitelisted = true
    return
  }

  // Expression whitelist
  for (const expr of wl.expressions) {
    if (evalBool(expr, makeEnv(event))) {
      event.Whitelisted = true
      return
    }
  }
}

/**
 * Apply a single static assignment to an event.
 * Mirrors RuntimeStatic.Apply() in Go.
 */
export function applyStatic(cfg: StaticConfig, event: CrowdSecEvent, nodeLabel = ''): void {
  const env = makeEnv(event)

  // Compute value
  let value = ''
  if (cfg.value !== undefined && cfg.value !== '') {
    value = cfg.value
  } else if (cfg.expression) {
    value = evalString(cfg.expression, env)
  } else if (cfg.method) {
    // Methods are enrichment calls (ParseDate, GeoIpCity, etc.)
    const input = cfg.expression ? evalString(cfg.expression, env) : (cfg.value ?? '')
    console.info(`[parser]       "${nodeLabel}" static method=${cfg.method}  input=${JSON.stringify(input)}`)
    callEnrichMethod(cfg.method, input, event)
    return
  }

  if (value === '' && cfg.method !== 'ParseDate') return

  // Write to target
  if (cfg.target) {
    const path = cfg.target.replace(/^evt\./, '')
    console.info(`[parser]       "${nodeLabel}" static target="${cfg.target}" = ${JSON.stringify(value)}`)
    setEventField(event, path, value)
  } else if (cfg.parsed) {
    console.info(`[parser]       "${nodeLabel}" static parsed["${cfg.parsed}"] = ${JSON.stringify(value)}`)
    event.Parsed[cfg.parsed] = value
  } else if (cfg.meta) {
    console.info(`[parser]       "${nodeLabel}" static meta["${cfg.meta}"] = ${JSON.stringify(value)}`)
    event.Meta[cfg.meta] = value
  } else if (cfg.enriched) {
    console.info(`[parser]       "${nodeLabel}" static enriched["${cfg.enriched}"] = ${JSON.stringify(value)}`)
    event.Enriched[cfg.enriched] = value
  }
}

function callEnrichMethod(method: string, input: string, event: CrowdSecEvent): void {
  if (method === 'ParseDate') {
    const result = parseDate(input || event.StrTime)
    event.MarshaledTime = result.iso
    event.Time = result.date
    return
  }
  // GeoIpCity / GeoIpASN / IpToRange — skipped in replay mode (no database)
  // UnmarshalJSON
  if (method === 'UnmarshalJSON') {
    try {
      event.Unmarshaled = JSON.parse(input) as Record<string, unknown>
    } catch { /* ignore */ }
    return
  }
  // Other methods: log and skip
}

function setEventField(event: CrowdSecEvent, path: string, value: string): void {
  // Supported paths: StrTime, Process, MarshaledTime, Meta.key, Parsed.key, Enriched.key
  if (path === 'StrTime')        { event.StrTime = value; return }
  if (path === 'MarshaledTime')  { event.MarshaledTime = value; return }
  if (path === 'Process')        { event.Process = value === 'true'; return }

  const dot = path.indexOf('.')
  if (dot !== -1) {
    const map = path.slice(0, dot) as keyof CrowdSecEvent
    const key = path.slice(dot + 1)
    const target = event[map]
    if (target && typeof target === 'object') {
      (target as Record<string, string>)[key] = value
    }
  }
}

function makeEnv(event: CrowdSecEvent): ExprEnv {
  return { evt: event }
}

// ---------------------------------------------------------------------------
// Stage organiser
// ---------------------------------------------------------------------------

/**
 * Given a flat list of CompiledParser (from multiple files), group them by stage.
 * Returns [stageNames, parsersByStage] where stageNames is sorted.
 */
export function organiseByStage(parsers: CompiledParser[]): [string[], Map<string, CompiledParser[]>] {
  const byStage = new Map<string, CompiledParser[]>()
  for (const p of parsers) {
    const list = byStage.get(p.stage) ?? []
    list.push(p)
    byStage.set(p.stage, list)
  }
  // Sort stages lexicographically (s00-raw < s01-parse < s02-enrich …)
  const stages = Array.from(byStage.keys()).sort()
  return [stages, byStage]
}

