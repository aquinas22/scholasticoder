interface Props {
  value: number // 0-100
  color?: string
  height?: number
  label?: string
  className?: string
}

/** A thin, accessible progress bar. Uses the theme accent unless a colour is given. */
export function ProgressBar({ value, color, height = 4, label = 'Progress', className = '' }: Props) {
  const pct = Math.min(100, Math.max(0, Math.round(value)))
  return (
    <div className={`progress-track ${className}`} style={{ height }} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={label}>
      <div className="progress-fill" style={{ width: `${pct}%`, background: color ?? 'var(--accent)' }} />
    </div>
  )
}
