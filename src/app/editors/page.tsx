import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Choosing a code editor | ScholastiCoder',
  description: 'A plain comparison of popular code editors, with a simple recommendation for beginners.',
}

interface Editor {
  name: string
  summary: string
  pros: string[]
  cons: string[]
  verdict: string
  learnCurve: 'Gentle' | 'Moderate' | 'Steep'
  bestFor: string
  free: boolean
  url: string
}

const EDITORS: Editor[] = [
  {
    name: 'VS Code',
    summary: 'A free, widely used editor from Microsoft with extensions for almost every language.',
    pros: [
      'Large extension library covering nearly every language and tool',
      'Good code completion and a built-in debugger',
      'Built-in Git support and terminal',
      'Runs on Windows, macOS and Linux',
      'Frequent updates and plenty of tutorials online',
    ],
    cons: [
      'Uses more memory than lightweight editors',
      'Extensions can occasionally conflict with each other',
      'Tuning settings to your taste takes a little time',
    ],
    verdict: 'The best default for most people, beginners especially. Start here.',
    learnCurve: 'Gentle',
    bestFor: 'Beginners, web developers, and most general programming',
    free: true,
    url: 'https://code.visualstudio.com',
  },
  {
    name: 'Neovim',
    summary: 'A fast, keyboard-driven editor that runs in the terminal.',
    pros: [
      'Very fast, even with large files',
      'Everything is done from the keyboard, which gets quick with practice',
      'Highly configurable with Lua',
      'Works over SSH, so you can edit files on remote servers',
      'Good language support once set up',
    ],
    cons: [
      'Takes weeks of practice to feel comfortable',
      'Needs configuration before it matches a modern editor',
      'Its modal editing (separate modes for typing and moving) is unfamiliar at first',
    ],
    verdict: 'Worth learning later if you spend a lot of time in the terminal.',
    learnCurve: 'Steep',
    bestFor: 'Back-end developers, system administrators, keyboard-heavy users',
    free: true,
    url: 'https://neovim.io',
  },
  {
    name: 'Emacs',
    summary: 'A long-standing, deeply customisable editor that can be extended to do almost anything.',
    pros: [
      'Extensible with its own language, Emacs Lisp',
      'Org mode is excellent for notes, planning and documents',
      'Magit is a very capable Git interface',
      'Stable and actively maintained since the 1980s',
    ],
    cons: [
      'The default key bindings are unlike most other software',
      'Getting a comfortable setup takes real time',
      'Smaller community of new users than VS Code',
    ],
    verdict: 'A good fit if you enjoy shaping your tools. Not the easiest place to start.',
    learnCurve: 'Steep',
    bestFor: 'Lisp programmers, researchers, people who like to customise everything',
    free: true,
    url: 'https://www.gnu.org/software/emacs',
  },
  {
    name: 'Sublime Text',
    summary: 'A quick, lightweight editor with a clean interface.',
    pros: [
      'Starts and responds very quickly',
      'Excellent multi-cursor editing',
      'Light on memory',
      'Command palette for quick access to features',
    ],
    cons: [
      'Paid licence for continued use (there is an unlimited trial)',
      'Fewer extensions than VS Code',
      'Fewer built-in tools such as debugging',
    ],
    verdict: 'Pleasant and fast. VS Code covers most of the same ground for free.',
    learnCurve: 'Gentle',
    bestFor: 'People who value speed and a minimal interface',
    free: false,
    url: 'https://www.sublimetext.com',
  },
  {
    name: 'Nano',
    summary: 'A tiny terminal editor that shows its shortcuts on screen.',
    pros: [
      'Installed on most Linux and macOS systems',
      'Shortcuts are listed at the bottom of the screen',
      'Easy to exit and save',
      'Handy for quick edits to configuration files on a server',
    ],
    cons: [
      'Not designed for writing larger programs',
      'No code completion or debugging',
    ],
    verdict: 'Great for small edits in a terminal. Use a full editor for day-to-day coding.',
    learnCurve: 'Gentle',
    bestFor: 'Quick edits on servers and in the terminal',
    free: true,
    url: 'https://www.nano-editor.org',
  },
  {
    name: 'Notepad++',
    summary: 'A lightweight, long-running text editor for Windows.',
    pros: [
      'Fast and light on Windows',
      'Syntax highlighting for many languages',
      'Solid search across files',
      'Column (block) editing',
    ],
    cons: [
      'Windows only',
      'No built-in terminal',
      'No language-server support, so code completion is basic',
    ],
    verdict: 'A fine lightweight option on Windows. Choose VS Code for larger projects.',
    learnCurve: 'Gentle',
    bestFor: 'Quick file editing on Windows',
    free: true,
    url: 'https://notepad-plus-plus.org',
  },
]

export default function EditorsPage() {
  return (
    <main className="wrap page page-narrow">
      <header className="page-head">
        <h1>Choosing a code editor</h1>
        <p>An editor is where you write code on your own computer. Any of these will do; the choice matters much less than practising. If you are unsure, <strong>start with VS Code</strong>. You can always switch later.</p>
      </header>

      <aside className="callout callout-tip">
        <strong className="callout-label">Short version</strong>
        <div>Use VS Code to get started. Try Neovim or Emacs later if you want a keyboard-driven setup. Use Nano for quick edits on a server.</div>
      </aside>

      <div className="editor-list">
        {EDITORS.map(editor => (
          <article key={editor.name} className="editor-card">
            <header className="editor-card-head">
              <div>
                <h2>{editor.name} {!editor.free && <span className="pill">Paid</span>}</h2>
                <p>{editor.summary}</p>
              </div>
              <div className="editor-card-meta">
                <span className="pill">{editor.learnCurve} learning curve</span>
                <a href={editor.url} target="_blank" rel="noopener noreferrer" className="text-link">Website ↗</a>
              </div>
            </header>
            <div className="editor-card-body">
              <div>
                <h3>Good</h3>
                <ul className="list-pros">{editor.pros.map(p => <li key={p}>{p}</li>)}</ul>
              </div>
              <div>
                <h3>Less good</h3>
                <ul className="list-cons">{editor.cons.map(c => <li key={c}>{c}</li>)}</ul>
              </div>
            </div>
            <footer className="editor-card-foot">
              <p><strong>In short:</strong> {editor.verdict}</p>
              <p><strong>Best for:</strong> {editor.bestFor}</p>
            </footer>
          </article>
        ))}
      </div>

      <div className="actions">
        <Link href="/languages" className="btn btn-primary">Back to the courses <span aria-hidden>→</span></Link>
      </div>
    </main>
  )
}
