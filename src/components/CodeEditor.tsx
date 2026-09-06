'use client'
import { useRef, KeyboardEvent, ChangeEvent } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

const PRISM_LANG: Record<string, string> = { python: 'python', javascript: 'javascript', js: 'javascript', typescript: 'typescript', html: 'markup', css: 'css', json: 'json', sql: 'sql', bash: 'bash' }

interface Props {
  value: string
  onChange: (value: string) => void
  language?: string
  onRun?: () => void
  minLines?: number
  ariaLabel?: string
  readOnly?: boolean
}

/** A lightweight code editor: a transparent textarea layered over a Prism-highlighted <pre>. Colours come from the palette. */
export function CodeEditor({ value, onChange, language = 'python', onRun, minLines = 6, ariaLabel = 'Code editor', readOnly = false }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const lineCount = Math.max(value.split('\n').length, minLines)

  function insert(text: string, cursorOffset = text.length) {
    const el = ref.current
    if (!el) return
    const { selectionStart: s, selectionEnd: e } = el
    const next = value.slice(0, s) + text + value.slice(e)
    onChange(next)
    requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = s + cursorOffset })
  }

  function handleKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    const el = e.currentTarget
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); onRun?.(); return }
    if (readOnly) return
    if (e.key === 'Tab') {
      e.preventDefault()
      const { selectionStart: s, selectionEnd: en } = el
      const lineStart = value.lastIndexOf('\n', s - 1) + 1
      if (s !== en || e.shiftKey) {
        const lineEnd = value.indexOf('\n', en)
        const block = value.slice(lineStart, lineEnd === -1 ? value.length : lineEnd)
        const lines = block.split('\n')
        const changed = lines.map(l => (e.shiftKey ? l.replace(/^ {1,4}/, '') : '    ' + l)).join('\n')
        const next = value.slice(0, lineStart) + changed + value.slice(lineEnd === -1 ? value.length : lineEnd)
        onChange(next)
        requestAnimationFrame(() => { el.selectionStart = lineStart; el.selectionEnd = lineStart + changed.length })
      } else {
        insert('    ')
      }
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const { selectionStart: s } = el
      const lineStart = value.lastIndexOf('\n', s - 1) + 1
      const line = value.slice(lineStart, s)
      const indent = (line.match(/^\s*/) ?? [''])[0]
      const opensBlock = /[:{[(]\s*$/.test(line.trimEnd()) && !line.trimStart().startsWith('#')
      insert('\n' + indent + (opensBlock ? '    ' : ''))
      return
    }
    if (e.key === 'Backspace') {
      const { selectionStart: s, selectionEnd: en } = el
      if (s === en && s >= 4 && value.slice(s - 4, s) === '    ' && /^\s*$/.test(value.slice(value.lastIndexOf('\n', s - 1) + 1, s))) {
        e.preventDefault()
        onChange(value.slice(0, s - 4) + value.slice(s))
        requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = s - 4 })
      }
    }
  }

  return (
    <div className="sc-editor" style={{ minHeight: `calc(${lineCount} * 1.65 * 0.86rem + 2rem)` }}>
      <div className="sc-editor-gutter" aria-hidden>
        {Array.from({ length: lineCount }, (_, i) => <div key={i}>{i + 1}</div>)}
      </div>
      <div className="sc-editor-scroll">
        <div className="sc-editor-layer">
          <SyntaxHighlighter language={PRISM_LANG[language] ?? language} useInlineStyles={false} showLineNumbers={false} wrapLongLines={false} PreTag="pre" CodeTag="code">
            {value.endsWith('\n') ? value + ' ' : value || ' '}
          </SyntaxHighlighter>
          <textarea
            ref={ref}
            className="sc-editor-input"
            value={value}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
            onKeyDown={handleKey}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            aria-label={ariaLabel}
            readOnly={readOnly}
          />
        </div>
      </div>
    </div>
  )
}
