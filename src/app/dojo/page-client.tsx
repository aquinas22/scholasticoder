'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { CodeLab, Runtime } from '@/components/CodeLab'
import { ShellLab } from '@/components/ShellLab'
import { challenges } from '@/content/challenges'
import { useProgress } from '@/hooks/useProgress'
import { pythonRuntime, usePythonRuntime } from '@/lib/python-runtime'

interface Example { title: string; runtime: Runtime | 'shell'; code: string }

const EXAMPLES: Example[] = [
  {
    title: 'Hello',
    runtime: 'python',
    code: `# Everything here runs on real CPython, inside your browser.\nimport sys\nprint("Hello from Python", sys.version.split()[0])\n\nfor i in range(1, 6):\n    print("*" * i)\n`,
  },
  {
    title: 'Input and f-strings',
    runtime: 'python',
    code: `# Open "Program input" below and type two lines: a name, then a number.\nname = input("Your name: ")\nage = int(input("Your age: "))\nprint(f"{name}, in ten years you will be {age + 10}.")\n`,
  },
  {
    title: 'Collatz explorer',
    runtime: 'python',
    code: `def collatz_steps(n):\n    steps = 0\n    while n != 1:\n        n = n // 2 if n % 2 == 0 else 3 * n + 1\n        steps += 1\n    return steps\n\nlongest = max(range(1, 10_000), key=collatz_steps)\nprint(f"Under 10,000, {longest} takes the most steps: {collatz_steps(longest)}")\n`,
  },
  {
    title: 'Classes and dataclasses',
    runtime: 'python',
    code: `from dataclasses import dataclass, field\n\n@dataclass\nclass Reader:\n    name: str\n    pages_read: int = 0\n    books: list[str] = field(default_factory=list)\n\n    def read(self, pages):\n        self.pages_read += pages\n        return self\n\nclub = [Reader("Ada").read(120), Reader("Sam").read(300), Reader("Maya").read(210)]\nfor r in sorted(club, key=lambda r: -r.pages_read):\n    print(f"{r.name:<6} {r.pages_read:>4} pages")\n`,
  },
  {
    title: 'Generators and itertools',
    runtime: 'python',
    code: `from itertools import islice, count\n\ndef primes():\n    found = []\n    for n in count(2):\n        if all(n % p for p in found if p * p <= n):\n            found.append(n)\n            yield n\n\nprint(list(islice(primes(), 20)))\n`,
  },
  {
    title: 'The virtual file system',
    runtime: 'python',
    code: `from pathlib import Path\nimport json\n\nPath("data").mkdir(exist_ok=True)\nPath("data/config.json").write_text(json.dumps({"theme": "dark", "retries": 3}, indent=2))\n\nfor p in Path("data").iterdir():\n    print(p, p.stat().st_size, "bytes")\n\nprint(json.loads(Path("data/config.json").read_text()))\n`,
  },
  {
    title: 'NumPy (downloads on first use)',
    runtime: 'python',
    code: `# Scientific packages such as numpy and pandas are fetched on demand.\nimport numpy as np\n\nm = np.arange(1, 10).reshape(3, 3)\nprint(m)\nprint("determinant:", round(np.linalg.det(m), 3))\nprint("column means:", m.mean(axis=0))\n`,
  },
  {
    title: 'TypeScript',
    runtime: 'typescript',
    code: `// TypeScript is compiled in your browser, then run. Types are erased, not checked.\ninterface Reader {\n  name: string\n  pages: number\n  genres?: string[]\n}\n\nfunction keenest(readers: Reader[]): Reader | undefined {\n  return [...readers].sort((a, b) => b.pages - a.pages)[0]\n}\n\nconst club: Reader[] = [\n  { name: 'Ada', pages: 412, genres: ['history'] },\n  { name: 'Sam', pages: 88 },\n]\nconsole.log(keenest(club)?.name)\n`,
  },
  {
    title: 'Shell',
    runtime: 'shell',
    code: '',
  },
  {
    title: 'JavaScript',
    runtime: 'javascript',
    code: `// JavaScript runs in an isolated background worker.\nconst orders = [{ item: 'coffee', price: 3.5 }, { item: 'bagel', price: 2.25 }]\nconst total = orders.reduce((sum, o) => sum + o.price, 0)\nconsole.log('Total:', total)\nconsole.log(orders.map(o => o.item.toUpperCase()))\n\nconst wait = ms => new Promise(r => setTimeout(r, ms))\nawait wait(200)\nconsole.log('Top-level await works here.')\n`,
  },
]

function encodeShare(runtime: Runtime | 'shell', code: string) {
  const bytes = new TextEncoder().encode(code)
  let bin = ''
  bytes.forEach(b => { bin += String.fromCharCode(b) })
  return `${runtime}:${btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')}`
}

function decodeShare(hash: string): { runtime: Runtime; code: string } | null {
  const m = hash.replace(/^#/, '').match(/^(python|javascript|typescript):(.+)$/)
  if (!m) return null
  try {
    const b64 = m[2].replace(/-/g, '+').replace(/_/g, '/')
    const bin = atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4))
    const bytes = Uint8Array.from(bin, ch => ch.charCodeAt(0))
    return { runtime: m[1] as Runtime, code: new TextDecoder().decode(bytes) }
  } catch {
    return null
  }
}

