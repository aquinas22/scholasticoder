'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: '/languages', label: 'Languages' },
    { href: '/editors', label: 'Editors' },
  ]

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        background: 'rgba(var(--bg), 0.85)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 1.5rem',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-syne, sans-serif)',
            fontWeight: 800,
            fontSize: '1.15rem',
            color: 'var(--text)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <span className="nav-seal">学</span>
          <span>Scholasti<span style={{ color: 'var(--accent)' }}>Coder</span></span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: 6,
                fontSize: '0.9rem',
                fontWeight: 500,
                color: pathname.startsWith(link.href) ? 'var(--accent)' : 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color 0.15s, background 0.15s',
                background: pathname.startsWith(link.href) ? 'var(--card)' : 'transparent',
              }}
            >
              {link.label}
            </Link>
          ))}

          <div style={{ marginLeft: '0.5rem' }}>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
