'use client'
import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from 'react'
import { AUTO_PALETTE, DEFAULT_PALETTE, PALETTE_KEY, getPalette, resolvePalette } from '@/lib/themes'

interface ThemeContextValue {
  /** What the reader chose: a palette id, or 'auto' to follow the system setting. */
  choice: string
  /** The palette actually shown. */
  palette: string
  setPalette: (id: string) => void
  isDark: boolean
}

const listeners = new Set<() => void>()
let current: string | null = null

function read(): string {
  if (current) return current
  let stored: string | null = null
  try { stored = localStorage.getItem(PALETTE_KEY) } catch {}
  current = !stored || stored === AUTO_PALETTE ? AUTO_PALETTE : resolvePalette(stored)
  return current
}

function apply(choice: string) {
  const p = getPalette(resolvePalette(choice))
  const h = document.documentElement
  h.setAttribute('data-palette', p.id)
  h.classList.toggle('dark', p.dark)
  h.classList.toggle('light', !p.dark)
  h.style.colorScheme = p.dark ? 'dark' : 'light'
}

const notify = () => listeners.forEach(fn => fn())

const ThemeContext = createContext<ThemeContextValue>({ choice: AUTO_PALETTE, palette: DEFAULT_PALETTE, setPalette: () => {}, isDark: true })

export function Providers({ children }: { children: React.ReactNode }) {
  const choice = useSyncExternalStore(fn => { listeners.add(fn); return () => { listeners.delete(fn) } }, read, () => AUTO_PALETTE)
  const setPalette = useCallback((id: string) => {
    current = id === AUTO_PALETTE ? AUTO_PALETTE : getPalette(id).id
    try { localStorage.setItem(PALETTE_KEY, current) } catch {}
    apply(current)
    notify()
  }, [])

  // When following the system, react to the system switching between light and dark.
  useEffect(() => {
    if (choice !== AUTO_PALETTE) return
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => { apply(AUTO_PALETTE); notify() }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [choice])

  const palette = typeof window === 'undefined' ? DEFAULT_PALETTE : resolvePalette(choice)
  return <ThemeContext.Provider value={{ choice, palette, setPalette, isDark: getPalette(palette).dark }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
