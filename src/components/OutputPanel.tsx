'use client'

export type OutputKind = 'stdout' | 'stderr' | 'error' | 'info' | 'success'
export interface OutputChunk { kind: OutputKind; text: string }

interface Props {
  chunks: OutputChunk[]
  running?: boolean
  statusText?: string
  ms?: number | null
  emptyHint?: string
}

export function OutputPanel({ chunks, running, statusText, ms, emptyHint = 'Output will appear here.' }: Props) {
  const empty = chunks.length === 0
  return (
    <div className="sc-output" role="log" aria-live="polite" aria-label="Program output">
      <div className="sc-output-bar">
        <span>Output</span>
        <span className="sc-output-meta">
          {running ? <span className="sc-spinner" aria-hidden /> : null}
          {running ? (statusText || 'Running…') : ms != null ? `finished in ${ms} ms` : ''}
        </span>
      </div>
      <pre className="sc-output-body">
        {empty && !running ? <span className="sc-output-empty">{emptyHint}</span> : null}
        {chunks.map((c, i) => <span key={i} className={`sc-out-${c.kind}`}>{c.text}</span>)}
        {running ? <span className="sc-output-cursor" aria-hidden /> : null}
      </pre>
    </div>
  )
}
