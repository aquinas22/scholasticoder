'use client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { languages, totalLessons, totalExercises, countExercises } from '@/content'
import { LanguageCard } from '@/components/LanguageCard'
import { useProgress } from '@/hooks/useProgress'
import type { Difficulty } from '@/content/types'

const FILTERS: Array<{ id: string; label: string; test: (slug: string, difficulty: Difficulty, exercises: number) => boolean }> = [
  { id: 'all', label: 'All', test: () => true },
  { id: 'interactive', label: '▶ Interactive', test: (_s, _d, ex) => ex > 0 },
  { id: 'beginner', label: 'Beginner', test: (_s, d) => d === 'beginner' },
  { id: 'intermediate', label: 'Intermediate', test: (_s, d) => d === 'intermediate' },
  { id: 'advanced', label: 'Advanced', test: (_s, d) => d === 'advanced' },
  { id: 'web', label: 'Web', test: s => ['html', 'css', 'javascript', 'typescript', 'react', 'vue', 'nodejs', 'tailwind', 'vite', 'php'].includes(s) },
  { id: 'systems', label: 'Systems & CS', test: s => ['c', 'cpp', 'rust', 'go', 'asm', 'computer-architecture', 'operating-systems', 'compilers', 'dsa', 'internet'].includes(s) },
  { id: 'tools', label: 'Tools', test: s => ['git', 'bash', 'powershell', 'terminal', 'sql'].includes(s) },
]

export default function LanguagesPage() {
  const { getLangProgress } = useProgress()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const q = query.trim().toLowerCase()

  const visible = useMemo(() => {
    const f = FILTERS.find(x => x.id === filter) ?? FILTERS[0]
    return languages.filter(l => f.test(l.slug, l.difficulty, countExercises(l)) && (!q || l.name.toLowerCase().includes(q) || l.tagline.toLowerCase().includes(q) || l.usedFor.some(u => u.toLowerCase().includes(q))))
  }, [q, filter])

  const lessonHits = useMemo(() => {
    if (q.length < 3) return []
    const hits: Array<{ lang: string; slug: string; title: string; href: string }> = []
    for (const l of languages) for (const lesson of l.lessons) {
      if (lesson.title.toLowerCase().includes(q) || lesson.intro.toLowerCase().includes(q)) hits.push({ lang: l.name, slug: l.slug, title: lesson.title, href: `/languages/${l.slug}/lessons/${lesson.slug}` })
      if (hits.length >= 12) return hits
    }
    return hits
  }, [q])

  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <p className="eyebrow"><span>C</span> The codex</p>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 400, color: 'var(--text)', margin: '.6rem 0 .5rem', letterSpacing: '-0.03em', lineHeight: 1 }}>
        All paths.
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        {languages.length} learning paths, {totalLessons} lessons, {totalExercises} graded exercises, 0 paywalls.
      </p>

      <label className="path-search">
        <span>Search paths and lessons</span>
        <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="python, decorators, JOIN, closures…" autoComplete="off" />
      </label>
      <div className="path-filters" role="group" aria-label="Filter paths">
        {FILTERS.map(f => <button key={f.id} type="button" className={`dojo-tab ${filter === f.id ? 'is-active' : ''}`} onClick={() => setFilter(f.id)}>{f.label}</button>)}
      </div>

      {lessonHits.length > 0 && (
        <ul className="lesson-hits" aria-label="Matching lessons">
          {lessonHits.map(h => <li key={h.href}><Link href={h.href}><span>{h.lang}</span>{h.title}</Link></li>)}
        </ul>
      )}

      {visible.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No path matches. Try another word or clear the filter.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          {visible.map(lang => {
            const prog = getLangProgress(lang.slug, lang.lessons.length)
            return <LanguageCard key={lang.slug} language={lang} completed={prog.completed} />
          })}
        </div>
      )}
    </main>
  )
}
