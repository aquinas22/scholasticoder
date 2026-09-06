'use client'
import { createContext, useCallback, useContext, useSyncExternalStore } from 'react'
import { DEFAULT_PALETTE, PALETTE_KEY, getPalette, palettes } from '@/lib/themes'

interface ThemeContextValue { palette: string; setPalette: (id: string) => void; isDark: boolean }

const listeners = new Set<() => void>()
let current: string | null = null

function read(): string {
  if (current) return current
  try { current = localStorage.getItem(PALETTE_KEY) || DEFAULT_PALETTE } catch { current = DEFAULT_PALETTE }
  if (!palettes.some(p => p.id === current)) current = DEFAULT_PALETTE
  return current
}

function apply(id: string) {
  const p = getPalette(id)
  const h = document.documentElement
  h.setAttribute('data-palette', p.id)
  h.classList.toggle('dark', p.dark)
  h.classList.toggle('light', !p.dark)
  h.style.colorScheme = p.dark ? 'dark' : 'light'
}

const ThemeContext = createContext<ThemeContextValue>({ palette: DEFAULT_PALETTE, setPalette: () => {}, isDark: true })

export function Providers({ children }: { children: React.ReactNode }) {
  const palette = useSyncExternalStore(fn => { listeners.add(fn); return () => { listeners.delete(fn) } }, read, () => DEFAULT_PALETTE)
  const setPalette = useCallback((id: string) => {
    current = getPalette(id).id
    try { localStorage.setItem(PALETTE_KEY, current) } catch {}
    apply(current)
    listeners.forEach(fn => fn())
  }, [])
  return <ThemeContext.Provider value={{ palette, setPalette, isDark: getPalette(palette).dark }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
