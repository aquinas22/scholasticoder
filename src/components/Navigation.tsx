'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'

const LINKS = [
  { href: '/languages', label: 'Courses' },
  { href: '/dojo', label: 'Playground' },
  { href: '/challenges', label: 'Challenges' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/progress', label: 'Progress' },
]

/** The small brand mark: a terminal prompt in a rounded square. */
export function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <svg className="brand-mark" width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <rect width="64" height="64" rx="14" fill="var(--accent)" />
      <path d="M18 22l12 10-12 10" fill="none" stroke="var(--on-accent)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 44h13" stroke="var(--on-accent)" strokeWidth="6" strokeLinecap="round" />
    </svg>
  )
}

export function Navigation() {
  const pathname = usePathname() ?? '/'
  const [open, setOpen] = useState(false)

  return (
    <header className={`site-nav ${open ? 'is-open' : ''}`}>
      <nav className="site-nav-inner" aria-label="Main">
        <Link href="/" className="site-logo" onClick={() => setOpen(false)}>
          <BrandMark />
          <span>ScholastiCoder</span>
        </Link>
        <button type="button" className="nav-menu-button" aria-expanded={open} aria-controls="site-links" onClick={() => setOpen(o => !o)}>
          <span aria-hidden>{open ? '✕' : '☰'}</span> Menu
        </button>
        <div className="site-links" id="site-links">
          {LINKS.map(link => {
            const active = pathname.startsWith(link.href)
            return (
              <Link key={link.href} href={link.href} className={`site-link ${active ? 'is-active' : ''}`} aria-current={active ? 'page' : undefined} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            )
          })}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
