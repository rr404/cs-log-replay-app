/**
 * Alert builder — port of pkg/leakybucket/overflows.go:NewAlert()
 *
 * Converts a bucket overflow into a structured RuntimeAlert for display.
 */

import type { CrowdSecEvent, RuntimeAlert, AlertSource, AlertEvent } from './types'
import type { OverflowEvent } from './bucket'

export function buildAlert(overflow: OverflowEvent): RuntimeAlert | null {
  const { factory, leaky, queue } = overflow
  const spec = factory.spec

  if (queue.length === 0) return null

  const firstTs = leaky.firstTs?.toISOString() ?? new Date().toISOString()
  const stopTs  = leaky.ovflwTs?.toISOString()  ?? leaky.lastTs?.toISOString() ?? new Date().toISOString()
  const lastTs  = leaky.lastTs?.toISOString() ?? new Date().toISOString()

  // Extract sources from queued events
  const sourcesMap = new Map<string, AlertSource>()
  for (const evt of queue) {
    const src = sourceFromEvent(evt, spec.scope?.type ?? 'Ip')
    if (src) sourcesMap.set(src.value, src)
  }
  const sources = Array.from(sourcesMap.values())

  // Build per-event metadata
  const events: AlertEvent[] = queue.map(evt => eventsFromQueue(evt))

  const sourceStr = sources.length === 0 ? 'UNKNOWN'
    : sources.length === 1 ? sources[0].value
    : `${sources.length} sources`

  const durationSec = leaky.firstTs && leaky.ovflwTs
    ? Math.round((leaky.ovflwTs.getTime() - leaky.firstTs.getTime()) / 1000)
    : 0

  const message = `${spec.scope?.type ?? 'Ip'} ${sourceStr} performed '${spec.name}' (${leaky.totalCount} events over ${formatDuration(durationSec)}) at ${lastTs}`

  const remediation = !!(spec.labels?.['remediation'])

  return {
    mapkey:              leaky.mapkey,
    scenario:            spec.name,
    scenarioDescription: spec.description ?? '',
    capacity:            spec.capacity,
    eventsCount:         leaky.totalCount,
    leakspeed:           spec.leakspeed ?? '',
    startAt:             firstTs,
    stopAt:              stopTs,
    message,
    sources,
    events,
    labels:              spec.labels ?? {},
    remediation,
    simulated:           false,
  }
}

function sourceFromEvent(evt: CrowdSecEvent, scope: string): AlertSource | null {
  const ip = evt.Meta['source_ip'] ?? evt.Parsed['source_ip'] ?? ''
  if (!ip && scope === 'Ip') return null

  const src: AlertSource = {
    ip,
    range:    evt.Meta['SourceRange']   ?? '',
    scope:    scope,
    value:    ip || '',
    cn:       evt.Enriched['IsoCode']   ?? evt.Meta['IsoCode']   ?? '',
    asNumber: evt.Enriched['ASNNumber'] ?? evt.Meta['ASNNumber'] ?? '',
    asOrg:    evt.Enriched['ASNOrg']    ?? evt.Meta['ASNOrg']    ?? '',
    latitude:  parseFloat(evt.Enriched['Latitude']  ?? '0') || 0,
    longitude: parseFloat(evt.Enriched['Longitude'] ?? '0') || 0,
  }

  if (scope === 'Range' && src.range) src.value = src.range
  return src
}

function eventsFromQueue(evt: CrowdSecEvent): AlertEvent {
  const meta: Array<{ key: string; value: string }> = []
  for (const [k, v] of Object.entries(evt.Meta)) {
    meta.push({ key: k, value: v })
  }
  meta.sort((a, b) => a.key.localeCompare(b.key))

  const timestamp = evt.MarshaledTime || evt.Time?.toISOString() || ''
  return { timestamp, meta }
}

function formatDuration(totalSeconds: number): string {
  if (totalSeconds < 60) return `${totalSeconds}s`
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  const parts = []
  if (h) parts.push(`${h}h`)
  if (m) parts.push(`${m}m`)
  if (s) parts.push(`${s}s`)
  return parts.join('')
}

/** Compute bucket fill percentage at the time of last event */
export function bucketFillPercent(tokens: number, capacity: number): number {
  if (capacity <= 0) return 100  // counter / conditional / trigger
  return Math.round((1 - tokens / capacity) * 100)
}
