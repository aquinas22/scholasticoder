'use client'
import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import { getLesson } from '@/content'
import { useProgress } from '@/hooks/useProgress'
import { LessonSidebar } from '@/components/LessonSidebar'
import { CodeBlock } from '@/components/CodeBlock'

export default function LessonPage() {
  const params = useParams()
  const languageSlug = params.slug as string
  const lessonSlug = params.lesson as string

  const result = getLesson(languageSlug, lessonSlug)
  const { isComplete, markComplete, markIncomplete } = useProgress()

  if (!result) return notFound()

  const { lesson, language, prev, next } = result
  const done = isComplete(language.slug, lesson.slug)

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>

      {/* Sidebar */}
      <LessonSidebar language={language} currentLessonSlug={lesson.slug} />

      {/* Main content */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          padding: '2.5rem 2.5rem',
          maxWidth: 860,
        }}
      >
        {/* Breadcrumb */}
        <nav style={{ marginBottom: '1.5rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <Link
            href={`/languages/${language.slug}`}
            style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
          >
            {language.name}
          </Link>
          {' / '}
          <span style={{ color: 'var(--text)' }}>{lesson.title}</span>
        </nav>

        {/* Lesson header */}
        <header style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span
              style={{
                fontFamily: 'monospace',
                fontWeight: 900,
                color: language.accentColor,
                fontSize: '0.9rem',
              }}
            >
              {language.icon}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {language.name} · Lesson {language.lessons.findIndex(l => l.slug === lesson.slug) + 1} of {language.lessons.length}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-syne, sans-serif)',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 900,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
              marginBottom: '0.75rem',
            }}
          >
            {lesson.title}
          </h1>

          {/* Intro */}
          <p
            style={{
              background: `${language.accentColor}0e`,
              borderLeft: `3px solid ${language.accentColor}`,
              borderRadius: '0 8px 8px 0',
              padding: '0.85rem 1.1rem',
              fontSize: '0.97rem',
              color: 'var(--text)',
              fontStyle: 'italic',
              lineHeight: 1.7,
              margin: 0,
              opacity: 0.9,
            }}
          >
            {lesson.intro}
          </p>
        </header>

        {/* Lesson sections */}
        <div className="lesson-prose" style={{ marginBottom: '3rem' }}>
          {lesson.sections.map((section, idx) => {
            if (section.type === 'text') {
              return (
                <p key={idx} style={{ marginBottom: '1.4rem', lineHeight: 1.8, fontSize: '1rem', color: 'var(--text)' }}>
                  {section.content}
                </p>
              )
            }

            if (section.type === 'code') {
              return (
                <div key={idx} style={{ marginBottom: '1.75rem' }}>
                  <CodeBlock
                    code={section.content}
                    language={section.language ?? language.slug}
                    showLineNumbers
                  />
                </div>
              )
            }

            if (section.type === 'note') {
              return (
                <div
                  key={idx}
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderLeft: `3px solid var(--accent)`,
                    borderRadius: '0 8px 8px 0',
                    padding: '0.9rem 1.1rem',
                    marginBottom: '1.75rem',
                    fontSize: '0.92rem',
                    lineHeight: 1.7,
                    color: 'var(--text)',
                  }}
                >
                  <span style={{
                    display: 'inline-block',
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '0.35rem',
                  }}>
                    ◆ Note
                  </span>
                  <br />
                  {section.content}
                </div>
              )
            }

            if (section.type === 'warning') {
              return (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255,107,0,0.06)',
                    border: '1px solid rgba(255,107,0,0.2)',
                    borderLeft: `3px solid #ff6b00`,
                    borderRadius: '0 8px 8px 0',
                    padding: '0.9rem 1.1rem',
                    marginBottom: '1.75rem',
                    fontSize: '0.92rem',
                    lineHeight: 1.7,
                    color: 'var(--text)',
                  }}
                >
                  <span style={{
                    display: 'inline-block',
                    color: '#ff6b00',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '0.35rem',
                  }}>
                    ⚠ Warning
                  </span>
                  <br />
                  {section.content}
                </div>
              )
            }

            if (section.type === 'tip') {
              return (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(0,179,114,0.06)',
                    border: '1px solid rgba(0,179,114,0.2)',
                    borderLeft: `3px solid #00b372`,
                    borderRadius: '0 8px 8px 0',
                    padding: '0.9rem 1.1rem',
                    marginBottom: '1.75rem',
                    fontSize: '0.92rem',
                    lineHeight: 1.7,
                    color: 'var(--text)',
                  }}
                >
                  <span style={{
                    display: 'inline-block',
                    color: '#00b372',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '0.35rem',
                  }}>
                    ✦ Tip
                  </span>
                  <br />
                  {section.content}
                </div>
              )
            }

            return null
          })}
        </div>

        {/* Mark complete button */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '2rem',
            marginBottom: '2rem',
          }}
        >
          <button
            onClick={() =>
              done
                ? markIncomplete(language.slug, lesson.slug)
                : markComplete(language.slug, lesson.slug)
            }
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.25rem',
              borderRadius: 8,
              border: `1px solid ${done ? language.accentColor : 'var(--border)'}`,
              background: done ? `${language.accentColor}18` : 'var(--card)',
              color: done ? language.accentColor : 'var(--text-muted)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {done ? '✓ Completed' : '○ Mark as Complete'}
          </button>
        </div>

        {/* Prev / Next navigation */}
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          {prev ? (
            <Link
              href={`/languages/${language.slug}/lessons/${prev.slug}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0.85rem 1.1rem',
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                textDecoration: 'none',
                flex: 1,
                minWidth: 180,
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${language.accentColor}60` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                ← Previous
              </span>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)' }}>
                {prev.title}
              </span>
            </Link>
          ) : (
            <div style={{ flex: 1 }} />
          )}

          {next ? (
            <Link
              href={`/languages/${language.slug}/lessons/${next.slug}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                padding: '0.85rem 1.1rem',
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                textDecoration: 'none',
                flex: 1,
                minWidth: 180,
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${language.accentColor}60` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Next →
              </span>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)' }}>
                {next.title}
              </span>
            </Link>
          ) : (
            <Link
              href={`/languages/${language.slug}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                padding: '0.85rem 1.1rem',
                background: `${language.accentColor}12`,
                border: `1px solid ${language.accentColor}40`,
                borderRadius: 10,
                textDecoration: 'none',
                flex: 1,
                minWidth: 180,
              }}
            >
              <span style={{ fontSize: '0.7rem', color: language.accentColor, marginBottom: '0.25rem' }}>
                🎉 All lessons done!
              </span>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: language.accentColor }}>
                Back to {language.name} →
              </span>
            </Link>
          )}
        </nav>
      </main>
    </div>
  )
}
