'use client'
import Link from 'next/link'
import { Language } from '@/content/types'
import { useProgress } from '@/hooks/useProgress'
import { ProgressBar } from './ProgressBar'

interface Props {
  language: Language
  currentLessonSlug: string
}

export function LessonSidebar({ language, currentLessonSlug }: Props) {
  const { isComplete, getLangProgress } = useProgress()
  const prog = getLangProgress(language.slug, language.lessons.length)

  return (
    <aside
      style={{
        width: 260,
        minWidth: 260,
        borderRight: '1px solid var(--border)',
        background: 'var(--surface)',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 60px)',
        position: 'sticky',
        top: 60,
        overflowY: 'auto',
      }}
    >
      {/* Language header */}
      <div
        style={{
          padding: '1.25rem',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <Link
          href={`/languages/${language.slug}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            textDecoration: 'none',
            marginBottom: '0.75rem',
          }}
        >
          <span
            style={{
              fontFamily: 'monospace',
              fontWeight: 900,
              fontSize: '1.1rem',
              color: language.accentColor,
            }}
          >
            {language.icon}
          </span>
          <span
            style={{
              fontWeight: 700,
              color: 'var(--text)',
              fontSize: '0.95rem',
            }}
          >
            {language.name}
          </span>
        </Link>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.4rem',
          }}
        >
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            {prog.completed}/{prog.total} lessons
          </span>
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: prog.percentage > 0 ? language.accentColor : 'var(--text-muted)',
            }}
          >
            {prog.percentage}%
          </span>
        </div>
        <ProgressBar value={prog.percentage} color={language.accentColor} height={3} />
      </div>

      {/* Lesson list */}
      <nav aria-label="Lessons" style={{ flex: 1, padding: '0.5rem 0' }}>
        {language.lessons.map((lesson, idx) => {
          const done = isComplete(language.slug, lesson.slug)
          const current = lesson.slug === currentLessonSlug

          return (
            <Link
              key={lesson.slug}
              href={`/languages/${language.slug}/lessons/${lesson.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.6rem 1.25rem',
                textDecoration: 'none',
                background: current ? `${language.accentColor}12` : 'transparent',
                borderRight: current ? `2px solid ${language.accentColor}` : '2px solid transparent',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => {
                if (!current) e.currentTarget.style.background = 'var(--card)'
              }}
              onMouseLeave={e => {
                if (!current) e.currentTarget.style.background = 'transparent'
              }}
            >
              {/* Lesson number / check */}
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  flexShrink: 0,
                  background: done
                    ? language.accentColor
                    : current
                    ? `${language.accentColor}30`
                    : 'var(--card)',
                  border: `1px solid ${done ? language.accentColor : current ? `${language.accentColor}60` : 'var(--border)'}`,
                  color: done
                    ? language.textOnAccent
                    : current
                    ? language.accentColor
                    : 'var(--text-muted)',
                }}
              >
                {done ? '✓' : idx + 1}
              </span>

              {/* Lesson title */}
              <span
                style={{
                  fontSize: '0.85rem',
                  color: current ? 'var(--text)' : done ? 'var(--text-muted)' : 'var(--text)',
                  fontWeight: current ? 600 : done ? 400 : 450,
                  lineHeight: 1.35,
                  opacity: done && !current ? 0.6 : 1,
                }}
              >
                {lesson.title}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Back link */}
      <div
        style={{
          padding: '1rem 1.25rem',
          borderTop: '1px solid var(--border)',
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
          }}
        >
          ← All Languages
        </Link>
      </div>
    </aside>
  )
}
