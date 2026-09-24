'use client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { languages, totalLessons, totalExercises, countExercises, getLanguage } from '@/content'
import { LanguageCard } from '@/components/LanguageCard'
import { useProgress } from '@/hooks/useProgress'
import { COURSE_GROUPS } from '@/lib/categories'
import type { Difficulty } from '@/content/types'

const FILTERS: Array<{ id: string; label: string; test: (slug: string, difficulty: Difficulty, exercises: number) => boolean }> = [
  { id: 'all', label: 'All', test: () => true },
  { id: 'beginner', label: 'Beginner', test: (_s, d) => d === 'beginner' },
  { id: 'intermediate', label: 'Intermediate', test: (_s, d) => d === 'intermediate' },
  { id: 'advanced', label: 'Advanced', test: (_s, d) => d === 'advanced' },
  { id: 'interactive', label: 'Has exercises', test: (_s, _d, ex) => ex > 0 },
]

export default function LanguagesPage() {
  const { getLangProgress } = useProgress()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const q = query.trim().toLowerCase()

  const visible = useMemo(() => {
    const f = FILTERS.find(x => x.id === filter) ?? FILTERS[0]
    return new Set(languages.filter(l => f.test(l.slug, l.difficulty, countExercises(l)) && (!q || l.name.toLowerCase().includes(q) || l.tagline.toLowerCase().includes(q) || l.usedFor.some(u => u.toLowerCase().includes(q)))).map(l => l.slug))
  }, [q, filter])

  const lessonHits = useMemo(() => {
    if (q.length < 3) return []
    const hits: Array<{ lang: string; title: string; href: string }> = []
    for (const l of languages) for (const lesson of l.lessons) {
      if (lesson.title.toLowerCase().includes(q) || lesson.intro.toLowerCase().includes(q)) hits.push({ lang: l.name, title: lesson.title, href: `/languages/${l.slug}/lessons/${lesson.slug}` })
      if (hits.length >= 12) return hits
    }
    return hits
  }, [q])

  return (
    <main className="wrap page">
      <header className="page-head">
        <h1>Courses</h1>
        <p>{languages.length} courses, {totalLessons} lessons and {totalExercises} checked exercises, all free. Not sure where to begin? <Link className="text-link" href="/languages/python">Start with Python</Link>.</p>
      </header>

      <div className="toolbar">
        <label className="search">
          <span className="visually-hidden">Search courses and lessons</span>
          <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search courses and lessons: loops, JOIN, closures…" autoComplete="off" />
        </label>
        <div className="chips" role="group" aria-label="Filter courses">
          {FILTERS.map(f => <button key={f.id} type="button" className={`chip ${filter === f.id ? 'is-active' : ''}`} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</button>)}
        </div>
      </div>

      {lessonHits.length > 0 && (
        <section className="lesson-hits" aria-label="Matching lessons">
          <h2>Matching lessons</h2>
          <ul>
            {lessonHits.map(h => <li key={h.href}><Link href={h.href}><span>{h.lang}</span>{h.title}</Link></li>)}
          </ul>
        </section>
      )}

      {visible.size === 0 && <p className="empty">No course matches. Try another word or clear the filter.</p>}

      {COURSE_GROUPS.map(group => {
        const slugs = group.slugs.filter(s => visible.has(s))
        if (slugs.length === 0) return null
        return (
          <section key={group.id} className="course-group" aria-labelledby={`group-${group.id}`}>
            <h2 id={`group-${group.id}`} className="course-group-title">{group.label} <span>{group.blurb}</span></h2>
            <div className="course-grid">
              {slugs.map(slug => {
                const lang = getLanguage(slug)!
                const prog = getLangProgress(lang.slug, lang.lessons.length)
                return <LanguageCard key={slug} language={lang} completed={prog.completed} />
              })}
            </div>
          </section>
        )
      })}
    </main>
  )
}
