'use client'
import Link from 'next/link'
import { challenges, ChallengeTier, TIER_COLOR, TIER_LABEL } from '@/content/challenges'
import { useProgress } from '@/hooks/useProgress'
import { ProgressBar } from '@/components/ProgressBar'

const TIERS: ChallengeTier[] = ['novice', 'apprentice', 'journeyman']
const TIER_BLURB: Record<ChallengeTier, string> = {
  novice: 'Loops, strings and conditionals. Finish the first four Python lessons and you have everything you need.',
  apprentice: 'Dictionaries, sorting, recursion and classic algorithms. Expect to think for a few minutes before typing.',
  journeyman: 'Data structures, parsers and decorators. Each one is a small piece of real software.',
}

export default function ChallengesClient() {
  const { isExerciseDone } = useProgress()
  const solved = challenges.filter(c => isExerciseDone(`challenge/${c.slug}`)).length
  const pct = Math.round((solved / challenges.length) * 100)

  return (
    <main className="section-wrap challenges-shell">
      <header className="challenges-head">
        <div>
          <p className="eyebrow"><span>L</span> The ladder</p>
          <h1>Python challenges.</h1>
          <p>Every problem is checked automatically in your browser. Hints are there when you are stuck; the reference solution is there when you are done. Progress is saved on this device.</p>
        </div>
        <div className="challenges-progress">
          <strong>{solved}<span>/{challenges.length}</span></strong>
          <ProgressBar value={pct} color="var(--accent)" height={4} />
          <span>{pct}% of the ladder climbed</span>
        </div>
      </header>

      {TIERS.map(tier => {
        const list = challenges.filter(c => c.tier === tier)
        const done = list.filter(c => isExerciseDone(`challenge/${c.slug}`)).length
        return (
          <section key={tier} className="tier-section" aria-labelledby={`tier-${tier}`}>
            <div className="tier-head">
              <h2 id={`tier-${tier}`} style={{ color: TIER_COLOR[tier] }}>{TIER_LABEL[tier]}</h2>
              <p>{TIER_BLURB[tier]}</p>
              <span className="tier-count">{done}/{list.length}</span>
            </div>
            <div className="challenge-grid">
              {list.map((c, i) => {
                const solvedOne = isExerciseDone(`challenge/${c.slug}`)
                return (
                  <Link key={c.slug} href={`/challenges/${c.slug}`} className={`challenge-card ${solvedOne ? 'is-solved' : ''}`}>
                    <span className="challenge-num" style={{ borderColor: solvedOne ? TIER_COLOR[tier] : undefined, background: solvedOne ? TIER_COLOR[tier] : undefined, color: solvedOne ? '#fff' : undefined }}>{solvedOne ? '✓' : i + 1}</span>
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
