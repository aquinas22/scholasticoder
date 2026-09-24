import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="wrap page page-narrow notfound">
      <h1>Page not found</h1>
      <p>The link may be out of date, or the page may have moved. Every course, lesson and challenge is still reachable from the course list.</p>
      <div className="actions">
        <Link href="/" className="btn btn-primary">Go to the home page <span aria-hidden>→</span></Link>
        <Link href="/languages" className="btn btn-secondary">All courses</Link>
      </div>
    </main>
  )
}
