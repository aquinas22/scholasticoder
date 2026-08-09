'use client'

import Image from 'next/image'
import Link from 'next/link'
import monkHero from '../../public/art/coding-monk-hero.png'
import { languages } from '@/content'
import { LanguageCard } from '@/components/LanguageCard'
import { TempleTerminal } from '@/components/TempleTerminal'
import { useProgress } from '@/hooks/useProgress'

const totalLessons = languages.reduce((sum, language) => sum + language.lessons.length, 0)
const paths = [
  { mark: '一', title: 'Choose a path', copy: 'Start with Python or JavaScript, sharpen your web craft, or descend into systems and computer science.' },
  { mark: '二', title: 'Study the scroll', copy: 'Short, focused lessons explain the idea, show real code, and call out the mistakes that matter.' },
  { mark: '三', title: 'Practice the form', copy: 'Run commands, copy examples, break things safely, and track each lesson you master.' },
]

export default function HomePage() {
  const { getLangProgress } = useProgress()
  return (
    <main className="home-shell">
      <section className="monk-hero">
        <Image src={monkHero} alt="A coding apprentice studying in a quiet mountain temple" fill priority sizes="100vw" className="monk-hero-art" />
        <div className="monk-hero-wash" />
        <div className="monk-hero-content">
          <p className="eyebrow"><span>学</span> The open-source coding dojo</p>
          <h1>Master the craft.<br /><em>One lesson at a time.</em></h1>
          <p className="hero-copy">A quiet place to learn loud ideas. Follow practical paths through programming, the web, and computer science—without paywalls or distractions.</p>
          <div className="hero-actions">
            <Link href="#paths" className="button-primary">Begin your training <span>→</span></Link>
            <Link href="/languages/terminal" className="button-ghost">Explore the terminal</Link>
          </div>
          <div className="hero-stats" aria-label="Course statistics">
            <span><strong>{languages.length}</strong> learning paths</span>
            <span><strong>{totalLessons}+</strong> lessons</span>
            <span><strong>100%</strong> free</span>
          </div>
        </div>
        <a className="scroll-seal" href="#way" aria-label="Scroll to learning approach">↓</a>
      </section>

      <section id="way" className="way-section section-wrap">
        <div className="section-heading centered">
          <p className="eyebrow"><span>道</span> The way of the coder</p>
          <h2>Clarity before cleverness.</h2>
          <p>No streak anxiety. No XP theater. Just a thoughtful sequence from first principles to working knowledge.</p>
        </div>
        <div className="way-grid">
          {paths.map(path => <article className="way-card" key={path.mark}><span className="brush-mark">{path.mark}</span><h3>{path.title}</h3><p>{path.copy}</p></article>)}
        </div>
      </section>

      <section className="terminal-section section-wrap">
        <div className="terminal-copy">
          <p className="eyebrow"><span>実</span> Practice hall</p>
          <h2>Learn the terminal by touching it.</h2>
          <p>Commands stop feeling mysterious once your hands know them. This small sandbox teaches the rhythm; the Terminal and Bash paths explain the machinery.</p>
          <Link href="/languages/terminal">Enter the terminal path →</Link>
        </div>
        <TempleTerminal />
      </section>

      <section id="paths" className="paths-section section-wrap">
        <div className="section-heading">
          <p className="eyebrow"><span>巻</span> The library</p>
          <h2>Choose your learning path.</h2>
          <p>{languages.length} languages, frameworks, and foundations—ordered from familiar foothills to deeper terrain.</p>
        </div>
        <div className="language-grid">
          {languages.map(language => {
            const progress = getLangProgress(language.slug, language.lessons.length)
            return <LanguageCard key={language.slug} language={language} completed={progress.completed} />
          })}
        </div>
      </section>

      <footer className="monk-footer"><span className="footer-seal">学</span><p><strong>ScholastiCoder</strong><br />Study deeply. Build patiently.</p><Link href="/languages">All paths →</Link></footer>
    </main>
  )
}
