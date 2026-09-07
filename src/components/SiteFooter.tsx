import Link from 'next/link'

const MOTTOS = [
  ['Ora et labora.', 'Pray and work.'],
  ['Fides quaerens intellectum.', 'Faith seeking understanding.'],
  ['Initium sapientiae timor Domini.', 'The beginning of wisdom is reverence.'],
  ['Age quod agis.', 'Do what you are doing.'],
  ['Festina lente.', 'Make haste slowly.'],
  ['Nulla dies sine linea.', 'No day without a line.'],
]

export function SiteFooter() {
  const [latin, english] = MOTTOS[new Date().getDate() % MOTTOS.length]
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <span className="footer-seal" aria-hidden="true">☧</span>
          <div>
            <strong>ScholastiCoder</strong>
            <p><em>{latin}</em> {english}</p>
          </div>
        </div>
        <nav className="site-footer-cols" aria-label="Footer">
          <div>
            <h3>Study</h3>
            <Link href="/languages">All paths</Link>
            <Link href="/languages/python">Python</Link>
            <Link href="/languages/javascript">JavaScript</Link>
            <Link href="/languages/sql">SQL</Link>
          </div>
          <div>
            <h3>Practice</h3>
            <Link href="/dojo">The Dojo</Link>
            <Link href="/challenges">Challenge ladder</Link>
            <Link href="/progress">Your progress</Link>
          </div>
          <div>
            <h3>Reference</h3>
            <Link href="/method">The method</Link>
            <Link href="/glossary">Glossary</Link>
            <Link href="/editors">Editors</Link>
            <a href="https://github.com/aquinas22/scholasticoder" target="_blank" rel="noreferrer">Source on GitHub</a>
          </div>
        </nav>
      </div>
      <div className="site-footer-rule" aria-hidden="true">✠</div>
    </footer>
  )
}
