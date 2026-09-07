'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'

const LINKS = [
  { href: '/languages', label: 'Paths' },
  { href: '/dojo', label: 'Dojo', accent: true },
  { href: '/challenges', label: 'Challenges' },
  { href: '/glossary', label: 'Glossary' },
]

export function Navigation() {
  const pathname = usePathname()
  return (
    <nav className="site-nav">
      <div className="site-nav-inner">
        <Link href="/" className="site-logo">
          <span className="nav-seal" aria-hidden="true">☧</span>
          <span>Scholasti<span style={{ color: 'var(--accent)' }}>Coder</span></span>
        </Link>
        <div className="site-links">
          {LINKS.map(link => {
            const active = pathname.startsWith(link.href)
            return (
              <Link key={link.href} href={link.href} className={`site-link ${active ? 'is-active' : ''} ${link.accent ? 'is-accent' : ''}`}>
                {link.accent && <span aria-hidden>▶ </span>}{link.label}
              </Link>
            )
          })}
          <div style={{ marginLeft: '0.35rem' }}><ThemeToggle /></div>
        </div>
      </div>
    </nav>
  )
}
