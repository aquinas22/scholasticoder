'use client'
import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import { getLanguage } from '@/content'
import { useProgress } from '@/hooks/useProgress'
import { ProgressBar } from '@/components/ProgressBar'
import { useState } from 'react'
import { CodeBlock } from '@/components/CodeBlock'
import { getFieldGuide } from '@/content/field-guides'

const SETUP_TABS = ['windows', 'mac', 'linux'] as const
type SetupTab = typeof SETUP_TABS[number]
const TAB_LABEL: Record<SetupTab, string> = { windows: 'Windows', mac: 'macOS', linux: 'Linux' }

export default function LanguagePage() {
  const params = useParams()
  const slug = params.slug as string
  const language = getLanguage(slug)

  const { isComplete, getLangProgress } = useProgress()
  const [setupTab, setSetupTab] = useState<SetupTab>('windows')

  if (!language) return notFound()

  const prog = getLangProgress(language.slug, language.lessons.length)
  const fieldGuide = getFieldGuide(language.slug)

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem' }}>

      {/* Breadcrumb */}
      <nav style={{ marginBottom: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        {' / '}
        <span style={{ color: 'var(--text)' }}>{language.name}</span>
      </nav>

      {/* Header */}
      <div
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          padding: '2rem',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: language.accentColor,
            opacity: 0.08,
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
          {/* Icon */}
          <div
            style={{
              fontFamily: 'var(--font-jetbrains-mono, monospace)',
              fontSize: '2.5rem',
              fontWeight: 900,
              color: language.accentColor,
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            {language.icon}
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
              <h1
                style={{
                  fontFamily: 'var(--font-syne, sans-serif)',
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  color: 'var(--text)',
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}
              >
                {language.name}
              </h1>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '2px 8px',
                  borderRadius: 999,
                  background: `${language.accentColor}22`,
                  color: language.accentColor,
                }}
              >
                {language.difficulty}
              </span>
            </div>

            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                marginBottom: '0.75rem',
              }}
            >
              {language.tagline}
            </p>

            <p style={{ color: 'var(--text)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1rem' }}>
              {language.description}
            </p>

            {/* Used for */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {language.usedFor.map(use => (
                <span
                  key={use}
                  style={{
                    fontSize: '0.7rem',
                    padding: '3px 8px',
                    borderRadius: 6,
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {use}
                </span>
              ))}
            </div>
          </div>

          {/* Progress ring / stats */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '1rem 1.5rem',
              textAlign: 'center',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: '1.6rem',
                fontWeight: 900,
                fontFamily: 'var(--font-syne, sans-serif)',
                color: language.accentColor,
              }}
            >
              {prog.percentage}%
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {prog.completed}/{prog.total} lessons
            </div>
            <ProgressBar value={prog.percentage} color={language.accentColor} height={3} className="w-full" />
          </div>
        </div>
      </div>

      {fieldGuide && (
        <section className="field-guide" aria-labelledby="field-guide-title">
          <div className="field-guide-heading">
            <div>
              <p className="eyebrow"><span>F</span> Field guide</p>
              <h2 id="field-guide-title">What you can do with {language.name}</h2>
            </div>
            <p>Use the ecosystem as a map, not a shopping list. Learn the core first, then reach for a tool when your project gives you a reason.</p>
          </div>
          <div className="field-guide-grid">
            <article className="field-guide-card">
              <span className="field-guide-number">I</span>
              <h3>Practical uses</h3>
              <ul>{fieldGuide.practicalUses.map(item => <li key={item}>{item}</li>)}</ul>
            </article>
            <article className="field-guide-card project-card">
              <span className="field-guide-number">II</span>
              <h3>Projects to build</h3>
              <ol>{fieldGuide.projectIdeas.map((item, index) => <li key={item}><span>{index + 1}</span>{item}</li>)}</ol>
            </article>
            <article className="field-guide-card">
              <span className="field-guide-number">III</span>
              <h3>Common tools &amp; packages</h3>
              <div className="ecosystem-tags">{fieldGuide.ecosystem.map(item => <span key={item}>{item}</span>)}</div>
            </article>
            <article className="field-guide-card">
              <span className="field-guide-number">IV</span>
              <h3>Notable software</h3>
              <div className="software-list">{fieldGuide.popularSoftware.map(item => <span key={item}>{item}</span>)}</div>
            </article>
          </div>
        </section>
      )}

      {/* Setup */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2
          style={{
            fontFamily: 'var(--font-syne, sans-serif)',
            fontSize: '1.2rem',
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: '1rem',
          }}
        >
          Setup
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          {language.setup.description}
        </p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
          {SETUP_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setSetupTab(tab)}
              style={{
                padding: '0.4rem 0.9rem',
                borderRadius: 6,
                border: '1px solid',
                borderColor: setupTab === tab ? language.accentColor : 'var(--border)',
                background: setupTab === tab ? `${language.accentColor}18` : 'var(--card)',
                color: setupTab === tab ? language.accentColor : 'var(--text-muted)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {TAB_LABEL[tab]}
            </button>
          ))}
        </div>

        <CodeBlock code={language.setup[setupTab]} language="bash" />
      </section>

      {/* Lessons */}
      <section>
        <h2
          style={{
            fontFamily: 'var(--font-syne, sans-serif)',
            fontSize: '1.2rem',
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: '1rem',
          }}
        >
          Lessons
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {language.lessons.map((lesson, idx) => {
            const done = isComplete(language.slug, lesson.slug)
            return (
              <Link
                key={lesson.slug}
                href={`/languages/${language.slug}/lessons/${lesson.slug}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  textDecoration: 'none',
                  transition: 'border-color 0.15s, transform 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${language.accentColor}60`
                  e.currentTarget.style.transform = 'translateX(3px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateX(0)'
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    flexShrink: 0,
                    background: done ? language.accentColor : 'var(--card)',
                    border: `1px solid ${done ? language.accentColor : 'var(--border)'}`,
                    color: done ? language.textOnAccent : 'var(--text-muted)',
                  }}
                >
                  {done ? '✓' : idx + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>
                    {lesson.title}
                  </div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                      marginTop: '0.15rem',
                    }}
                  >
                    {lesson.intro.slice(0, 80)}{lesson.intro.length > 80 ? '…' : ''}
                  </div>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', flexShrink: 0 }}>→</div>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
