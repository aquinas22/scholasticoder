'use client'
import { notFound, useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect } from 'react'
import { recordLastVisited } from '@/hooks/useLastVisited'
import { getLesson } from '@/content'
import { useProgress } from '@/hooks/useProgress'
import { LessonSidebar } from '@/components/LessonSidebar'
import { LessonSection } from '@/components/LessonSection'
import { ProgressBar } from '@/components/ProgressBar'
import { TermScope, RichText } from '@/components/Term'
import type { SectionType } from '@/content/types'

// Sections are grouped so every lesson reads in the same order: learn, common question, practise, check.
const PART_DEFS: Array<{ id: string; title: string | null; types: SectionType[] }> = [
  { id: 'learn', title: null, types: ['text', 'code', 'note', 'warning', 'tip'] },
  { id: 'common-question', title: null, types: ['quaestio'] },
  { id: 'practice', title: 'Practice', types: ['exercise', 'shell'] },
  { id: 'check', title: 'Check yourself', types: ['quiz'] },
]

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
  const solved = countExercises(`${language.slug}/${lesson.slug}/`)
  const position = ((lessonIndex + 1) / language.lessons.length) * 100

  const parts = PART_DEFS
    .map(def => ({ ...def, items: lesson.sections.map((section, idx) => ({ section, idx })).filter(x => def.types.includes(x.section.type)) }))
    .filter(p => p.items.length > 0)

  const nextHref = next ? `/languages/${language.slug}/lessons/${next.slug}` : `/languages/${language.slug}`
  const completeAndContinue = () => {
    if (!done) markComplete(language.slug, lesson.slug)
    router.push(nextHref)
  }

  return (
    <TermScope scopeKey={`${language.slug}/${lesson.slug}`}>
      <div className="lesson-shell">
        <LessonSidebar language={language} currentLessonSlug={lesson.slug} />

        <main className="lesson-main">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/languages">Courses</Link>
            <span aria-hidden>/</span>
            <Link href={`/languages/${language.slug}`}>{language.name}</Link>
            <span aria-hidden>/</span>
            <span aria-current="page">Lesson {lessonIndex + 1}</span>
          </nav>

          <header className="lesson-head">
            <p className="lesson-count">
              Lesson {lessonIndex + 1} of {language.lessons.length}
              {exerciseCount > 0 && <span> · {solved} of {exerciseCount} exercises solved</span>}
              {done && <span className="done-badge">✓ Completed</span>}
            </p>
            <ProgressBar value={position} height={3} label="Position in course" className="lesson-position" />
            <h1>{lesson.title}</h1>
            <p className="lesson-intro"><RichText text={lesson.intro} blockId="intro" /></p>
          </header>

          <div className="lesson-body">
            {parts.map(part => (
              <div key={part.id} id={part.id} className="lesson-part">
                {part.title && <h2 className="lesson-part-title">{part.title}</h2>}
                {part.items.map(({ section, idx }) => (
                  <LessonSection key={idx} section={section} index={idx} languageSlug={language.slug} lessonSlug={lesson.slug} />
                ))}
              </div>
            ))}
          </div>

          <section className="lesson-finish" aria-label="Finish this lesson">
            <div>
              <strong>{done ? 'You have completed this lesson.' : 'Finished reading?'}</strong>
              <span>
                {exerciseCount > 0
                  ? solved === exerciseCount ? 'Every exercise here is solved.' : `${exerciseCount - solved} exercise${exerciseCount - solved === 1 ? '' : 's'} still open. You can come back to ${exerciseCount - solved === 1 ? 'it' : 'them'} later.`
                  : 'Mark it done to track your progress.'}
              </span>
            </div>
            <div className="actions">
              <button type="button" className="btn btn-primary" onClick={completeAndContinue}>
                {next ? (done ? 'Next lesson' : 'Mark complete and continue') : (done ? 'Back to the course' : 'Mark complete and finish')} <span aria-hidden>→</span>
              </button>
              {done && <button type="button" className="btn btn-quiet" onClick={() => markIncomplete(language.slug, lesson.slug)}>Mark as not done</button>}
            </div>
          </section>

          <nav className="pager" aria-label="Lesson navigation">
            {prev ? (
              <Link href={`/languages/${language.slug}/lessons/${prev.slug}`} className="pager-link">
                <span>← Previous</span>
                <strong>{prev.title}</strong>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/languages/${language.slug}/lessons/${next.slug}`} className="pager-link is-next">
                <span>Next →</span>
                <strong>{next.title}</strong>
              </Link>
            ) : (
              <Link href={`/languages/${language.slug}`} className="pager-link is-next">
                <span>End of course</span>
                <strong>Back to {language.name}</strong>
              </Link>
            )}
          </nav>
          <p className="key-tip">Tip: use the <kbd>←</kbd> and <kbd>→</kbd> keys to move between lessons.</p>
        </main>
      </div>
    </TermScope>
  )
}
