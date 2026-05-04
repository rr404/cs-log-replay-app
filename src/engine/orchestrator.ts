/**
 * Orchestrator — ties parser pipeline → bucket engine → alert builder together.
 *
 * Corresponds to the top-level runCrowdsec() flow in cmd/crowdsec/crowdsec.go,
 * but synchronous and in-memory for the replay use case.
 *
 * Usage:
 *   const engine = new ReplayEngine()
 *   engine.loadParsers(yamlTexts)
 *   engine.loadScenarios(yamlTexts)
 *   const result = engine.replay(logLines, labels)
 */

import { parseParserYAML, organiseByStage, runParsers, CompiledParser } from './parser'
import {
  loadBucketFactories,
  pourItemToHolders,
  garbageCollectBuckets,
  BucketFactory,
  BucketStore,
  OverflowEvent,
} from './bucket'
import { buildAlert, bucketFillPercent } from './alerts'
import { makeEvent } from './types'
import type { CrowdSecEvent, RuntimeAlert, BucketReport } from './types'

export interface ReplayResult {
  alerts:        RuntimeAlert[]
  bucketReport:  BucketReport[]
  parsedCount:   number
  discardedCount: number
  pouredCount:   number
  totalLines:    number
}

export interface ReplayOptions {
  /** Keep bucket state between replay calls (don't reset store) */
  keepBucketState?: boolean
  /** Log type label to attach to each line (e.g. "syslog", "nginx") */
  logType?: string
  /** Source label (arbitrary string) */
  logSrc?: string
}

const GC_INTERVAL = 5000  // matches Go's shouldTriggerGC(count % 5000)

export class ReplayEngine {
  private parsers: CompiledParser[] = []
  private stages: string[] = []
  private parsersByStage = new Map<string, CompiledParser[]>()
  private factories: BucketFactory[] = []
  private store = new BucketStore()
  private overflowChan: OverflowEvent[] = []

  // ---------------------------------------------------------------------------
  // Loading
  // ---------------------------------------------------------------------------

  /** Load one or more parser YAML texts. Can be called multiple times to accumulate parsers. */
  loadParsers(yamlTexts: string[], defaultStage?: string): void {
    for (const text of yamlTexts) {
      const parsed = parseParserYAML(text, defaultStage)
      this.parsers.push(...parsed)
    }
    ;[this.stages, this.parsersByStage] = organiseByStage(this.parsers)
  }

  /** Load one or more scenario YAML texts. Can be called multiple times. */
  loadScenarios(yamlTexts: string[]): void {
    for (const text of yamlTexts) {
      const factories = loadBucketFactories(text, this.overflowChan)
      this.factories.push(...factories)
    }
  }

  /** Reset parser state */
  clearParsers(): void {
    this.parsers = []
    this.stages = []
    this.parsersByStage = new Map()
  }

  /** Reset scenario state */
  clearScenarios(): void {
    this.factories = []
  }

  /** Reset bucket state (call between runs if not using keepBucketState) */
  resetBuckets(): void {
    this.store.clear()
    this.overflowChan = []
    // Re-point factories to the new channel
    for (const f of this.factories) {
      f.overflowChan = this.overflowChan
    }
  }

  /** Full reset */
  reset(): void {
    this.clearParsers()
    this.clearScenarios()
    this.resetBuckets()
  }

  get scenarioNames(): string[] {
    return this.factories.map(f => f.spec.name)
  }

  get parserNames(): string[] {
    return this.parsers.map(p => p.name).filter(Boolean)
  }

  // ---------------------------------------------------------------------------
  // Replay
  // ---------------------------------------------------------------------------

