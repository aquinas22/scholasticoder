'use client'
import { notFound, useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect } from 'react'
import { recordLastVisited } from '@/hooks/useLastVisited'
import { getLesson } from '@/content'
import { useProgress } from '@/hooks/useProgress'
import { LessonSidebar } from '@/components/LessonSidebar'
import { LessonSection } from '@/components/LessonSection'
import { RUNNABLE_LANGS } from '@/lib/runnable'

export default function LessonPage() {
  const params = useParams()
  const languageSlug = params.slug as string
  const lessonSlug = params.lesson as string

  const result = getLesson(languageSlug, lessonSlug)
  const { isComplete, markComplete, markIncomplete, countExercises } = useProgress()
  const router = useRouter()

  const lesson = result?.lesson
  const language = result?.language
  const prev = result?.prev ?? null
  const next = result?.next ?? null

  useEffect(() => {
    if (!lesson || !language) return
    recordLastVisited({ href: `/languages/${language.slug}/lessons/${lesson.slug}`, title: lesson.title, language: language.name })
  }, [lesson, language])

  // ← and → move between lessons when focus is not inside an editor or input.
  useEffect(() => {
    if (!language) return
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (e.altKey || e.ctrlKey || e.metaKey || (t && (t.tagName === 'TEXTAREA' || t.tagName === 'INPUT' || t.isContentEditable))) return
      if (e.key === 'ArrowRight' && next) router.push(`/languages/${language.slug}/lessons/${next.slug}`)
      if (e.key === 'ArrowLeft' && prev) router.push(`/languages/${language.slug}/lessons/${prev.slug}`)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [language, prev, next, router])

  if (!result || !lesson || !language) return notFound()
  const done = isComplete(language.slug, lesson.slug)
  const lessonIndex = language.lessons.findIndex(l => l.slug === lesson.slug)
  const exerciseCount = lesson.sections.filter(s => s.type === 'exercise' || s.type === 'shell').length
  const runnableCount = lesson.sections.filter(s => s.type === 'code' && s.runnable !== false && RUNNABLE_LANGS.has(s.language ?? language.slug)).length
  const solved = countExercises(`${language.slug}/${lesson.slug}/`)

  return (
    <div className="lesson-shell">
      <LessonSidebar language={language} currentLessonSlug={lesson.slug} />

      <main className="lesson-main">
        <nav style={{ marginBottom: '1.5rem', fontSize: '0.78rem', color: 'var(--text-muted)' }} aria-label="Breadcrumb">
          <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <Link href={`/languages/${language.slug}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{language.name}</Link>
          {' / '}
          <span style={{ color: 'var(--text)' }}>{lesson.title}</span>
        </nav>

        <header style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'monospace', fontWeight: 900, color: language.accentColor, fontSize: '0.9rem' }}>{language.icon}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {language.name} · Lesson {lessonIndex + 1} of {language.lessons.length}
            </span>
            {(runnableCount > 0 || exerciseCount > 0) && (
              <span className="interactive-pill">▶ {runnableCount > 0 ? `${runnableCount} runnable` : ''}{runnableCount > 0 && exerciseCount > 0 ? ' · ' : ''}{exerciseCount > 0 ? `${solved}/${exerciseCount} exercises` : ''}</span>
            )}
          </div>

          <h1 style={{ fontFamily: 'var(--font-syne, sans-serif)', fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            {lesson.title}
          </h1>

          <p style={{ background: `${language.accentColor}0e`, borderLeft: `3px solid ${language.accentColor}`, borderRadius: '0 8px 8px 0', padding: '0.85rem 1.1rem', fontSize: '0.97rem', color: 'var(--text)', fontStyle: 'italic', lineHeight: 1.7, margin: 0, opacity: 0.9 }}>
            {lesson.intro}
          </p>
        </header>

        <div className="lesson-prose has-dropcap" style={{ marginBottom: '3rem' }}>
          {lesson.sections.map((section, idx) => (
            <LessonSection key={idx} section={section} index={idx} languageSlug={language.slug} lessonSlug={lesson.slug} />
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => (done ? markIncomplete(language.slug, lesson.slug) : markComplete(language.slug, lesson.slug))}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.25rem', borderRadius: 8, border: `1px solid ${done ? language.accentColor : 'var(--border)'}`, background: done ? `${language.accentColor}18` : 'var(--card)', color: done ? language.accentColor : 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}
          >
            {done ? '✠ Completed — Deo gratias' : '○ Mark as complete'}
          </button>
          {exerciseCount > 0 && (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {solved === exerciseCount ? 'Every exercise in this lesson is solved.' : `${exerciseCount - solved} exercise${exerciseCount - solved === 1 ? '' : 's'} still open in this lesson.`}
            </span>
          )}
        </div>

        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}><kbd className="key-hint">←</kbd> <kbd className="key-hint">→</kbd> move between lessons</p>
        <nav style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }} aria-label="Lesson navigation">
          {prev ? (
            <Link href={`/languages/${language.slug}/lessons/${prev.slug}`} className="lesson-nav-card">
              <span>← Previous</span>
              <strong>{prev.title}</strong>
            </Link>
          ) : <div style={{ flex: 1 }} />}
          {next ? (
            <Link href={`/languages/${language.slug}/lessons/${next.slug}`} className="lesson-nav-card is-next">
              <span>Next →</span>
              <strong>{next.title}</strong>
            </Link>
          ) : (
            <Link href={`/languages/${language.slug}`} className="lesson-nav-card is-next" style={{ background: `${language.accentColor}12`, borderColor: `${language.accentColor}40` }}>
              <span style={{ color: language.accentColor }}>All lessons done</span>
              <strong style={{ color: language.accentColor }}>Back to {language.name} →</strong>
            </Link>
          )}
        </nav>
      </main>
    </div>
  )
}
