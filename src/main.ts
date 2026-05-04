/**
 * UI controller — wires DOM events to the ReplayEngine.
 */

import { engine } from './engine/orchestrator'
import type { RuntimeAlert, BucketReport } from './engine/types'
import { ENVS_COLLECTION, type EnvFile } from './data/lpEnv'

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

const state = {
  parserS00Files: [] as EnvFile[],
  parserS01Files: [] as EnvFile[],
  parserS02Files: [] as EnvFile[],
  scenarioFiles:  [] as EnvFile[],
}

// ---------------------------------------------------------------------------
// DOM helpers
// ---------------------------------------------------------------------------

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T

const logInput      = $<HTMLTextAreaElement>('log-input')
const runBtn        = $<HTMLButtonElement>('run-btn')
const loadTestDataBtn = $<HTMLButtonElement>('load-test-data')
const parserS00List = $<HTMLUListElement>('parser-s00-list')
const parserS01List = $<HTMLUListElement>('parser-s01-list')
const parserS02List = $<HTMLUListElement>('parser-s02-list')
const scenarioList  = $<HTMLUListElement>('scenario-list')
const statusBadge   = $<HTMLSpanElement>('status-badge')
const lineCountEl   = $<HTMLSpanElement>('line-count')
const statsBar      = $<HTMLDivElement>('stats-bar')
const alertsContainer  = $<HTMLDivElement>('alerts-container')
const bucketsContainer = $<HTMLDivElement>('buckets-container')

// ---------------------------------------------------------------------------
// File loading
// ---------------------------------------------------------------------------

function setupFileInput(
  inputId: string,
  dropZoneId: string,
  files: EnvFile[],
  listEl: HTMLUListElement,
  kind: 'parser' | 'scenario',
  stage?: 's00' | 's01' | 's02',
) {
  const input    = $<HTMLInputElement>(inputId)
  const dropZone = $<HTMLDivElement>(dropZoneId)

  const loadFiles = async (fileList: FileList) => {
    for (const file of Array.from(fileList)) {
      if (files.some(f => f.name === file.name)) continue
      let text: string
      try {
        text = await file.text()
      } catch {
        console.warn(`Could not read file "${file.name}" — it may have been moved or removed.`)
        continue
      }
      files.push({ name: file.name, text })
    }
    renderFileList(files, listEl, kind, stage)
    syncEngine()
    updateRunBtn()
  }

  input.addEventListener('change', () => {
    if (input.files) loadFiles(input.files)
    input.value = ''
  })

  dropZone.addEventListener('dragover', e => {
    e.preventDefault()
    dropZone.classList.add('drag-over')
  })
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'))
  dropZone.addEventListener('drop', e => {
    e.preventDefault()
    dropZone.classList.remove('drag-over')
    if (e.dataTransfer?.files) loadFiles(e.dataTransfer.files)
  })
}

function renderFileList(files: EnvFile[], listEl: HTMLUListElement, kind: 'parser' | 'scenario', stage?: 's00' | 's01' | 's02') {
  listEl.innerHTML = ''
  for (let i = 0; i < files.length; i++) {
    const f = files[i]
    const li = document.createElement('li')
    li.draggable = true
    li.dataset.index = String(i)
    li.dataset.kind = kind
    const stageAttr = stage ? ` data-stage="${stage}"` : ''
    li.innerHTML = `<span class="drag-handle" title="Drag to reorder">⠿</span>
      <span class="file-name">${escHtml(f.name)}</span>
      <button class="remove-file" data-name="${escHtml(f.name)}" data-kind="${kind}"${stageAttr} title="Remove">✕</button>`
    listEl.appendChild(li)
  }
  setupDragReorder(listEl, files, kind)
}

