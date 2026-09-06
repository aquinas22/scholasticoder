'use client'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from './Providers'
import { palettes } from '@/lib/themes'

export function ThemeToggle() {
  const { palette, setPalette } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc) }
  }, [open])

  const groups: Array<{ id: 'scriptorium' | 'editor'; label: string }> = [{ id: 'scriptorium', label: 'Scriptorium' }, { id: 'editor', label: 'Editor classics' }]

  return (
    <div className="theme-picker" ref={ref}>
      <button type="button" className="theme-trigger" onClick={() => setOpen(o => !o)} aria-haspopup="listbox" aria-expanded={open} aria-label="Choose a colour theme" title="Colour theme">
        <span className="theme-swatch" aria-hidden />
        <span className="theme-trigger-label">Theme</span>
      </button>
      {open && (
        <div className="theme-menu" role="listbox" aria-label="Colour themes">
          {groups.map(g => (
            <div key={g.id} className="theme-group">
              <div className="theme-group-label">{g.label}</div>
              {palettes.filter(p => p.group === g.id).map(p => (
                <button
                  key={p.id}
                  type="button"
                  role="option"
                  aria-selected={palette === p.id}
                  className={`theme-option ${palette === p.id ? 'is-active' : ''}`}
                  onClick={() => { setPalette(p.id); setOpen(false) }}
                >
                  <span className="theme-dots" aria-hidden style={{ background: p.vars['--bg'], borderColor: p.vars['--border'] }}>
                    <i style={{ background: p.vars['--accent'] }} /><i style={{ background: p.vars['--syn-keyword'] }} /><i style={{ background: p.vars['--syn-string'] }} />
                  </span>
                  <span className="theme-option-text"><strong>{p.name}</strong><small>{p.note}</small></span>
                  {palette === p.id && <span className="theme-check" aria-hidden>✓</span>}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
