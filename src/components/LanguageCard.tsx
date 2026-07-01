'use client'
import Link from 'next/link'
import { Language } from '@/content/types'
import { ProgressBar } from './ProgressBar'

interface Props {
  language: Language
  completed: number
}

const DIFFICULTY_LABEL = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const DIFFICULTY_COLOR = {
  beginner: '#22c55e',
  intermediate: '#f59e0b',
  advanced: '#ef4444',
}

export function LanguageCard({ language, completed }: Props) {
  const total = language.lessons.length
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  const started = completed > 0
  const done = completed === total && total > 0

  return (
    <Link
      href={`/languages/${language.slug}`}
      style={{ textDecoration: 'none' }}
    >
      <article
        className="language-card"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget
          el.style.transform = 'translateY(-4px)'
          el.style.boxShadow = `0 16px 40px ${language.accentColor}18`
          el.style.borderColor = `${language.accentColor}60`
        }}
        onMouseLeave={e => {
          const el = e.currentTarget
          el.style.transform = 'translateY(0)'
          el.style.boxShadow = 'none'
          el.style.borderColor = 'var(--border)'
        }}
      >
        {/* Card header */}
        <div
          style={{
            background: 'var(--card)',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glow blob */}
          <div
            style={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: language.accentColor,
              opacity: 0.08,
              filter: 'blur(20px)',
            }}
          />

          {/* Language icon */}
          <div
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '1.75rem',
              fontWeight: 900,
              color: language.accentColor,
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            {language.icon}
          </div>

          {/* Difficulty + status */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: DIFFICULTY_COLOR[language.difficulty],
                background: `${DIFFICULTY_COLOR[language.difficulty]}18`,
                padding: '2px 8px',
                borderRadius: 999,
              }}
            >
              {DIFFICULTY_LABEL[language.difficulty]}
            </span>
            {done && (
              <span style={{ fontSize: '0.7rem', color: 'var(--accent)' }}>✓ Complete</span>
            )}
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: '1rem 1.25rem', flex: 1 }}>
          <h3
            style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '0.3rem',
              fontFamily: 'var(--font-syne, sans-serif)',
            }}
          >
            {language.name}
          </h3>
          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              lineHeight: 1.5,
              margin: 0,
              fontStyle: 'italic',
            }}
          >
            {language.tagline}
          </p>
        </div>

        {/* Card footer */}
        <div
          style={{
            padding: '0.75rem 1.25rem 1rem',
            borderTop: '1px solid var(--border)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
            }}
          >
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {started ? `${completed}/${total} lessons` : `${total} lessons`}
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: pct > 0 ? language.accentColor : 'var(--text-muted)',
              }}
            >
              {started ? `${pct}%` : 'Start'}
            </span>
          </div>
          <ProgressBar value={pct} color={language.accentColor} height={3} />
        </div>
      </article>
    </Link>
  )
}
