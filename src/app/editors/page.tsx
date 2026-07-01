'use client'
import Link from 'next/link'

interface Editor {
  name: string
  icon: string
  tagline: string
  pros: string[]
  cons: string[]
  verdict: string
  learnCurve: 'Easy' | 'Medium' | 'Hard' | 'Masochistic'
  bestFor: string
  free: boolean
  url: string
  color: string
}

const EDITORS: Editor[] = [
  {
    name: 'VS Code',
    icon: '⎋',
    tagline: 'The editor everyone ends up using eventually.',
    pros: [
      'Massive extension ecosystem — there\'s an extension for everything',
      'Excellent IntelliSense and debugging support',
      'Built-in Git integration',
      'Cross-platform (Windows, macOS, Linux)',
      'Copilot integration if you\'re into that',
      'Active development — new features constantly',
    ],
    cons: [
      'Can feel heavy — 100MB+ RAM just chilling',
      'Extension conflicts are a real thing',
      'Electron-based (JS running a text editor… fine, we said it)',
      'Getting it configured perfectly takes time',
    ],
    verdict: 'The right choice for most people. Start here. Add extensions. Never leave.',
    learnCurve: 'Easy',
    bestFor: 'Everyone — especially beginners and web developers',
    free: true,
    url: 'https://code.visualstudio.com',
    color: '#007ACC',
  },
  {
    name: 'Neovim',
    icon: '◈',
    tagline: 'If you want to feel like a hacker. And type :q! a lot.',
    pros: [
      'Insanely fast — opens large files instantly',
      'Entirely keyboard-driven — never touch your mouse',
      'Infinitely configurable with Lua',
      'Works over SSH — edit files on remote servers',
      'Makes you look cool in terminal recordings',
      'LSP support is excellent when configured',
    ],
    cons: [
      'The learning curve is measured in weeks, not hours',
      'You will accidentally close it without saving at least 12 times',
      'Config is a part-time job',
      'Bragging about using Vim is technically a personality trait',
      'Built-in help says "type :help" — which requires knowing Vim',
    ],
    verdict: 'Worth learning. Will make you faster. Will also consume a weekend.',
    learnCurve: 'Hard',
    bestFor: 'Backend developers, sysadmins, power users',
    free: true,
    url: 'https://neovim.io',
    color: '#57A143',
  },
  {
    name: 'Emacs',
    icon: '∞',
    tagline: 'Not just an editor. A lifestyle. A religion. A burden.',
    pros: [
      'Infinitely extensible with Elisp',
      'Org mode for notes is genuinely life-changing',
      'Magit (Git UI) is arguably the best Git interface ever made',
      'Can do email, IRC, games — if you\'re into that',
      'Has outlasted every technology trend since 1976',
    ],
    cons: [
      'Learning curve is vertical',
      'Default keybindings were designed for a keyboard that no longer exists',
      'Emacs Pinky is a real RSI condition',
      'Configuring it could be your second career',
      '"I use Emacs" is the highest level of editor gatekeeping',
    ],
    verdict: 'For those who want total control and have time to pursue it. Respect, not recommendation.',
    learnCurve: 'Masochistic',
    bestFor: 'Lisp programmers, academics, the enlightened',
    free: true,
    url: 'https://www.gnu.org/software/emacs',
    color: '#7F5AB6',
  },
  {
    name: 'Sublime Text',
    icon: '◉',
    tagline: 'The editor that was fast when fast mattered. Still fast.',
    pros: [
      'Blazingly fast — opens in milliseconds',
      'Multi-cursor editing is a genuine superpower',
      'Lightweight on RAM',
      'Command Palette was revolutionary (VS Code copied it)',
      'Distraction-free writing mode',
    ],
    cons: [
      'Paid license ($99, though the trial never expires — wink)',
      'Extension ecosystem smaller than VS Code',
      'Less active development in recent years',
      'Plugin API is less capable than competitors',
    ],
    verdict: 'Still great in 2024. Especially for speed. Just know VS Code does most of this too.',
    learnCurve: 'Easy',
    bestFor: 'Speed-obsessed developers, text-heavy work',
    free: false,
    url: 'https://www.sublimetext.com',
    color: '#FF9800',
  },
  {
    name: 'Nano',
    icon: '□',
    tagline: 'It opens, you type, you save, you leave. That\'s it. That\'s nano.',
    pros: [
      'Available on every Linux/macOS system',
      'Keybindings shown at the bottom — no memorization',
      'You can exit it without googling how',
      'Perfect for quick config file edits on a server',
    ],
    cons: [
      'Not really for writing code',
      'No syntax highlighting by default (it can, but come on)',
      'No code completion, debugging, or much of anything',
      '"Nano main.py" said by someone doing serious work is a warning sign',
    ],
    verdict: 'The right tool for editing /etc/hosts at 2am. Not for day-to-day development.',
    learnCurve: 'Easy',
    bestFor: 'Quick terminal edits, servers, beginners in a pinch',
    free: true,
    url: 'https://www.nano-editor.org',
    color: '#4EAA25',
  },
  {
    name: 'Notepad++',
    icon: '✎',
    tagline: 'Windows only. Classic. Reliable. A bit like your dad.',
    pros: [
      'Fast and lightweight on Windows',
      'Good syntax highlighting for many languages',
      'Find-in-files is solid',
      'Column editing mode is surprisingly useful',
      'The double-click-to-select word behavior is *chef\'s kiss*',
    ],
    cons: [
      'Windows only — not cross-platform',
      'No built-in terminal',
      'Limited plugin ecosystem compared to VS Code',
      'UI looks like it was designed for Windows XP (it was)',
      'No language server support',
    ],
    verdict: 'If you\'re on Windows and need something lightweight, it\'s respectable. VS Code for anything serious.',
    learnCurve: 'Easy',
    bestFor: 'Windows power users, quick file editing, non-developers',
    free: true,
    url: 'https://notepad-plus-plus.org',
    color: '#90C236',
  },
]

