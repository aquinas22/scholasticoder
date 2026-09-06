import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="section-wrap notfound-shell">
      <p className="eyebrow"><span>?</span> Folio not found</p>
      <h1>This page has gone missing from the codex.</h1>
      <p>The link may be old, or the page may have been renamed. Every path, lesson and challenge is still listed from the beginning.</p>
      <div className="hero-actions">
        <Link href="/" className="button-primary">Return to the scriptorium <span>→</span></Link>
        <Link href="/languages" className="button-ghost">All paths</Link>
        <Link href="/dojo" className="button-ghost">The Dojo</Link>
      </div>
      <p className="notfound-motto"><em>Quaerite et invenietis.</em> Seek, and you will find.</p>
    </main>
  )
}
