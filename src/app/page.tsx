'use client'

import Image from 'next/image'
import Link from 'next/link'
import monkHero from '../../public/art/benedictine-coding-monk-hero.png'
import { languages, totalLessons, totalExercises } from '@/content'
import { CodeLab } from '@/components/CodeLab'
import { challenges } from '@/content/challenges'
import { LanguageCard } from '@/components/LanguageCard'
import { TempleTerminal } from '@/components/TempleTerminal'
import { useProgress } from '@/hooks/useProgress'

const paths = [
  { mark: 'I', title: 'Choose a discipline', copy: 'Begin with Python or JavaScript, pursue the web arts, or descend into systems and computer science.' },
  { mark: 'II', title: 'Study the text', copy: 'Focused lessons define each idea, demonstrate it in real code, and annotate the errors that matter.' },
  { mark: 'III', title: 'Practice the craft', copy: 'Run every example in the browser, solve graded exercises with instant feedback, and climb the challenge ladder.' },
]

const HOME_DEMO = `# This is real Python 3, running in your browser. Edit it and press Run.
from collections import Counter

psalm = "ora et labora ora et lege ora et scribe"
counts = Counter(psalm.split())

for word, n in counts.most_common(3):
    print(f"{word:<8} {'▇' * n} {n}")

print("Total words:", sum(counts.values()))`

export default function HomePage() {
  const { getLangProgress } = useProgress()
  return (
    <main className="home-shell">
      <section className="monk-hero">
        <Image src={monkHero} alt="A Benedictine monk studying code in a Romanesque abbey scriptorium" fill priority sizes="100vw" className="monk-hero-art" />
        <div className="monk-hero-wash" />
        <div className="monk-hero-content">
          <p className="eyebrow"><span aria-hidden="true">☧</span> The open-source coding scriptorium</p>
          <h1>Study the logic.<br /><em>Practice the craft.</em></h1>
          <p className="hero-copy">A quiet place for disciplined study. Follow carefully ordered paths through programming, the web, and computer science—without paywalls or distractions.</p>
          <div className="hero-actions">
            <Link href="/languages/python" className="button-primary">Start with Python <span>→</span></Link>
            <Link href="/dojo" className="button-ghost">▶ Open the Dojo</Link>
          </div>
          <div className="hero-stats" aria-label="Course statistics">
            <span><strong>{languages.length}</strong> learning paths</span>
            <span><strong>{totalLessons}+</strong> lessons</span>
            <span><strong>{totalExercises + challenges.length}</strong> graded exercises</span>
            <span><strong>100%</strong> free</span>
          </div>
        </div>
        <a className="scroll-seal" href="#way" aria-label="Scroll to learning approach">↓</a>
      </section>

      <section id="way" className="way-section section-wrap">
        <div className="section-heading centered">
          <p className="eyebrow"><span>V</span> The scholastic method</p>
          <h2>Understand. Question. Build.</h2>
          <p>Definitions before abstractions. Questions before assumptions. Practice after understanding. Each path leads from first principles to working knowledge.</p>
        </div>
        <div className="way-grid">
          {paths.map(path => <article className="way-card" key={path.mark}><span className="brush-mark">{path.mark}</span><h3>{path.title}</h3><p>{path.copy}</p></article>)}
        </div>
      </section>

      <section className="practicum-section section-wrap" id="practicum">
        <div className="section-heading">
          <p className="eyebrow"><span>P</span> Practicum</p>
          <h2>Run Python before you install it.</h2>
          <p>A full CPython interpreter loads into your browser on the first Run — no account, no setup. Every Python lesson has runnable examples and auto-checked exercises; the Dojo is a blank page for your own experiments.</p>
        </div>
        <CodeLab runtime="python" code={HOME_DEMO} minLines={9} />
        <div className="practicum-links">
          <Link href="/dojo" className="button-primary">Open the Dojo <span>→</span></Link>
          <Link href="/challenges" className="button-ghost">Try the {challenges.length} challenges</Link>
          <Link href="/languages/python/lessons/hello-world" className="button-ghost">Begin Python, lesson 1</Link>
        </div>
      </section>

      <section className="terminal-section section-wrap">
        <div className="terminal-copy">
          <p className="eyebrow"><span>P</span> Practicum</p>
          <h2>Put study into practice.</h2>
          <p>Commands stop feeling mysterious once your hands know them. This small sandbox teaches the rhythm; the Terminal and Bash paths explain the machinery.</p>
          <Link href="/languages/terminal">Enter the terminal path →</Link>
        </div>
        <TempleTerminal />
      </section>

      <section id="paths" className="paths-section section-wrap">
        <div className="section-heading">
          <p className="eyebrow"><span>C</span> The codex</p>
          <h2>Choose your course of study.</h2>
          <p>{languages.length} languages, frameworks, and foundations—ordered from familiar foothills to deeper terrain.</p>
        </div>
        <div className="language-grid">
          {languages.map(language => {
            const progress = getLangProgress(language.slug, language.lessons.length)
            return <LanguageCard key={language.slug} language={language} completed={progress.completed} />
          })}
        </div>
      </section>

      <footer className="monk-footer"><span className="footer-seal" aria-hidden="true">☧</span><p><strong>ScholastiCoder</strong><br /><em>Ora et labora.</em> Study deeply. Build patiently.</p><Link href="/languages">All disciplines →</Link></footer>
    </main>
  )
}
