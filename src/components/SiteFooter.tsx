import Link from 'next/link'
import { BrandMark } from './Navigation'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <BrandMark size={24} />
          <div>
            <strong>ScholastiCoder</strong>
            <p>Free coding lessons you can run in your browser. No account needed; your progress stays on your device.</p>
          </div>
        </div>
        <nav className="site-footer-cols" aria-label="Footer">
          <div>
            <h2>Learn</h2>
            <Link href="/languages">All courses</Link>
            <Link href="/languages/python">Python</Link>
            <Link href="/languages/javascript">JavaScript</Link>
            <Link href="/languages/sql">SQL</Link>
          </div>
          <div>
            <h2>Practice</h2>
            <Link href="/dojo">Playground</Link>
            <Link href="/challenges">Challenges</Link>
            <Link href="/progress">Your progress</Link>
          </div>
          <div>
            <h2>Reference</h2>
            <Link href="/method">How lessons work</Link>
            <Link href="/questions">Common questions</Link>
            <Link href="/glossary">Glossary</Link>
            <Link href="/editors">Choosing an editor</Link>
            <a href="https://github.com/aquinas22/scholasticoder" target="_blank" rel="noreferrer">Source on GitHub</a>
          </div>
        </nav>
      </div>
    </footer>
  )
}
