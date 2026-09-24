'use client'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from './Providers'
import { AUTO_PALETTE, palettes } from '@/lib/themes'

export function ThemeToggle() {
  const { choice, setPalette } = useTheme()
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

  const pick = (id: string) => { setPalette(id); setOpen(false) }
  const groups: Array<{ id: 'default' | 'editor'; label: string }> = [{ id: 'default', label: 'Site themes' }, { id: 'editor', label: 'Editor themes' }]

  return (
    <div className="theme-picker" ref={ref}>
      <button type="button" className="theme-trigger" onClick={() => setOpen(o => !o)} aria-haspopup="listbox" aria-expanded={open} aria-label="Choose a colour theme" title="Colour theme">
        <span className="theme-swatch" aria-hidden />
        <span className="theme-trigger-label">Theme</span>
      </button>
      {open && (
        <div className="theme-menu" role="listbox" aria-label="Colour themes">
          <div className="theme-group">
            <button type="button" role="option" aria-selected={choice === AUTO_PALETTE} className={`theme-option ${choice === AUTO_PALETTE ? 'is-active' : ''}`} onClick={() => pick(AUTO_PALETTE)}>
              <span className="theme-dots theme-dots-auto" aria-hidden><i /><i /></span>
              <span className="theme-option-text"><strong>Automatic</strong><small>Light or dark, following your device.</small></span>
              {choice === AUTO_PALETTE && <span className="theme-check" aria-hidden>✓</span>}
            </button>
          </div>
          {groups.map(g => (
            <div key={g.id} className="theme-group">
              <div className="theme-group-label">{g.label}</div>
              {palettes.filter(p => p.group === g.id).map(p => (
                <button
                  key={p.id}
                  type="button"
                  role="option"
                  aria-selected={choice === p.id}
                  className={`theme-option ${choice === p.id ? 'is-active' : ''}`}
                  onClick={() => pick(p.id)}
                >
                  <span className="theme-dots" aria-hidden style={{ background: p.vars['--bg'], borderColor: p.vars['--border'] }}>
                    <i style={{ background: p.vars['--accent'] }} /><i style={{ background: p.vars['--syn-keyword'] }} /><i style={{ background: p.vars['--syn-string'] }} />
                  </span>
                  <span className="theme-option-text"><strong>{p.name}</strong><small>{p.note}</small></span>
                  {choice === p.id && <span className="theme-check" aria-hidden>✓</span>}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
