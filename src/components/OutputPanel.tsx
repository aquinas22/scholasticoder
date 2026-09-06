'use client'

export type OutputKind = 'stdout' | 'stderr' | 'error' | 'info' | 'success'
export interface OutputChunk { kind: OutputKind; text: string }
export interface OutputTable { columns: string[]; rows: unknown[][]; caption?: string }

interface Props {
  chunks: OutputChunk[]
  tables?: OutputTable[]
  running?: boolean
  statusText?: string
  ms?: number | null
  emptyHint?: string
}

function cell(v: unknown) {
  if (v === null || v === undefined) return <span className="sc-null">NULL</span>
  if (typeof v === 'number') return <span className="sc-num">{Number.isInteger(v) ? v : Math.round(v * 1000) / 1000}</span>
  return String(v)
}

export function OutputPanel({ chunks, tables = [], running, statusText, ms, emptyHint = 'Output will appear here.' }: Props) {
  const empty = chunks.length === 0 && tables.length === 0
  return (
    <div className="sc-output" role="log" aria-live="polite" aria-label="Program output">
      <div className="sc-output-bar">
        <span>Output</span>
        <span className="sc-output-meta">
          {running ? <span className="sc-spinner" aria-hidden /> : null}
          {running ? (statusText || 'Running…') : ms != null ? `finished in ${ms} ms` : ''}
        </span>
      </div>
      <div className="sc-output-body-wrap">
        {tables.map((t, i) => (
          <div key={i} className="sc-table-wrap">
            {t.caption && <div className="sc-table-caption">{t.caption}</div>}
            {t.rows.length === 0 ? (
              <div className="sc-table-empty">{t.columns.join(', ')} — no rows</div>
            ) : (
              <table className="sc-table">
                <thead><tr>{t.columns.map((c, j) => <th key={j}>{c}</th>)}</tr></thead>
                <tbody>{t.rows.map((r, j) => <tr key={j}>{r.map((v, k) => <td key={k}>{cell(v)}</td>)}</tr>)}</tbody>
              </table>
            )}
            <div className="sc-table-count">{t.rows.length} row{t.rows.length === 1 ? '' : 's'}</div>
          </div>
        ))}
        <pre className="sc-output-body">
          {empty && !running ? <span className="sc-output-empty">{emptyHint}</span> : null}
          {chunks.map((c, i) => <span key={i} className={`sc-out-${c.kind}`}>{c.text}</span>)}
          {running ? <span className="sc-output-cursor" aria-hidden /> : null}
        </pre>
      </div>
    </div>
  )
}