const CURVE_COLOR = {
  Easy: '#22c55e',
  Medium: '#f59e0b',
  Hard: '#ef4444',
  Masochistic: '#8b5cf6',
}

export default function EditorsPage() {
  return (
    <main style={{ maxWidth: 1000, margin: '0 auto', padding: '3rem 1.5rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <Link href="/" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>
          ← Home
        </Link>
        <h1
          style={{
            fontFamily: 'var(--font-syne, sans-serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 900,
            color: 'var(--text)',
            letterSpacing: '-0.03em',
            marginBottom: '0.5rem',
          }}
        >
          Pick Your Editor
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: 600 }}>
          The age-old debate. We compared them with honest opinions, not marketing copy.
          Our recommendation: <strong style={{ color: 'var(--text)' }}>start with VS Code.</strong> Change your mind later.
        </p>
      </div>

      {/* Quick recommendation banner */}
      <div
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--accent)',
          borderRadius: '0 10px 10px 0',
          padding: '1rem 1.25rem',
          marginBottom: '2.5rem',
          fontSize: '0.9rem',
          color: 'var(--text)',
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: 'var(--accent)' }}>TL;DR:</strong>{' '}
        Use <strong>VS Code</strong> if you want to start coding immediately.
        Learn <strong>Neovim</strong> after 6 months if you want to go faster.
        Use <strong>Emacs</strong> if you enjoy configuring things more than doing things.
        Use <strong>Nano</strong> if you hate computers and coding.
        The rest are fine and nobody will judge you. (We might judge you a little for Notepad++)
      </div>

      {/* Editor cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {EDITORS.map(editor => (
          <article
            key={editor.name}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              style={{
                background: 'var(--card)',
                borderBottom: '1px solid var(--border)',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: `${editor.color}20`,
                    border: `1px solid ${editor.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    flexShrink: 0,
                    color: editor.color,
                  }}
                >
                  {editor.icon}
                </span>
                <div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-syne, sans-serif)',
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      color: 'var(--text)',
                      margin: 0,
                    }}
                  >
                    {editor.name}
                    {!editor.free && (
                      <span
                        style={{
                          marginLeft: '0.5rem',
                          fontSize: '0.65rem',
                          padding: '2px 6px',
                          borderRadius: 4,
                          background: '#f59e0b22',
                          color: '#f59e0b',
                          fontWeight: 700,
                          verticalAlign: 'middle',
                        }}
                      >
                        PAID
                      </span>
                    )}
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, fontStyle: 'italic' }}>
                    {editor.tagline}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 6,
                    background: `${CURVE_COLOR[editor.learnCurve]}18`,
                    color: CURVE_COLOR[editor.learnCurve],
                    border: `1px solid ${CURVE_COLOR[editor.learnCurve]}40`,
                  }}
                >
                  {editor.learnCurve} learning curve
                </span>
                <a
                  href={editor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: 6,
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                  }}
                >
                  Website ↗
                </a>
              </div>
            </div>

            {/* Body */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {/* Pros */}
              <div>
                <h3
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#22c55e',
                    marginBottom: '0.6rem',
                  }}
                >
                  ✓ Pros
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {editor.pros.map(pro => (
                    <li
                      key={pro}
                      style={{
                        fontSize: '0.84rem',
                        color: 'var(--text)',
                        padding: '0.2rem 0',
                        paddingLeft: '1rem',
                        position: 'relative',
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ position: 'absolute', left: 0, color: '#22c55e' }}>+</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div>
                <h3
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#ef4444',
                    marginBottom: '0.6rem',
                  }}
                >
                  ✗ Cons
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {editor.cons.map(con => (
                    <li
                      key={con}
                      style={{
                        fontSize: '0.84rem',
                        color: 'var(--text)',
                        padding: '0.2rem 0',
                        paddingLeft: '1rem',
                        position: 'relative',
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ position: 'absolute', left: 0, color: '#ef4444' }}>–</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Verdict */}
            <div
              style={{
                borderTop: '1px solid var(--border)',
                padding: '0.85rem 1.5rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ flex: 1, minWidth: 200 }}>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    display: 'block',
                    marginBottom: '0.2rem',
                  }}
                >
                  Verdict
                </span>
                <span style={{ fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.5 }}>
                  {editor.verdict}
                </span>
              </div>
              <div style={{ flexShrink: 0 }}>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginBottom: '0.2rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Best for
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text)' }}>
                  {editor.bestFor}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom section */}
      <div
        style={{
          marginTop: '3rem',
          padding: '2rem',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-syne, sans-serif)',
            fontSize: '1.2rem',
            fontWeight: 800,
            color: 'var(--text)',
            marginBottom: '0.5rem',
          }}
        >
          Still not sure?
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
          Use VS Code. Seriously. Install it, install a theme, start coding.
          The editor debate is genuinely less important than writing code.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'var(--accent)',
            color: 'var(--invert-text)',
            padding: '0.65rem 1.25rem',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: '0.9rem',
            textDecoration: 'none',
          }}
        >
          Start Learning →
        </Link>
      </div>
    </main>
  )
}
