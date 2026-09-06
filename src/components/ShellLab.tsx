'use client'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { createInitialState, execute, prompt, ShellState, getNode, resolvePath, COMMANDS } from '@/lib/shell-sim'
import { useProgress } from '@/hooks/useProgress'

export interface ShellCheck { name: string; check: (state: ShellState, lastOutput: string) => boolean | string }

interface Props {
  id?: string
  title?: string
  task?: string
  checks?: ShellCheck[]
  hints?: string[]
  solution?: string
  intro?: string[]
  height?: number
}

type Line = { kind: 'command' | 'stdout' | 'stderr' | 'info'; text: string }

/** An interactive practice shell. State lives in the component; checks inspect the virtual file system. */
export function ShellLab({ id, title, task, checks, hints = [], solution, intro, height = 320 }: Props) {
  const stateRef = useRef<ShellState>(createInitialState())
  const [lines, setLines] = useState<Line[]>(() => (intro ?? ['Practice shell — type help to see what is available.']).map(text => ({ kind: 'info' as const, text })))
  const [value, setValue] = useState('')
  const [histIdx, setHistIdx] = useState<number | null>(null)
  const [results, setResults] = useState<Array<{ name: string; passed: boolean; message: string }> | null>(null)
  const [hintsShown, setHintsShown] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [lastOutput, setLastOutput] = useState('')
  const [promptText, setPromptText] = useState(() => prompt(createInitialState()))
  const screenRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { markExerciseDone, isExerciseDone } = useProgress()
  const done = id ? isExerciseDone(id) : false

  useEffect(() => { screenRef.current?.scrollTo({ top: screenRef.current.scrollHeight }) }, [lines])

  const run = (command: string) => {
    const state = stateRef.current
    const promptText = prompt(state)
    let cleared = false
    const r = execute(state, command, () => { cleared = true })
    const next: Line[] = cleared ? [] : [...lines, { kind: 'command', text: `${promptText} ${command}` }]
    if (r.out) next.push({ kind: 'stdout', text: r.out.replace(/\n$/, '') })
    if (r.err) next.push({ kind: 'stderr', text: r.err.replace(/\n$/, '') })
    setLines(next)
    setLastOutput(r.out)
    setPromptText(prompt(state))
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const command = value
    setValue('')
    setHistIdx(null)
    if (!command.trim()) { setLines(l => [...l, { kind: 'command', text: `${promptText} ` }]); return }
    run(command)
  }

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const h = stateRef.current.history
    if (e.key === 'ArrowUp') { e.preventDefault(); if (!h.length) return; const i = histIdx === null ? h.length - 1 : Math.max(0, histIdx - 1); setHistIdx(i); setValue(h[i]) }
    else if (e.key === 'ArrowDown') { e.preventDefault(); if (histIdx === null) return; const i = histIdx + 1; if (i >= h.length) { setHistIdx(null); setValue('') } else { setHistIdx(i); setValue(h[i]) } }
    else if (e.key === 'Tab') {
      e.preventDefault()
      const parts = value.split(' ')
      const last = parts[parts.length - 1]
      const state = stateRef.current
      let candidates: string[] = []
      if (parts.length === 1) candidates = (COMMANDS as readonly string[]).filter(c => c.startsWith(last))
      else {
        const slash = last.lastIndexOf('/')
        const dirPart = slash === -1 ? '' : last.slice(0, slash + 1)
        const base = slash === -1 ? last : last.slice(slash + 1)
        const node = getNode(state, resolvePath(state, dirPart || '.'))
        if (node && node.type === 'dir') candidates = Object.keys(node.children).filter(n => n.startsWith(base)).map(n => dirPart + n + (node.children[n].type === 'dir' ? '/' : ''))
      }
      if (candidates.length === 1) { parts[parts.length - 1] = candidates[0]; setValue(parts.join(' ') + (candidates[0].endsWith('/') ? '' : ' ')) }
      else if (candidates.length > 1) setLines(l => [...l, { kind: 'info', text: candidates.join('  ') }])
    } else if (e.ctrlKey && e.key === 'l') { e.preventDefault(); setLines([]) }
    else if (e.ctrlKey && e.key === 'c') { e.preventDefault(); setValue(''); setLines(l => [...l, { kind: 'command', text: `${promptText} ${value}^C` }]) }
  }

  const check = () => {
    if (!checks) return
    const res = checks.map(c => {
      try {
        const r = c.check(stateRef.current, lastOutput)
        return { name: c.name, passed: r === true, message: typeof r === 'string' ? r : r ? '' : 'Not yet.' }
      } catch (err) {
        return { name: c.name, passed: false, message: String((err as Error).message) }
      }
    })
    setResults(res)
    if (res.every(r => r.passed) && id) markExerciseDone(id)
  }

  const reset = () => { stateRef.current = createInitialState(); setPromptText(prompt(stateRef.current)); setLines([{ kind: 'info', text: 'Shell reset. Files are back to the starting state.' }]); setResults(null); setLastOutput('') }
  const passed = results ? results.filter(r => r.passed).length : 0

  return (
    <section className={`sc-lab shell-lab ${done ? 'sc-lab-done' : ''}`} aria-label={title ?? 'Practice shell'}>
      {(title || task) && (
        <header className="sc-lab-head">
          <div>
            <span className="sc-lab-kicker">{checks ? 'Shell exercise' : 'Practice shell'}</span>
            {title && <h3>{title}</h3>}
            {task && <p className="shell-task">{task}</p>}
          </div>
          {checks && <span className={`sc-lab-badge ${done ? 'is-done' : ''}`}>{done ? '✓ Solved' : `${checks.length} check${checks.length === 1 ? '' : 's'}`}</span>}
        </header>
      )}
      <div className="shell-screen" ref={screenRef} style={{ height }} onClick={() => inputRef.current?.focus()}>
        {lines.map((l, i) => <div key={i} className={`shell-line is-${l.kind}`}>{l.text}</div>)}
        <form onSubmit={submit} className="shell-input-row">
          <span className="shell-prompt">{promptText}</span>
          <input ref={inputRef} value={value} onChange={e => setValue(e.target.value)} onKeyDown={onKey} autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck={false} aria-label="Shell command" />
        </form>
      </div>
      <div className="sc-lab-toolbar">
        <div className="sc-lab-actions">
          {checks && <button type="button" className="sc-btn sc-btn-check" onClick={check}>✓ Check</button>}
          <button type="button" className="sc-btn sc-btn-ghost" onClick={reset}>↺ Reset files</button>
          <button type="button" className="sc-btn sc-btn-ghost" onClick={() => setLines([])}>Clear screen</button>
          {hints.length > 0 && hintsShown < hints.length && <button type="button" className="sc-btn sc-btn-ghost" onClick={() => setHintsShown(h => h + 1)}>💡 Hint {hintsShown + 1}/{hints.length}</button>}
          {solution && <button type="button" className="sc-btn sc-btn-ghost" onClick={() => setShowSolution(s => !s)}>{showSolution ? 'Hide solution' : 'Show solution'}</button>}
        </div>
        <span className="sc-lab-status is-ready">simulated bash<kbd>Tab</kbd> completes <kbd>↑</kbd> history</span>
      </div>
      {hintsShown > 0 && <ol className="sc-hints">{hints.slice(0, hintsShown).map((h, i) => <li key={i}><span>Hint {i + 1}</span>{h}</li>)}</ol>}
      {results && (
        <div className={`sc-results ${passed === results.length ? 'all-pass' : ''}`}>
          <div className="sc-results-head">{passed === results.length ? '✓ All checks passed — well done.' : `${passed} of ${results.length} checks passed`}</div>
          <ul>{results.map((r, i) => <li key={i} className={r.passed ? 'pass' : 'fail'}><span aria-hidden>{r.passed ? '✓' : '✗'}</span><div><strong>{r.name}</strong>{!r.passed && r.message && <p>{r.message}</p>}</div></li>)}</ul>
        </div>
      )}
      {showSolution && solution && <div className="sc-solution"><div className="sc-solution-head">One way to do it</div><pre>{solution}</pre></div>}
    </section>
  )
}
