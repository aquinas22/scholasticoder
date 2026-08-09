'use client'

import { FormEvent, useMemo, useState } from 'react'

const RESPONSES: Record<string, string[]> = {
  help: ['Available: help, ls, pwd, whoami, cat koan.txt, clear'],
  ls: ['lessons/  practice/  koan.txt  README.md'],
  pwd: ['/home/apprentice/dojo'],
  whoami: ['a patient programmer'],
  'cat koan.txt': ['A bug is only a lesson wearing a disguise.'],
  'cat readme.md': ['Welcome, apprentice. Begin with `help`.'],
}

type Line = { kind: 'command' | 'output'; value: string }

export function TempleTerminal() {
  const [history, setHistory] = useState<Line[]>([
    { kind: 'output', value: 'ScholastiCoder shell · practice without consequences' },
    { kind: 'command', value: 'cat koan.txt' },
    { kind: 'output', value: RESPONSES['cat koan.txt'][0] },
  ])
  const [value, setValue] = useState('')
  const prompt = useMemo(() => 'apprentice@dojo ~ %', [])

  function run(event: FormEvent) {
    event.preventDefault()
    const command = value.trim()
    if (!command) return
    if (command.toLowerCase() === 'clear') {
      setHistory([])
    } else {
      const output = RESPONSES[command.toLowerCase()] ?? [`command not found: ${command}`, 'Try `help`.']
      setHistory(current => [...current, { kind: 'command', value: command }, ...output.map(line => ({ kind: 'output' as const, value: line }))])
    }
    setValue('')
  }

  return (
    <div className="temple-terminal" aria-label="Interactive practice terminal">
      <div className="terminal-bar">
        <div className="terminal-dots" aria-hidden="true"><span /><span /><span /></div>
        <span>dojo — zsh</span>
        <span className="terminal-status">● local</span>
      </div>
      <div className="terminal-screen" onClick={event => event.currentTarget.querySelector('input')?.focus()}>
        {history.map((line, index) => (
          <div className={line.kind === 'command' ? 'terminal-command' : 'terminal-output'} key={`${line.value}-${index}`}>
            {line.kind === 'command' && <span>{prompt} </span>}{line.value}
          </div>
        ))}
        <form onSubmit={run} className="terminal-input-row">
          <label htmlFor="dojo-command">{prompt}</label>
          <input id="dojo-command" value={value} onChange={event => setValue(event.target.value)} autoComplete="off" spellCheck={false} aria-label="Terminal command" />
          <span className="terminal-caret" aria-hidden="true" />
        </form>
      </div>
      <div className="terminal-hint">Try <button type="button" onClick={() => setValue('help')}>help</button>, <button type="button" onClick={() => setValue('ls')}>ls</button>, or <button type="button" onClick={() => setValue('whoami')}>whoami</button></div>
    </div>
  )
}