function loadTestData() {
  const env = ENVS_COLLECTION[0]
  state.parserS00Files = env.parserS00Files.map(f => ({ ...f }))
  state.parserS01Files = env.parserS01Files.map(f => ({ ...f }))
  state.parserS02Files = env.parserS02Files.map(f => ({ ...f }))
  state.scenarioFiles  = env.scenarioFiles.map(f => ({ ...f }))
  logInput.value = env.logsText
  $<HTMLSelectElement>('log-type-select').value = env.defaultLogType

  renderFileList(state.parserS00Files, parserS00List, 'parser', 's00')
  renderFileList(state.parserS01Files, parserS01List, 'parser', 's01')
  renderFileList(state.parserS02Files, parserS02List, 'parser', 's02')
  renderFileList(state.scenarioFiles, scenarioList, 'scenario')
  syncEngine()

  const lines = logInput.value.split('\n').filter(l => l.trim()).length
  lineCountEl.textContent = `${lines} line${lines !== 1 ? 's' : ''}`
  updateRunBtn()
  setStatus('idle')
}

// ---------------------------------------------------------------------------
// Drag-to-reorder
// ---------------------------------------------------------------------------

function setupDragReorder(listEl: HTMLUListElement, files: EnvFile[], kind: 'parser' | 'scenario') {
  let dragSrcIndex = -1

  listEl.addEventListener('dragstart', (e) => {
    const li = (e.target as HTMLElement).closest('li') as HTMLLIElement | null
    if (!li) return
    dragSrcIndex = Number(li.dataset.index)
    li.classList.add('dragging')
    e.dataTransfer!.effectAllowed = 'move'
  })

  listEl.addEventListener('dragover', (e) => {
    e.preventDefault()
    e.dataTransfer!.dropEffect = 'move'
    const li = (e.target as HTMLElement).closest('li') as HTMLLIElement | null
    listEl.querySelectorAll('li').forEach(el => el.classList.remove('drag-over'))
    if (li) li.classList.add('drag-over')
  })

  listEl.addEventListener('dragleave', () => {
    listEl.querySelectorAll('li').forEach(el => el.classList.remove('drag-over'))
  })

  listEl.addEventListener('drop', (e) => {
    e.preventDefault()
    listEl.querySelectorAll('li').forEach(el => el.classList.remove('drag-over', 'dragging'))
    const li = (e.target as HTMLElement).closest('li') as HTMLLIElement | null
    if (!li) return
    const dropIndex = Number(li.dataset.index)
    if (dragSrcIndex === dropIndex) return

    // Reorder in place
    const [moved] = files.splice(dragSrcIndex, 1)
    files.splice(dropIndex, 0, moved)

    renderFileList(files, listEl, kind)
    syncEngine()
  })

  listEl.addEventListener('dragend', () => {
    listEl.querySelectorAll('li').forEach(el => el.classList.remove('dragging', 'drag-over'))
  })
}

document.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest('.remove-file') as HTMLButtonElement | null
  if (!btn) return
  const name  = btn.dataset.name!
  const kind  = btn.dataset.kind as 'parser' | 'scenario'
  const stage = btn.dataset.stage as 's00' | 's01' | 's02' | undefined
  if (kind === 'parser') {
    if (stage === 's00') {
      state.parserS00Files = state.parserS00Files.filter(f => f.name !== name)
      renderFileList(state.parserS00Files, parserS00List, 'parser')
    } else if (stage === 's01') {
      state.parserS01Files = state.parserS01Files.filter(f => f.name !== name)
      renderFileList(state.parserS01Files, parserS01List, 'parser')
    } else {
      state.parserS02Files = state.parserS02Files.filter(f => f.name !== name)
      renderFileList(state.parserS02Files, parserS02List, 'parser')
    }
  } else {
    state.scenarioFiles = state.scenarioFiles.filter(f => f.name !== name)
    renderFileList(state.scenarioFiles, scenarioList, 'scenario')
  }
  syncEngine()
  updateRunBtn()
})

// ---------------------------------------------------------------------------
// Engine sync
// ---------------------------------------------------------------------------

function syncEngine() {
  const logType = $<HTMLSelectElement>('log-type-select').value

  engine.clearParsers()
  engine.clearScenarios()

  for (const f of state.parserS00Files) engine.loadParsers([f.text], 's00-parse')
  for (const f of state.parserS01Files) engine.loadParsers([f.text], 's01-parse')
  for (const f of state.parserS02Files) engine.loadParsers([f.text], 's02-parse')

  engine.loadScenarios(state.scenarioFiles.map(f => f.text))
  void logType // used at replay time
}

// ---------------------------------------------------------------------------
// Log input
// ---------------------------------------------------------------------------

