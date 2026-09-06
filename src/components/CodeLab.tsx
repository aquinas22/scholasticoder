'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { CodeEditor } from './CodeEditor'
import { OutputPanel, OutputChunk, OutputTable } from './OutputPanel'
import { pythonRuntime, usePythonRuntime, TestResult } from '@/lib/python-runtime'
import { runJavaScript } from '@/lib/js-runtime'
import { runSql, resetSqlDatabase } from '@/lib/sql-runtime'
import { useProgress } from '@/hooks/useProgress'
import type { TestCase } from '@/content/types'

export type Runtime = 'python' | 'javascript' | 'sql'

interface Props {
  runtime: Runtime
  code: string
  /** Stable id used to remember exercise completion. Only needed when `tests` are given. */
  id?: string
  title?: string
  stdin?: string
  tests?: TestCase[]
  hints?: string[]
  solution?: string
  minLines?: number
  /** Compact mode is used inline in lessons: no title bar, output only appears after the first run. */
  compact?: boolean
  onPass?: () => void
  onCodeChange?: (code: string) => void
}

const FRIENDLY_ERRORS: Array<[RegExp, string]> = [
  [/ModuleNotFoundError: No module named '([^']+)'/, "No module named '$1'. If that is a file you would create yourself, remember the sandbox only has this one program; if it is a third-party package that is not pure Python, it needs to run on your own machine — the Setup section on the language page shows how."],
  [/document is not defined|window is not defined/, 'This snippet needs a web page (the DOM). Paste it into an HTML playground block or your browser console instead.'],
  [/EOFError/, 'input() ran out of lines. Open “Program input” below the editor and type the answers ahead of time, one per line.'],
  [/require\('([^']+)'\)/, "Node modules such as '$1' aren't available in the browser sandbox. Run this one locally with Node.js."],
]

function friendly(error: string): string | null {
  for (const [re, msg] of FRIENDLY_ERRORS) {
    const m = error.match(re)
    if (m) return msg.replace('$1', m[1] ?? '')
  }
  return null
}

