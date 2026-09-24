'use client'
import Link from 'next/link'
import { challenges, ChallengeTier, TIER_COLOR, TIER_LABEL } from '@/content/challenges'
import { useProgress } from '@/hooks/useProgress'
import { ProgressBar } from '@/components/ProgressBar'

const TIERS: ChallengeTier[] = ['novice', 'apprentice', 'journeyman', 'master']
const TIER_BLURB: Record<ChallengeTier, string> = {
  novice: 'Loops, strings and conditions. The first four Python lessons cover everything you need.',
  apprentice: 'Dictionaries, sorting, recursion and classic algorithms. Expect to think for a few minutes before typing.',
  journeyman: 'Data structures, parsers and decorators. Each one is a small piece of real software.',
  master: 'Simulations, graphs, tries and parsers. Sketch a plan on paper before you start.',
}

export default function ChallengesClient() {
  const { isExerciseDone } = useProgress()
  const solved = challenges.filter(c => isExerciseDone(`challenge/${c.slug}`)).length
  const pct = Math.round((solved / challenges.length) * 100)

  return (
    <main className="wrap page">
      <header className="page-head page-head-split">
        <div>
          <h1>Python challenges</h1>
          <p>Small problems to practise on, from easy to hard. Your code is checked automatically in the browser. Hints are there when you are stuck, and a reference solution when you are done. New to Python? Do the first few <Link className="text-link" href="/languages/python">Python lessons</Link> first.</p>
        </div>
        <div className="challenges-progress">
          <strong>{solved}<span> of {challenges.length} solved</span></strong>
          <ProgressBar value={pct} height={6} label="Challenges solved" />
          <span>{pct}% complete</span>
        </div>
      </header>

      {TIERS.map(tier => {
        const list = challenges.filter(c => c.tier === tier)
        const done = list.filter(c => isExerciseDone(`challenge/${c.slug}`)).length
        return (
          <section key={tier} className="tier-section" aria-labelledby={`tier-${tier}`}>
            <div className="tier-head">
              <h2 id={`tier-${tier}`}><span className="tier-dot" style={{ background: TIER_COLOR[tier] }} aria-hidden />{TIER_LABEL[tier]}</h2>
              <p>{TIER_BLURB[tier]}</p>
              <span className="tier-count">{done} of {list.length} solved</span>
            </div>
            <div className="challenge-grid">
              {list.map((c, i) => {
                const solvedOne = isExerciseDone(`challenge/${c.slug}`)
                return (
                  <Link key={c.slug} href={`/challenges/${c.slug}`} className={`challenge-card ${solvedOne ? 'is-solved' : ''}`}>
                    <span className="challenge-num" aria-hidden>{solvedOne ? '✓' : i + 1}</span>
                    <div>
                      <h3>{c.title}</h3>
                      <p>{c.prompt}</p>
                      <div className="challenge-tags">{c.tags.map(t => <span key={t}>{t}</span>)}<span className="challenge-checks">{c.tests.length} checks</span></div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}
    </main>
  )
}
