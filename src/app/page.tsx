'use client'
import Link from 'next/link'
import { languages } from '@/content'
import { LanguageCard } from '@/components/LanguageCard'
import { useProgress } from '@/hooks/useProgress'

const FLOATING_SNIPPETS = [
  { code: 'print("Hello, World!")', x: '8%', y: '22%', delay: 0 },
  { code: 'fn main() { println!("Safe!"); }', x: '68%', y: '12%', delay: 2.5 },
  { code: 'console.log("Hello!");', x: '80%', y: '62%', delay: 1.2 },
  { code: 'fmt.Println("Simple.")', x: '5%', y: '70%', delay: 3.8 },
  { code: 'System.out.println("...");', x: '55%', y: '80%', delay: 0.8 },
  { code: '<h1>Hello!</h1>', x: '82%', y: '35%', delay: 1.8 },
]

export default function HomePage() {
  const { getLangProgress } = useProgress()

  return (
    <main style={{ minHeight: 'calc(100vh - 60px)', overflowX: 'hidden' }}>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '4rem 1.5rem',
          overflow: 'hidden',
        }}
      >
        {/* Animated grid */}
        <div
          className="hero-grid"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        />

        {/* Glow orb */}
        <div
          className="hero-glow"
          style={{ position: 'absolute', top: '50%', left: '50%', pointerEvents: 'none' }}
        />

        {/* Floating code snippets */}
        {FLOATING_SNIPPETS.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: s.x,
              top: s.y,
              fontFamily: 'var(--font-jetbrains-mono, monospace)',
              fontSize: '0.72rem',
              color: 'var(--accent)',
              opacity: 0.06,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              animation: `float-up ${6 + i * 0.8}s ${s.delay}s ease-in-out infinite`,
              '--rotate-start': `${-1 - i * 0.3}deg`,
              '--rotate-end': `${1 + i * 0.3}deg`,
              '--opacity': '0.06',
            } as React.CSSProperties}
          >
            {s.code}
          </div>
        ))}

        {/* Hero content */}
        <div style={{ position: 'relative', maxWidth: 720 }}>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 999,
              padding: '0.3rem 0.9rem',
              fontSize: '0.75rem',
              color: 'var(--accent)',
              fontFamily: 'var(--font-jetbrains-mono, monospace)',
              marginBottom: '2rem',
              fontWeight: 500,
            }}
          >
            <span className="cursor-blink">▮</span>
            20 languages · Free forever · No account needed
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-syne, sans-serif)',
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              marginBottom: '1.5rem',
            }}
          >
            Learn to code.
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Actually learn it.
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: 560,
              margin: '0 auto 2.5rem',
            }}
          >
            Real lessons. Real code. Real explanations.
            No paywalls, no &quot;premium&quot; gating, no pseudocode that doesn&apos;t compile.
            Just you and 20 languages.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="#languages"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'var(--accent)',
                color: 'var(--invert-text)',
                padding: '0.7rem 1.5rem',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
                transition: 'opacity 0.15s, transform 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Browse Languages →
            </Link>
            <Link
              href="/editors"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'var(--card)',
                color: 'var(--text)',
                padding: '0.7rem 1.5rem',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: 'none',
                border: '1px solid var(--border)',
                transition: 'border-color 0.15s',
              }}
            >
              Pick an Editor
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.3rem',
            opacity: 0.4,
          }}
        >
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>scroll</span>
          <div style={{ width: 1, height: 30, background: 'var(--text-muted)' }} />
        </div>
      </section>

      {/* ── Language Grid ─────────────────────────────────────────────── */}
      <section
        id="languages"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '4rem 1.5rem',
        }}
      >
        <div style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-syne, sans-serif)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 800,
              color: 'var(--text)',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            Choose your weapon
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            20 languages & frameworks, all free, sorted by where most people start.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {languages.map(lang => {
            const prog = getLangProgress(lang.slug, lang.lessons.length)
            return (
              <LanguageCard
                key={lang.slug}
                language={lang}
                completed={prog.completed}
              />
            )
          })}
        </div>
      </section>

      {/* ── Editor callout ────────────────────────────────────────────── */}
      <section
        style={{
          margin: '0 auto 5rem',
          maxWidth: 1200,
          padding: '0 1.5rem',
        }}
      >
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background accent */}
          <div
            style={{
              position: 'absolute',
              top: -40,
              right: -40,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'var(--accent)',
              opacity: 0.04,
              filter: 'blur(40px)',
            }}
          />

          <div style={{ position: 'relative' }}>
            <div
              style={{
                fontFamily: 'var(--font-jetbrains-mono, monospace)',
                fontSize: '0.8rem',
                color: 'var(--accent)',
                marginBottom: '0.5rem',
                fontWeight: 600,
              }}
            >
              $ which editor
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-syne, sans-serif)',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--text)',
                marginBottom: '0.5rem',
                letterSpacing: '-0.02em',
              }}
            >
              Not sure which editor to use?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: 450 }}>
              We compared VS Code, Neovim, Emacs, and more — with actual opinions, not marketing copy.
              (Spoiler: we do have a favorite. Several, actually.)
            </p>
          </div>

          <Link
            href="/editors"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              padding: '0.7rem 1.4rem',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'border-color 0.15s',
              position: 'relative',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            View Editor Guide →
          </Link>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
        }}
      >
        <p>
          ScholastiCoder — Free coding education, no strings attached.
          {' '}
          <span style={{ color: 'var(--accent)', fontFamily: 'monospace' }}>{'</>'}</span>
        </p>
      </footer>
    </main>
  )
}
