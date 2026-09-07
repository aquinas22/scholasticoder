'use client'
import Link from 'next/link'
import { createContext, useContext, useEffect, useId, useRef, useState } from 'react'
import type { GlossaryEntry } from '@/content/glossary'
import { getLanguage } from '@/content'
import { glossaryAnchor, splitTerms, type Piece } from '@/lib/terms'
import { CodeBlock } from './CodeBlock'

/**
 * Per-lesson memory of which terms have already been linked, so each key word gets one popover per
 * lesson. Results are cached per block, which keeps rendering deterministic across re-renders.
 */
const TermScopeContext = createContext<string | null>(null)
const scopes = new Map<string, { seen: Set<string>; blocks: Map<string, Piece[]> }>()

function scopeFor(key: string) {
  let s = scopes.get(key)
  if (!s) { s = { seen: new Set(), blocks: new Map() }; scopes.set(key, s) }
  return s
}

export function TermScope({ scopeKey, children }: { scopeKey: string; children: React.ReactNode }) {
  return <TermScopeContext.Provider value={scopeKey}>{children}</TermScopeContext.Provider>
}

/** A clickable key word. Click for a definition, an example and a link to the path that teaches it. */
export function Term({ text, entry }: { text: string; entry: GlossaryEntry }) {
  const [open, setOpen] = useState(false)
  const [side, setSide] = useState<'below' | 'above'>('below')
  const ref = useRef<HTMLSpanElement>(null)
  const id = useId()

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey) }
  }, [open])

  const toggle = () => {
    if (!open && ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setSide(window.innerHeight - rect.bottom < 360 && rect.top > 360 ? 'above' : 'below')
    }
    setOpen(o => !o)
  }

  const path = entry.paths?.[0] ? getLanguage(entry.paths[0]) : null
  return (
    <span className="term" ref={ref}>
      <button type="button" className={`term-word ${open ? 'is-open' : ''}`} onClick={toggle} aria-expanded={open} aria-controls={id} title={`${entry.term}: click for a definition`}>{text}</button>
      {open && (
        <span className={`term-pop is-${side}`} id={id} role="dialog" aria-label={entry.term}>
          <span className="term-pop-head">
            <span className="sc-lab-kicker">Glossarium</span>
            <strong>{entry.term}</strong>
            <button type="button" className="term-close" onClick={() => setOpen(false)} aria-label="Close">×</button>
          </span>
          <span className="term-def">{entry.definition}</span>
          {entry.example && <span className="term-example"><CodeBlock code={entry.example.code} language={entry.example.language} /></span>}
          <span className="term-links">
            {path && <Link href={`/languages/${path.slug}`} style={{ color: path.accentColor }}>Taught in {path.name} →</Link>}
            <Link href={`/glossary/#${glossaryAnchor(entry.term)}`}>Glossary</Link>
          </span>
        </span>
      )}
    </span>
  )
}

/**
 * Prose with key words turned into clickable terms. Inside a TermScope with a blockId, each term
 * links once per lesson; otherwise each term links once per block.
 */
export function RichText({ text, blockId }: { text: string; blockId?: string }) {
  const scopeKey = useContext(TermScopeContext)
  let pieces: Piece[]
  if (scopeKey && blockId) {
    const scope = scopeFor(scopeKey)
    const cached = scope.blocks.get(blockId)
    if (cached && cached.map(p => (typeof p === 'string' ? p : p.text)).join('') === text) pieces = cached
    else { pieces = splitTerms(text, scope.seen); scope.blocks.set(blockId, pieces) }
  } else {
    pieces = splitTerms(text, new Set())
  }
  return <>{pieces.map((p, i) => (typeof p === 'string' ? p : <Term key={i} text={p.text} entry={p.entry} />))}</>
}