export default function DojoClient() {
  const [active, setActive] = useState(0)
  const [shared, setShared] = useState<{ runtime: Runtime; code: string } | null>(null)
  const [shareState, setShareState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const editorCode = useRef<string>(EXAMPLES[0].code)
  const py = usePythonRuntime()
  const { exercisesDone } = useProgress()
  const solved = challenges.filter(c => exercisesDone.includes(`challenge/${c.slug}`)).length
  const example = EXAMPLES[active]

  useEffect(() => { pythonRuntime.warm().catch(() => {}) }, [])
  useEffect(() => {
    const fromHash = decodeShare(window.location.hash)
    // Loading a shared program from the URL happens once, after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (fromHash) setShared(fromHash)
  }, [])

  const current = shared ?? example
  const share = async () => {
    if (current.runtime === 'shell') return
    const url = `${location.origin}${location.pathname}#${encodeShare(current.runtime, editorCode.current)}`
    try {
      await navigator.clipboard.writeText(url)
      history.replaceState(null, '', `#${encodeShare(current.runtime, editorCode.current)}`)
      setShareState('copied')
    } catch {
      setShareState('failed')
    }
    setTimeout(() => setShareState('idle'), 1800)
  }

  return (
    <main className="wrap page">
      <header className="page-head page-head-split">
        <div>
          <h1>Playground</h1>
          <p>A place to try things out. Real Python runs on your own machine, inside the browser, with nothing to install. JavaScript, TypeScript and a practice shell are here too. Pick an example below or write your own. Files you create live on a private virtual disk that resets when you reload.</p>
        </div>
        <aside className="dojo-side">
          <div className={`dojo-runtime is-${py.status}`}>
            <strong>{py.status === 'ready' ? `Python ${py.version} ready` : py.status === 'loading' ? 'Loading Python…' : py.status === 'error' ? 'Python failed to load' : 'Python'}</strong>
            <span>{py.status === 'loading' ? py.statusText || 'Downloading the runtime (about 10 MB, cached afterwards)' : py.status === 'ready' ? 'Runs in a Web Worker so the page never freezes. Stop kills runaway loops.' : py.status === 'error' ? py.statusText : 'Starts on your first Run.'}</span>
          </div>
          <Link href="/challenges" className="dojo-challenge-link">
            <span className="sc-lab-kicker">Python challenges</span>
            <strong>{solved} of {challenges.length} solved</strong>
            <span>Checked problems, from FizzBuzz up to a small calculator →</span>
          </Link>
        </aside>
      </header>

      <div className="chips dojo-examples" role="tablist" aria-label="Example programs">
        {shared && <button role="tab" aria-selected className="chip is-active"><span className="dojo-tab-rt">{shared.runtime === 'python' ? 'Py' : shared.runtime === 'typescript' ? 'TS' : 'JS'}</span>Shared program</button>}
        {EXAMPLES.map((ex, i) => (
          <button key={ex.title} role="tab" aria-selected={!shared && i === active} className={`chip ${!shared && i === active ? 'is-active' : ''}`} onClick={() => { setShared(null); setActive(i); history.replaceState(null, '', location.pathname) }}>
            <span className="dojo-tab-rt">{ex.runtime === 'python' ? 'Py' : ex.runtime === 'typescript' ? 'TS' : ex.runtime === 'shell' ? '$' : 'JS'}</span>{ex.title}
          </button>
        ))}
        {current.runtime !== 'shell' && <button type="button" className="chip dojo-share" onClick={share} title="Copy a link that opens this program">
          {shareState === 'copied' ? '✓ Link copied' : shareState === 'failed' ? 'Could not copy' : 'Copy a share link'}
        </button>}
      </div>

      {current.runtime === 'shell' ? (
        <ShellLab key="shell" height={420} intro={['A simulated bash shell with its own small file system. Try: ls, tree, cat data/team.csv | cut -d , -f 1 | sort', 'Type help for the full command list.']} />
      ) : (
        <CodeLab key={shared ? 'shared' : active} runtime={current.runtime} code={current.code} minLines={14} onCodeChange={c => { editorCode.current = c }} />
      )}

      <section className="dojo-notes section-tight">
        <div>
          <h2>What works</h2>
          <ul>
            <li>The full standard library: math, random, json, re, datetime, csv, dataclasses, itertools, asyncio, sqlite3, pathlib, and more.</li>
            <li>input() — open Program input and type the answers ahead of time, one per line.</li>
            <li>Files: open(), pathlib and os all write to a private in-memory disk.</li>
            <li>numpy, pandas, scipy, sympy, matplotlib (data only), pillow, sqlalchemy, pydantic and other pure-Python packages, fetched on first import.</li>
            <li>Top-level await, and asyncio.run() is translated for you.</li>
            <li>TypeScript is compiled with the real compiler (types erased), JavaScript runs in a worker, and the Shell tab is a simulated bash with pipes, redirection and a small file system.</li>
          </ul>
        </div>
        <div>
          <h2>What does not</h2>
          <ul>
            <li>Network sockets, requests to other sites, subprocess, and threads that block.</li>
            <li>Desktop windows (tkinter), web servers (FastAPI, Flask) — those lessons say so and are marked to run locally.</li>
            <li>Very heavy computation: your laptop is doing the work, and a single tab gets one core.</li>
          </ul>
          <p>Want Python on your own computer? The <Link className="text-link" href="/languages/python">Python course</Link> shows how to install it.</p>
        </div>
      </section>
    </main>
  )
}