  replay(lines: string[], opts: ReplayOptions = {}): ReplayResult {
    if (!opts.keepBucketState) {
      this.overflowChan = []
      for (const f of this.factories) f.overflowChan = this.overflowChan
    }

    const labels: Record<string, string> = {}
    if (opts.logType) labels['type'] = opts.logType

    let parsedCount   = 0
    let discardedCount = 0
    let pouredCount   = 0
    let lineCount     = 0

    for (const raw of lines) {
      const trimmed = raw.trim()
      if (!trimmed) continue
      lineCount++

      const event = makeEvent(trimmed, labels, opts.logSrc ?? 'replay')

      // Parser pipeline
      let parsed: CrowdSecEvent
      if (this.stages.length > 0) {
        parsed = runParsers(event, this.parsersByStage, this.stages)
      } else {
        // No parsers loaded — pass through as raw event
        console.info(`[orchestrator] line ${lineCount}: no parsers loaded, passing through as raw event`)
        event.Process = true
        event.Meta['source_ip'] = ''
        parsed = event
      }

      if (!parsed.Process || parsed.Whitelisted) {
        if (parsed.Whitelisted) {
          console.info(`[orchestrator] line ${lineCount}: WHITELISTED → discarded`)
        } else {
          console.info(`[orchestrator] line ${lineCount}: NOT PARSED (Process=false) → discarded`)
        }
        discardedCount++
        continue
      }

      // Ensure MarshaledTime is set (required for timemachine buckets)
      if (!parsed.MarshaledTime) {
        parsed.MarshaledTime = new Date().toISOString()
        parsed.Time = new Date()
      }

      parsedCount++
      console.info(`[orchestrator] line ${lineCount}: parsed OK  src=${parsed.Meta['source_ip'] ?? '?'}  t=${parsed.MarshaledTime}`)

      // GC buckets periodically
      if (parsedCount % GC_INTERVAL === 0) {
        console.info(`[orchestrator] GC buckets at parsedCount=${parsedCount}`)
        garbageCollectBuckets(parsed.Time, this.store)
      }

      // Pour into buckets
      if (this.factories.length > 0) {
        const poured = pourItemToHolders(parsed, this.factories, this.store)
        if (poured) pouredCount++
      } else {
        console.info(`[orchestrator] line ${lineCount}: no scenarios loaded, skipping bucket pour`)
      }
    }

    console.info(`[orchestrator] replay done: total=${lineCount} parsed=${parsedCount} discarded=${discardedCount} poured=${pouredCount}`)

    // Flush remaining active buckets that have counter/timed overflow pending
    const preFlushSize = this.overflowChan.length
    this.flushTimedBuckets()
    const flushed = this.overflowChan.length - preFlushSize
    if (flushed > 0) {
      console.info(`[orchestrator] flushed ${flushed} timed bucket(s) at end of replay`)
    }

    // Build alerts from overflow channel
    const alerts: RuntimeAlert[] = []
    for (const overflow of this.overflowChan) {
      const alert = buildAlert(overflow)
      if (alert) {
        console.info(`[orchestrator] ALERT built: scenario="${alert.scenario}"  src=${alert.sources.map(s => s.value || s.ip).join(', ')}  events=${alert.eventsCount}  remediation=${alert.remediation}`)
        alerts.push(alert)
      }
    }

    // Build bucket report
    const bucketReport = this.buildBucketReport()

    return {
      alerts,
      bucketReport,
      parsedCount,
      discardedCount,
      pouredCount,
      totalLines: lineCount,
    }
  }

  /** Flush any counter/timed buckets that haven't yet overflowed at end of replay */
  private flushTimedBuckets(): void {
    for (const bucket of this.store.snapshot()) {
      if (bucket.overflowed || bucket.canceled) continue
      if (!bucket.timedOverflow) continue
      if (bucket.queue.length === 0) continue

      // Force overflow: counter buckets overflow when their duration ends
      bucket.ovflwTs = bucket.durationDeadline ?? bucket.lastTs ?? new Date()
      bucket.overflowed = true
      this.overflowChan.push({
        factory: bucket.factory,
        leaky: bucket,
        queue: [...bucket.queue],
      })
    }
  }

  // ---------------------------------------------------------------------------
  // Bucket report
  // ---------------------------------------------------------------------------

  private buildBucketReport(): BucketReport[] {
    const report: BucketReport[] = []

    for (const bucket of this.store.snapshot()) {
      if (bucket.queue.length === 0 && !bucket.overflowed) continue

      const capacity = bucket.capacity
      const fill = bucketFillPercent(bucket.tokens, capacity)

      // Derive partition value from mapkey (not the hash — use last event's groupby value)
      const lastEvt = bucket.queue[bucket.queue.length - 1]
      const partitionValue = lastEvt
        ? (lastEvt.Meta['source_ip'] ?? lastEvt.Parsed['source_ip'] ?? bucket.mapkey.slice(0, 8))
        : bucket.mapkey.slice(0, 8)

      report.push({
        scenario:       bucket.factory.spec.name,
        mapkey:         bucket.mapkey,
        partitionValue,
        totalEvents:    bucket.totalCount,
        capacity,
        fillPercent:    fill,
        firstSeen:      bucket.firstTs?.toISOString() ?? '',
        lastSeen:       bucket.lastTs?.toISOString()  ?? '',
        overflowed:     bucket.overflowed,
      })
    }

    // Sort by fill descending
    return report.sort((a, b) => b.fillPercent - a.fillPercent)
  }
}

// Singleton for use from the UI
export const engine = new ReplayEngine()
