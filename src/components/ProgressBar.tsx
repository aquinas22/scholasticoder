'use client'

interface Props {
  value: number  // 0-100
  color?: string
  height?: number
  showLabel?: boolean
  className?: string
}

export function ProgressBar({ value, color, height = 4, showLabel = false, className = '' }: Props) {
  const pct = Math.min(100, Math.max(0, value))

  return (
    <div className={className}>
      <div
        style={{
          height,
          background: 'var(--border)',
          borderRadius: height / 2,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: color
              ? `linear-gradient(90deg, ${color}cc, ${color})`
              : 'linear-gradient(90deg, var(--accent), var(--accent-secondary))',
            borderRadius: height / 2,
            transition: 'width 0.6s ease',
          }}
        />
      </div>
      {showLabel && (
        <div style={{ marginTop: 4, fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          {pct}%
        </div>
      )}
    </div>
  )
}
