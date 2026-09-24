'use client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { glossary } from '@/content/glossary'
import { getLanguage } from '@/content'
import { CodeBlock } from '@/components/CodeBlock'

export default function GlossaryClient() {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const entries = useMemo(() => glossary.filter(e => !q || e.term.toLowerCase().includes(q) || e.definition.toLowerCase().includes(q) || e.aliases?.some(a => a.toLowerCase().includes(q))), [q])
  const letters = Array.from(new Set(entries.map(e => e.term[0].toUpperCase())))

  return (
    <main className="wrap page">
      <header className="page-head page-head-split">
        <div>
          <h1>Glossary</h1>
          <p>{glossary.length} programming words explained in plain language, most with a short example and a link to the course that teaches them. The same words are underlined inside lessons; click one for a quick definition.</p>
        </div>
        <label className="search">
          <span className="visually-hidden">Search the glossary</span>
          <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search: closure, regex, JOIN…" autoComplete="off" />
        </label>
      </header>

      {entries.length === 0 && <p className="empty">Nothing matches “{query}”. Try a broader word.</p>}

      {letters.map(letter => (
        <section key={letter} className="glossary-letter" aria-label={`Terms starting with ${letter}`}>
          <h2>{letter}</h2>
          <dl>
            {entries.filter(e => e.term[0].toUpperCase() === letter).map(e => (
              <div key={e.term} className="glossary-entry" id={e.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
                <dt>{e.term}{e.aliases && e.aliases.length > 0 && <span className="glossary-aliases">also: {e.aliases.join(', ')}</span>}</dt>
                <dd>
                  {e.definition}
                  {e.example && <span className="glossary-example"><CodeBlock code={e.example.code} language={e.example.language} /></span>}
                  {e.paths && e.paths.length > 0 && (
                    <span className="glossary-paths">
                      {e.paths.map(p => { const lang = getLanguage(p); return lang ? <Link key={p} href={`/languages/${p}`}>{lang.name}</Link> : null })}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </main>
  )
}
