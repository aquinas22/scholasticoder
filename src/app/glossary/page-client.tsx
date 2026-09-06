'use client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { glossary } from '@/content/glossary'
import { getLanguage } from '@/content'

export default function GlossaryClient() {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const entries = useMemo(() => glossary.filter(e => !q || e.term.toLowerCase().includes(q) || e.definition.toLowerCase().includes(q) || e.aliases?.some(a => a.toLowerCase().includes(q))), [q])
  const letters = Array.from(new Set(entries.map(e => e.term[0].toUpperCase())))

  return (
    <main className="section-wrap glossary-shell">
      <header className="glossary-head">
        <div>
          <p className="eyebrow"><span>G</span> Glossarium</p>
          <h1>The words, explained.</h1>
          <p>{glossary.length} terms in plain language, each pointing to the path where it is taught properly. Search by word, alias or idea.</p>
        </div>
        <label className="glossary-search">
          <span>Search</span>
          <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="closure, regex, JOIN…" autoComplete="off" />
        </label>
      </header>

      {entries.length === 0 && <p className="glossary-empty">Nothing matches “{query}”. Try a broader word.</p>}

      {letters.map(letter => (
        <section key={letter} className="glossary-letter" aria-label={`Terms starting with ${letter}`}>
          <h2>{letter}</h2>
          <dl>
            {entries.filter(e => e.term[0].toUpperCase() === letter).map(e => (
              <div key={e.term} className="glossary-entry" id={e.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
                <dt>{e.term}{e.aliases && e.aliases.length > 0 && <span className="glossary-aliases">also: {e.aliases.join(', ')}</span>}</dt>
                <dd>
                  {e.definition}
                  {e.paths && e.paths.length > 0 && (
                    <span className="glossary-paths">
                      {e.paths.map(p => { const lang = getLanguage(p); return lang ? <Link key={p} href={`/languages/${p}`} style={{ color: lang.accentColor }}>{lang.name}</Link> : null })}
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