logInput.addEventListener('input', () => {
  const lines = logInput.value.split('\n').filter(l => l.trim()).length
  lineCountEl.textContent = `${lines} line${lines !== 1 ? 's' : ''}`
  updateRunBtn()
})

// ---------------------------------------------------------------------------
// Run button
// ---------------------------------------------------------------------------

function updateRunBtn() {
  const hasLines     = logInput.value.trim().length > 0
  const hasScenarios = state.scenarioFiles.length > 0 || engine.scenarioNames.length > 0
  runBtn.disabled = !(hasLines && hasScenarios)
}

runBtn.addEventListener('click', runReplay)

async function runReplay() {
  const rawText = logInput.value
  const lines   = rawText.split('\n')

  const logType = $<HTMLSelectElement>('log-type-select').value
  const keepState = $<HTMLInputElement>('keep-state').checked

  setStatus('running')
  runBtn.disabled = true

  // Yield to browser for repaint
  await tick()

  try {
    const result = engine.replay(lines, {
      logType: logType || undefined,
      keepBucketState: keepState,
    })

    // Stats
    statsBar.classList.remove('hidden')
    $('stat-total').textContent   = String(result.totalLines)
    $('stat-parsed').textContent  = String(result.parsedCount)
    $('stat-poured').textContent  = String(result.pouredCount)
    $('stat-alerts').textContent  = String(result.alerts.length)

    renderAlerts(result.alerts)
    renderBucketReport(result.bucketReport)

    setStatus('done')
  } catch (err) {
    console.error(err)
    setStatus('error')
    alertsContainer.innerHTML = `<div class="empty-state" style="color:var(--cs-danger)">
      Error: ${escHtml(String(err))}
    </div>`
  } finally {
    updateRunBtn()
  }
}

// ---------------------------------------------------------------------------
// Alerts rendering
// ---------------------------------------------------------------------------

function renderAlerts(alerts: RuntimeAlert[]) {
  if (alerts.length === 0) {
    alertsContainer.innerHTML = '<div class="empty-state">No alerts generated</div>'
    return
  }

  alertsContainer.innerHTML = alerts.map((a, i) => alertCard(a, i)).join('')

  // Expand/collapse toggles
  alertsContainer.querySelectorAll('.alert-details-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const details = (btn as HTMLElement).nextElementSibling as HTMLElement
      const open = details.classList.toggle('open')
      btn.textContent = open ? '▾ Hide events' : '▸ Show events'
    })
  })
}

function alertCard(a: RuntimeAlert, idx: number): string {
  const remTag = a.remediation
    ? '<span class="tag tag-ban">BAN</span>'
    : '<span class="tag" style="background:rgba(245,158,11,0.2);color:var(--cs-warn)">ALERT</span>'

  const evtCount = `<span class="tag tag-events">${a.eventsCount} events</span>`

  const sources = a.sources.map(s =>
    `<span class="tag tag-source">${escHtml(s.value || s.ip)}</span>`
  ).join('')

  const borderClass = a.remediation ? 'remediation' : 'no-remediation'

  const rows = [
    ['Scenario',   a.scenario],
    ['Start',      a.startAt],
    ['End',        a.stopAt],
    ['Events',     String(a.eventsCount)],
    ['Capacity',   String(a.capacity)],
    ['Leak speed', a.leakspeed],
    ...a.sources.map(s => ['Source', `${s.value}${s.cn ? ' ('+s.cn+')' : ''}${s.asOrg ? ' / '+s.asOrg : ''}`]),
    ...Object.entries(a.labels).map(([k, v]) => [`Label.${k}`, String(v)]),
  ]

  const tableRows = rows.map(([k, v]) =>
    `<tr><td>${escHtml(k)}</td><td>${escHtml(v)}</td></tr>`
  ).join('')

  return `
<div class="alert-card ${borderClass}" id="alert-${idx}">
  <div class="alert-header">
    <div>
      <div class="alert-scenario">${escHtml(a.scenario)}</div>
      <div class="alert-meta">${escHtml(a.scenarioDescription || '')}</div>
    </div>
    <div class="alert-tags">${remTag}${evtCount}${sources}</div>
  </div>
  <div class="alert-message">${escHtml(a.message)}</div>
  <button class="alert-details-toggle">▸ Show events</button>
  <div class="alert-details">
    <table>${tableRows}</table>
  </div>
</div>`
}