export function CodeLab({ runtime, code: initial, id, title, stdin: initialStdin = '', tests, hints = [], solution, minLines, compact = false, onPass, onCodeChange }: Props) {
  const [code, setCode] = useState(initial)
  const [stdin, setStdin] = useState(initialStdin)
  const [showStdin, setShowStdin] = useState(!!initialStdin)
  const [chunks, setChunks] = useState<OutputChunk[]>([])
  const [tables, setTables] = useState<OutputTable[]>([])
  const [copied, setCopied] = useState(false)
  const [running, setRunning] = useState(false)
  const [ms, setMs] = useState<number | null>(null)
  const [results, setResults] = useState<TestResult[] | null>(null)
  const [hintsShown, setHintsShown] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [everRan, setEverRan] = useState(false)
  const [justPassed, setJustPassed] = useState(false)
  const [runStatus, setRunStatus] = useState('')
  const stopRef = useRef<(() => void) | null>(null)
  const py = usePythonRuntime()
  const { markExerciseDone, isExerciseDone } = useProgress()
  const done = id ? isExerciseDone(id) : false
  const isPython = runtime === 'python'
  const isSql = runtime === 'sql'
  const pathname = usePathname()

  const append = useCallback((kind: OutputChunk['kind'], text: string) => {
    setChunks(prev => {
      const last = prev[prev.length - 1]
      if (last && last.kind === kind) return [...prev.slice(0, -1), { kind, text: last.text + text }]
      return [...prev, { kind, text }]
    })
  }, [])

  const execute = useCallback(async (withTests: boolean) => {
    if (running) return
    setChunks([])
    setTables([])
    setResults(null)
    setMs(null)
    setRunning(true)
    setEverRan(true)
    setRunStatus('')
    const handlers = {
      onStdout: (t: string) => append('stdout', t),
      onStderr: (t: string) => append('stderr', t),
      onStatus: (t: string) => setRunStatus(t),
    }
    let result: { ok: boolean; error?: string; ms: number; stopped?: boolean; tests?: TestResult[] }
    if (isPython) {
      stopRef.current = () => pythonRuntime.stop()
      result = await pythonRuntime.run(code, { ...handlers, stdin, tests: withTests ? tests : undefined })
    } else if (isSql) {
      setRunStatus('Loading SQL engine…')
      const r = await runSql(code, pathname ?? 'global', withTests ? tests : undefined)
      setTables(r.tables.map(t => ({ columns: t.columns, rows: t.rows, caption: t.statement.split('\n').find(l => l.trim() && !l.trim().startsWith('--'))?.trim().slice(0, 90) })))
      for (const n of r.notices) append('info', n.text + '\n')
      result = r
    } else {
      const job = runJavaScript(code, handlers, 8000, withTests ? tests : undefined)
      stopRef.current = job.stop
      result = await job.promise
    }
    stopRef.current = null
    setRunning(false)
    setMs(result.ms)
    if (!result.ok && result.error) {
      append(result.stopped ? 'info' : 'error', (result.stopped ? '' : '\n') + result.error + '\n')
      const tip = friendly(result.error)
      if (tip) append('info', `\n${tip}\n`)
    }
    if (withTests && result.tests) {
      setResults(result.tests)
      const allPassed = result.tests.every(t => t.passed)
      if (allPassed) {
        if (id) markExerciseDone(id)
        setJustPassed(true)
        onPass?.()
      }
    }
  }, [running, code, stdin, tests, isPython, isSql, pathname, append, id, markExerciseDone, onPass])

  useEffect(() => {
    if (!justPassed) return
    const t = setTimeout(() => setJustPassed(false), 2200)
    return () => clearTimeout(t)
  }, [justPassed])

  const run = () => void execute(false)
  const check = () => void execute(true)
  const stop = () => { stopRef.current?.() }
  const reset = () => { setCode(initial); setChunks([]); setTables([]); setResults(null); setMs(null); setShowSolution(false) }
  const resetDb = async () => { await resetSqlDatabase(pathname ?? 'global'); setChunks([{ kind: 'info', text: 'Database reset to the sample data.\n' }]); setTables([]); setMs(null) }
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1600) } catch {}
  }

  const statusChip = isPython
    ? py.status === 'ready' ? `Python ${py.version}` : py.status === 'loading' ? (py.statusText || 'Loading Python…') : py.status === 'running' ? 'running' : py.status === 'error' ? 'Python unavailable' : 'Python (loads on first run)'
    : isSql ? 'SQLite · sample database' : 'JavaScript sandbox'

  const passed = results ? results.filter(r => r.passed).length : 0

  return (
    <section className={`sc-lab ${compact ? 'sc-lab-compact' : ''} ${done ? 'sc-lab-done' : ''} ${justPassed ? 'sc-lab-pass' : ''}`} aria-label={title ?? 'Code playground'}>
      {(title || tests) && (
        <header className="sc-lab-head">
          <div>
            <span className="sc-lab-kicker">{tests ? 'Exercise' : 'Playground'}</span>
            {title && <h3>{title}</h3>}
          </div>
          {tests && <span className={`sc-lab-badge ${done ? 'is-done' : ''}`}>{done ? '✓ Solved' : `${tests.length} check${tests.length === 1 ? '' : 's'}`}</span>}
        </header>
      )}

      <CodeEditor value={code} onChange={c => { setCode(c); onCodeChange?.(c) }} language={runtime} onRun={tests ? check : run} minLines={minLines ?? (compact ? 3 : 10)} ariaLabel={title ? `${title} editor` : 'Code editor'} />

      <div className="sc-lab-toolbar">
        <div className="sc-lab-actions">
          {running ? (
            <button type="button" className="sc-btn sc-btn-stop" onClick={stop}>■ Stop</button>
          ) : (
            <button type="button" className="sc-btn sc-btn-run" onClick={run} disabled={isPython && py.status === 'error'}>▶ Run</button>
          )}
          {tests && !running && <button type="button" className="sc-btn sc-btn-check" onClick={check}>✓ Check answer</button>}
          <button type="button" className="sc-btn sc-btn-ghost" onClick={reset} title="Restore the original code">↺ Reset</button>
          <button type="button" className="sc-btn sc-btn-ghost" onClick={copy} title="Copy the code">{copied ? '✓ Copied' : '⧉ Copy'}</button>
          {isSql && <button type="button" className="sc-btn sc-btn-ghost" onClick={resetDb} title="Recreate the sample tables">⌂ Reset database</button>}
          {isPython && <button type="button" className={`sc-btn sc-btn-ghost ${showStdin ? 'is-on' : ''}`} onClick={() => setShowStdin(s => !s)} title="Lines fed to input(), one per call">⌨ Program input</button>}
          {hints.length > 0 && hintsShown < hints.length && <button type="button" className="sc-btn sc-btn-ghost" onClick={() => setHintsShown(h => h + 1)}>💡 Hint {hintsShown + 1}/{hints.length}</button>}
          {solution && <button type="button" className="sc-btn sc-btn-ghost" onClick={() => setShowSolution(s => !s)}>{showSolution ? 'Hide solution' : 'Show solution'}</button>}
        </div>
        <span className={`sc-lab-status is-${isPython ? py.status : 'ready'}`}>{statusChip}<kbd>Ctrl</kbd>+<kbd>↵</kbd></span>
      </div>

      {showStdin && isPython && (
        <label className="sc-stdin">
          <span>Program input — each line answers one <code>input()</code> call</span>
          <textarea value={stdin} onChange={e => setStdin(e.target.value)} rows={3} spellCheck={false} placeholder={'Alice\n42'} />
        </label>
      )}

      {hintsShown > 0 && (
        <ol className="sc-hints">
          {hints.slice(0, hintsShown).map((h, i) => <li key={i}><span>Hint {i + 1}</span>{h}</li>)}
        </ol>
      )}

      {(everRan || !compact) && (
        <OutputPanel chunks={chunks} tables={tables} running={running} statusText={runStatus} ms={ms} emptyHint={tests ? 'Press Run to try your code, then Check answer to grade it.' : isSql ? 'Press Run to query the sample database. Tables: students, courses, enrollments, customers, products, orders, order_items, employees, daily_sales, accounts, users.' : 'Press Run (or Ctrl+Enter) to execute this code in your browser.'} />
      )}

      {results && (
        <div className={`sc-results ${passed === results.length ? 'all-pass' : ''}`}>
          <div className="sc-results-head">{passed === results.length ? '✓ All checks passed — well done.' : `${passed} of ${results.length} checks passed`}</div>
          <ul>
            {results.map((r, i) => (
              <li key={i} className={r.passed ? 'pass' : 'fail'}>
                <span aria-hidden>{r.passed ? '✓' : '✗'}</span>
                <div><strong>{r.name}</strong>{!r.passed && r.message && <p>{r.message}</p>}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showSolution && solution && (
        <div className="sc-solution">
          <div className="sc-solution-head">Reference solution <button type="button" className="sc-btn sc-btn-ghost" onClick={() => { setCode(solution); setShowSolution(false) }}>Load into editor</button></div>
          <pre>{solution}</pre>
        </div>
      )}
    </section>
  )
}
