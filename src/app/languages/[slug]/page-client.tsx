'use client'
import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { getLanguage, countExercises, countRunnable } from '@/content'
import { useProgress } from '@/hooks/useProgress'
import { ProgressBar } from '@/components/ProgressBar'
import { CodeBlock } from '@/components/CodeBlock'
import { LangIcon } from '@/components/LangIcon'
import { getFieldGuide } from '@/content/field-guides'

const SETUP_TABS = ['windows', 'mac', 'linux'] as const
type SetupTab = typeof SETUP_TABS[number]
const TAB_LABEL: Record<SetupTab, string> = { windows: 'Windows', mac: 'macOS', linux: 'Linux' }
const DIFFICULTY_LABEL = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }

export default function LanguagePage() {
  const params = useParams()
  const slug = params.slug as string
  const language = getLanguage(slug)

  const { isComplete, getLangProgress, countExercises: countSolved } = useProgress()
  const [setupTab, setSetupTab] = useState<SetupTab>('windows')

  if (!language) return notFound()

  const prog = getLangProgress(language.slug, language.lessons.length)
  const fieldGuide = getFieldGuide(language.slug)
  const exercises = countExercises(language)
  const runnable = countRunnable(language)
  const solved = countSolved(language.slug)
  const nextLesson = language.lessons.find(l => !isComplete(language.slug, l.slug)) ?? language.lessons[0]
  const started = prog.completed > 0

  return (
    <main className="wrap page page-narrow">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/languages">Courses</Link>
        <span aria-hidden>/</span>
        <span aria-current="page">{language.name}</span>
      </nav>

      <header className="course-head">
        <LangIcon language={language} size="lg" />
        <div className="course-head-text">
          <h1>{language.name}</h1>
          <p className="course-tagline">{language.tagline}</p>
          <p>{language.description}</p>
          <ul className="meta-list" aria-label="About this course">
            <li><span className={`level level-${language.difficulty}`}>{DIFFICULTY_LABEL[language.difficulty]}</span></li>
            <li>{language.lessons.length} lessons</li>
            {exercises > 0 && <li>{exercises} exercises</li>}
            {runnable > 0 && <li>Runs in your browser</li>}
          </ul>
        </div>
      </header>

      <section className="course-progress" aria-label="Your progress">
        <div className="course-progress-text">
          <strong>{started ? `${prog.completed} of ${prog.total} lessons done` : 'Not started yet'}</strong>
          {exercises > 0 && <span>{solved} of {exercises} exercises solved</span>}
          <ProgressBar value={prog.percentage} height={6} label={`${language.name} progress`} />
        </div>
        <Link href={`/languages/${language.slug}/lessons/${nextLesson.slug}`} className="btn btn-primary">
          {started ? `Continue: ${nextLesson.title}` : 'Start lesson 1'} <span aria-hidden>→</span>
        </Link>
      </section>

      <section className="section-tight" aria-labelledby="lessons-title">
        <h2 id="lessons-title">Lessons</h2>
        <ol className="lesson-list">
          {language.lessons.map((lesson, idx) => {
            const done = isComplete(language.slug, lesson.slug)
            const exCount = lesson.sections.filter(sec => sec.type === 'exercise' || sec.type === 'shell').length
            return (
              <li key={lesson.slug}>
                <Link href={`/languages/${language.slug}/lessons/${lesson.slug}`} className={`lesson-row ${done ? 'is-done' : ''}`}>
                  <span className="lesson-num" aria-hidden>{done ? '✓' : idx + 1}</span>
                  <span className="lesson-row-text">
                    <strong>{lesson.title}</strong>
                    <span>{lesson.intro}</span>
                  </span>
                  {exCount > 0 && <span className="pill">{exCount} exercise{exCount === 1 ? '' : 's'}</span>}
                  {done && <span className="visually-hidden">(completed)</span>}
                </Link>
              </li>
            )
          })}
        </ol>
      </section>

      <section className="section-tight" aria-labelledby="setup-title">
        <h2 id="setup-title">Install it on your own computer</h2>
        <p className="muted">{language.setup.description}{runnable > 0 ? ' You do not need this to follow the lessons: the examples run in your browser.' : ''}</p>
        <div className="tabs" role="tablist" aria-label="Operating system">
          {SETUP_TABS.map(tab => (
            <button key={tab} type="button" role="tab" aria-selected={setupTab === tab} className={`tab ${setupTab === tab ? 'is-active' : ''}`} onClick={() => setSetupTab(tab)}>
              {TAB_LABEL[tab]}
            </button>
          ))}
        </div>
        <CodeBlock code={language.setup[setupTab]} language="bash" />
      </section>

      {fieldGuide && (
        <section className="section-tight" aria-labelledby="field-guide-title">
          <h2 id="field-guide-title">What people build with {language.name}</h2>
          <p className="muted">Learn the basics first, then pick up these tools when a project needs them.</p>
          <div className="guide-grid">
            <article className="guide-card">
              <h3>Practical uses</h3>
              <ul>{fieldGuide.practicalUses.map(item => <li key={item}>{item}</li>)}</ul>
            </article>
            <article className="guide-card">
              <h3>Projects to try</h3>
              <ol>{fieldGuide.projectIdeas.map(item => <li key={item}>{item}</li>)}</ol>
            </article>
            <article className="guide-card">
              <h3>Common tools and packages</h3>
              <div className="tag-list">{fieldGuide.ecosystem.map(item => <span key={item}>{item}</span>)}</div>
            </article>
            <article className="guide-card">
              <h3>Well-known software</h3>
              <div className="tag-list">{fieldGuide.popularSoftware.map(item => <span key={item}>{item}</span>)}</div>
            </article>
          </div>
        </section>
      )}
    </main>
  )
}
