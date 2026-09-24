'use client'
import Link from 'next/link'
import { Language } from '@/content/types'
import { ProgressBar } from './ProgressBar'
import { LangIcon } from './LangIcon'
import { countExercises } from '@/content'

interface Props {
  language: Language
  completed: number
}

const DIFFICULTY_LABEL = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }

export function LanguageCard({ language, completed }: Props) {
  const total = language.lessons.length
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  const done = completed === total && total > 0
  const exercises = countExercises(language)

  return (
    <Link href={`/languages/${language.slug}`} className="course-card">
      <div className="course-card-head">
        <LangIcon language={language} />
        <div>
          <h3>{language.name}</h3>
          <span className={`level level-${language.difficulty}`}>{DIFFICULTY_LABEL[language.difficulty]}</span>
        </div>
      </div>
      <p>{language.tagline}</p>
      <div className="course-card-foot">
        <span>
          {done ? '✓ Finished' : completed > 0 ? `${completed} of ${total} lessons` : `${total} lessons`}
          {exercises > 0 && !done ? ` · ${exercises} exercises` : ''}
        </span>
        {completed > 0 && <ProgressBar value={pct} height={4} />}
      </div>
    </Link>
  )
}