// ---------------------------------------------------------------------------
// Bucket report rendering
// ---------------------------------------------------------------------------

function renderBucketReport(report: BucketReport[]) {
  if (report.length === 0) {
    bucketsContainer.innerHTML = '<div class="empty-state">No active buckets</div>'
    return
  }

  bucketsContainer.innerHTML = report.map(b => bucketCard(b)).join('')
}

function bucketCard(b: BucketReport): string {
  const fill = b.fillPercent
  const fillClass = fill >= 100 ? 'fill-full'
    : fill >= 75 ? 'fill-high'
    : fill >= 50 ? 'fill-medium'
    : 'fill-low'

  const ovfBadge = b.overflowed
    ? '<span class="bucket-overflowed">OVERFLOWED</span>'
    : ''

  return `
<div class="bucket-card">
  <div class="bucket-header">
    <div>
      <div class="bucket-scenario">${escHtml(b.scenario)}</div>
      <div class="bucket-partition">${escHtml(b.partitionValue)}</div>
    </div>
    <div style="display:flex;align-items:center;gap:6px">
      ${ovfBadge}
      <span style="font-size:13px;font-weight:700;color:var(--cs-text)">${fill}%</span>
    </div>
  </div>
  <div class="fill-bar">
    <div class="fill-bar-inner ${fillClass}" style="width:${Math.min(fill,100)}%"></div>
  </div>
  <div class="bucket-stats">
    <span>${b.totalEvents} events</span>
    <span>cap: ${b.capacity}</span>
    ${b.firstSeen ? `<span>first: ${fmtTime(b.firstSeen)}</span>` : ''}
    ${b.lastSeen  ? `<span>last: ${fmtTime(b.lastSeen)}</span>`  : ''}
  </div>
</div>`
}

// ---------------------------------------------------------------------------
// Misc controls
// ---------------------------------------------------------------------------

$('clear-parsers').addEventListener('click', () => {
  state.parserS00Files = []
  state.parserS01Files = []
  state.parserS02Files = []
  renderFileList(state.parserS00Files, parserS00List, 'parser', 's00')
  renderFileList(state.parserS01Files, parserS01List, 'parser', 's01')
  renderFileList(state.parserS02Files, parserS02List, 'parser', 's02')
  engine.clearParsers()
  updateRunBtn()
})

$('clear-scenarios').addEventListener('click', () => {
  state.scenarioFiles = []
  renderFileList(state.scenarioFiles, scenarioList, 'scenario')
  engine.clearScenarios()
  updateRunBtn()
})

$('reset-buckets').addEventListener('click', () => {
  engine.resetBuckets()
  bucketsContainer.innerHTML = '<div class="empty-state">Bucket state cleared</div>'
})

loadTestDataBtn.addEventListener('click', () => {
  loadTestData()
})

// Tabs
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const name = (tab as HTMLElement).dataset.tab!
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'))
    tab.classList.add('active')
    document.getElementById(`tab-${name}`)!.classList.add('active')
  })
})

// ---------------------------------------------------------------------------
// Init file input wiring
// ---------------------------------------------------------------------------

setupFileInput('parser-s00-files', 'parser-s00-drop', state.parserS00Files, parserS00List, 'parser', 's00')
setupFileInput('parser-s01-files', 'parser-s01-drop', state.parserS01Files, parserS01List, 'parser', 's01')
setupFileInput('parser-s02-files', 'parser-s02-drop', state.parserS02Files, parserS02List, 'parser', 's02')
setupFileInput('scenario-files',   'scenario-drop',   state.scenarioFiles,  scenarioList,  'scenario')

// Load repository fixtures on startup so the app is immediately runnable.
loadTestData()

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function setStatus(s: 'idle' | 'running' | 'done' | 'error') {
  statusBadge.className = `badge badge-${s}`
  statusBadge.textContent = s.charAt(0).toUpperCase() + s.slice(1)
}

function tick(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0))
}

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
}

function fmtTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString()
  } catch {
    return iso
  }
}
