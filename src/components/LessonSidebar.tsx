'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Language } from '@/content/types'
import { useProgress } from '@/hooks/useProgress'
import { ProgressBar } from './ProgressBar'
import { LangIcon } from './LangIcon'

interface Props {
  language: Language
  currentLessonSlug: string
}

export function LessonSidebar({ language, currentLessonSlug }: Props) {
  const { isComplete, getLangProgress } = useProgress()
  const prog = getLangProgress(language.slug, language.lessons.length)
  const [open, setOpen] = useState(false)

  return (
    <aside className={`lesson-sidebar ${open ? 'is-open' : ''}`} aria-label={`${language.name} lessons`}>
      <div className="lesson-sidebar-head">
        <Link href={`/languages/${language.slug}`} className="lesson-sidebar-course">
          <LangIcon language={language} size="sm" />
          <span>{language.name}</span>
        </Link>
        <button type="button" className="btn btn-small btn-quiet lesson-drawer-toggle" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="lesson-list">
          {open ? 'Hide lessons' : 'All lessons'}
        </button>
        <div className="lesson-sidebar-progress">
          <span>{prog.completed} of {prog.total} lessons done</span>
          <ProgressBar value={prog.percentage} height={4} label={`${language.name} progress`} />
        </div>
      </div>

      <nav id="lesson-list" aria-label="Lessons">
        <ol>
          {language.lessons.map((lesson, idx) => {
            const done = isComplete(language.slug, lesson.slug)
            const current = lesson.slug === currentLessonSlug
            return (
              <li key={lesson.slug}>
                <Link
                  href={`/languages/${language.slug}/lessons/${lesson.slug}`}
                  aria-current={current ? 'page' : undefined}
                  className={`sidebar-lesson ${current ? 'is-current' : ''} ${done ? 'is-done' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  <span className="sidebar-num" aria-hidden>{done ? '✓' : idx + 1}</span>
                  <span>{lesson.title}</span>
                </Link>
              </li>
            )
          })}
        </ol>
      </nav>
    </aside>
  )
}
