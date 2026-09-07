'use client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { allQuaestiones } from '@/content'
import { useProgress } from '@/hooks/useProgress'
import { toRoman } from '@/lib/roman'

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

  const disputed = exercisesDone.filter(id => id.startsWith('quaestio:')).length

  return (
    <main className="section-wrap questions-shell">
      <header className="glossary-head">
        <div>
          <p className="eyebrow"><span>Q</span> Tabula quaestionum</p>
          <h1>The disputed questions.</h1>
          <p>Every lesson poses one, in the form of the Summa: objections stated at their strongest, a sed contra, and the answer. {allQuaestiones.length} questions across the paths; you have disputed {disputed}.</p>
        </div>
        <label className="glossary-search">
          <span>Search the questions</span>
          <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="pointer, indentation, HTTPS…" autoComplete="off" />
        </label>
      </header>

      {visible.length === 0 && <p className="glossary-empty">No question matches “{query}”.</p>}

      {byPath.map(list => {
        const first = list[0]
        return (
          <section key={first.languageSlug} className="quaestio-group" aria-label={`${first.languageName} questions`}>
            <h2 style={{ color: first.accentColor }}>
              <Link href={`/languages/${first.languageSlug}`}>{first.languageName}</Link>
              <span>{list.length} question{list.length === 1 ? '' : 's'}</span>
            </h2>
            <ol className="quaestio-list">
              {list.map((x, i) => {
                const done = isExerciseDone(`quaestio:${x.languageSlug}/${x.lessonSlug}/${x.index}`)
                return (
                  <li key={`${x.lessonSlug}-${x.index}`}>
                    <Link href={`/languages/${x.languageSlug}/lessons/${x.lessonSlug}/#disputatio`} className={done ? 'is-done' : ''}>
                      <span className="quaestio-num" style={done ? { borderColor: first.accentColor, background: first.accentColor, color: 'var(--on-accent)' } : undefined}>{done ? '✓' : toRoman(i + 1)}</span>
                      <span className="quaestio-text">
                        <strong>{x.question}</strong>
                        <small>{x.lessonTitle} · {x.objections} objections</small>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </section>
        )
      })}
    </main>
  )
}
