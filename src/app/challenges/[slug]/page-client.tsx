'use client'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { CodeLab } from '@/components/CodeLab'
import { challenges, getChallenge, TIER_COLOR, TIER_LABEL } from '@/content/challenges'
import { useProgress } from '@/hooks/useProgress'

export default function ChallengeClient() {
  const params = useParams()
  const slug = params.slug as string
  const challenge = getChallenge(slug)
  const { isExerciseDone } = useProgress()
  if (!challenge) return notFound()

  const index = challenges.indexOf(challenge)
  const prev = index > 0 ? challenges[index - 1] : null
  const next = index < challenges.length - 1 ? challenges[index + 1] : null
  const solved = isExerciseDone(`challenge/${challenge.slug}`)

  return (
    <main className="section-wrap challenge-shell">
      <nav style={{ marginBottom: '1.25rem', fontSize: '0.78rem', color: 'var(--text-muted)' }} aria-label="Breadcrumb">
        <Link href="/dojo" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Dojo</Link>
        {' / '}
        <Link href="/challenges" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Challenges</Link>
        {' / '}
        <span style={{ color: 'var(--text)' }}>{challenge.title}</span>
      </nav>

      <header className="challenge-head">
        <div className="challenge-meta">
          <span className="challenge-tier" style={{ color: TIER_COLOR[challenge.tier], borderColor: TIER_COLOR[challenge.tier] }}>{TIER_LABEL[challenge.tier]}</span>
          <span>Challenge {index + 1} of {challenges.length}</span>
          {solved && <span className="interactive-pill">✓ solved</span>}
        </div>
        <h1>{challenge.title}</h1>
        <p className="challenge-prompt">{challenge.prompt}</p>
        {challenge.examples && (
          <div className="challenge-examples">
            <span className="sc-lab-kicker">Examples</span>
            <pre>{challenge.examples.join('\n')}</pre>
          </div>
        )}
      </header>

      <CodeLab
        runtime="python"
        id={`challenge/${challenge.slug}`}
        title={challenge.title}
        code={challenge.starter}
        tests={challenge.tests}
        hints={challenge.hints}
        solution={challenge.solution}
        minLines={12}
      />

      <nav style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }} aria-label="Challenge navigation">
        {prev ? <Link href={`/challenges/${prev.slug}`} className="lesson-nav-card"><span>← Previous</span><strong>{prev.title}</strong></Link> : <div style={{ flex: 1 }} />}
        {next ? <Link href={`/challenges/${next.slug}`} className="lesson-nav-card is-next"><span>Next →</span><strong>{next.title}</strong></Link> : <Link href="/challenges" className="lesson-nav-card is-next"><span>Top of the ladder</span><strong>Back to all challenges →</strong></Link>}
      </nav>
    </main>
  )
}
