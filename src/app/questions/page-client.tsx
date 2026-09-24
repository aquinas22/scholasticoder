'use client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { allQuaestiones } from '@/content'
import { useProgress } from '@/hooks/useProgress'

export default function QuestionsClient() {
  const [query, setQuery] = useState('')
  const { isExerciseDone, exercisesDone } = useProgress()
  const q = query.trim().toLowerCase()

  const visible = useMemo(() => allQuaestiones.filter(x => !q || x.question.toLowerCase().includes(q) || x.languageName.toLowerCase().includes(q) || x.lessonTitle.toLowerCase().includes(q)), [q])
  const byPath = useMemo(() => {
    const map = new Map<string, typeof visible>()
    for (const x of visible) {
      const list = map.get(x.languageSlug) ?? []
      list.push(x)
      map.set(x.languageSlug, list)
    }
    return [...map.values()]
  }, [visible])

  const reviewed = exercisesDone.filter(id => id.startsWith('quaestio:')).length

  return (
    <main className="wrap page">
      <header className="page-head page-head-split">
        <div>
          <h1>Common questions</h1>
          <p>The questions beginners ask most, one per lesson, each with a plain answer and the usual mix-ups explained. {allQuaestiones.length} questions so far; you have reviewed {reviewed}.</p>
        </div>
        <label className="search">
          <span className="visually-hidden">Search the questions</span>
          <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search: pointer, indentation, HTTPS…" autoComplete="off" />
        </label>
      </header>

      {visible.length === 0 && <p className="empty">No question matches “{query}”.</p>}

      {byPath.map(list => {
        const first = list[0]
        return (
          <section key={first.languageSlug} className="q-group" aria-labelledby={`q-${first.languageSlug}`}>
            <h2 id={`q-${first.languageSlug}`}>
              <Link href={`/languages/${first.languageSlug}`}>{first.languageName}</Link>
              <span>{list.length} question{list.length === 1 ? '' : 's'}</span>
            </h2>
            <ul className="q-list">
              {list.map(x => {
                const done = isExerciseDone(`quaestio:${x.languageSlug}/${x.lessonSlug}/${x.index}`)
                return (
                  <li key={`${x.lessonSlug}-${x.index}`}>
                    <Link href={`/languages/${x.languageSlug}/lessons/${x.lessonSlug}/#common-question`} className={done ? 'is-done' : ''}>
                      <strong>{x.question}</strong>
                      <span>{done ? '✓ Reviewed · ' : ''}From the lesson “{x.lessonTitle}”</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
    </main>
  )
}
