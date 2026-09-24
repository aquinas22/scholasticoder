import type { Language } from '@/content/types'

/** Black or white, whichever reads better on the given hex colour (WCAG relative luminance). */
export function readableOn(hex: string): string {
  const m = hex.replace('#', '')
  const full = m.length === 3 ? m.split('').map(c => c + c).join('') : m
  const [r, g, b] = [0, 2, 4].map(i => parseInt(full.slice(i, i + 2), 16) / 255).map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b
  // Contrast against white is 1.05 / (L + 0.05); against black it is (L + 0.05) / 0.05.
  return 1.05 / (L + 0.05) >= (L + 0.05) / 0.05 ? '#ffffff' : '#111111'
}

/** A course's short code (Py, JS, SQ…) on its brand colour, always with readable text. */
export function LangIcon({ language, size = 'md' }: { language: Pick<Language, 'icon' | 'accentColor' | 'name'>; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <span className={`lang-icon lang-icon-${size}`} style={{ background: language.accentColor, color: readableOn(language.accentColor) }} aria-hidden>
      {language.icon}
    </span>
  )
}
