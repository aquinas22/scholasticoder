import { glossary, type GlossaryEntry } from '@/content/glossary'

/** Words in lesson prose that link to glossary entries. Longest patterns first so "type hint" wins over "type". */
interface Pattern { re: RegExp; entry: GlossaryEntry; key: string }

const STOP = new Set(['for', 'if', 'in', 'is', 'with', 'or', 'and', 'not', 'as', 'the'])

function escape(s: string) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }

let cache: Pattern[] | null = null

export function termPatterns(): Pattern[] {
  if (cache) return cache
  const list: Pattern[] = []
  for (const entry of glossary) {
    if (entry.linkable === false) continue
    const words = new Set<string>([entry.term, ...(entry.aliases ?? []), ...(entry.match ?? [])])
    // "None / null" style terms link on each half.
    if (entry.term.includes(' / ')) entry.term.split(' / ').forEach(w => words.add(w.trim()))
    for (const w of words) {
      const word = w.trim()
      if (word.length < 3 || STOP.has(word.toLowerCase())) continue
      const symbolic = /[^A-Za-z0-9 -]/.test(word)
      const boundary = symbolic ? '' : '\\b'
      const plural = !symbolic && /[a-z]$/.test(word) && !word.endsWith('s') ? '(?:s|es)?' : ''
      const flags = word === word.toUpperCase() && !symbolic ? 'g' : 'gi'
      list.push({ re: new RegExp(`${boundary}${escape(word)}${plural}${boundary}`, flags), entry, key: entry.term })
    }
  }
  list.sort((a, b) => b.re.source.length - a.re.source.length)
  cache = list
  return list
}

export type Piece = string | { text: string; entry: GlossaryEntry }

/**
 * Split prose into plain text and linked terms. `seen` tracks entries already linked in this
 * lesson so only the first mention gets a popover — enough to be helpful, not enough to be noise.
 */
export function splitTerms(text: string, seen: Set<string>): Piece[] {
  const patterns = termPatterns()
  const marks: Array<{ start: number; end: number; entry: GlossaryEntry }> = []
  const taken: Array<[number, number]> = []
  const overlaps = (s: number, e: number) => taken.some(([a, b]) => s < b && e > a)
  for (const p of patterns) {
    if (seen.has(p.key)) continue
    p.re.lastIndex = 0
    const m = p.re.exec(text)
    if (!m) continue
    const start = m.index, end = start + m[0].length
    if (overlaps(start, end)) continue
    marks.push({ start, end, entry: p.entry })
    taken.push([start, end])
    seen.add(p.key)
  }
  if (!marks.length) return [text]
  marks.sort((a, b) => a.start - b.start)
  const out: Piece[] = []
  let pos = 0
  for (const m of marks) {
    if (m.start > pos) out.push(text.slice(pos, m.start))
    out.push({ text: text.slice(m.start, m.end), entry: m.entry })
    pos = m.end
  }
  if (pos < text.length) out.push(text.slice(pos))
  return out
}

export function glossaryAnchor(term: string) {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}
