'use client'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { CodeLab } from '@/components/CodeLab'
import { challenges, getChallenge, TIER_COLOR, TIER_LABEL } from '@/content/challenges'
import { useProgress } from '@/hooks/useProgress'
import { TermScope, RichText } from '@/components/Term'

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
    <TermScope scopeKey={`challenge/${challenge.slug}`}>
    <main className="wrap page page-narrow">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/challenges">Challenges</Link>
        <span aria-hidden>/</span>
        <span aria-current="page">{challenge.title}</span>
      </nav>

      <header className="challenge-head">
        <div className="challenge-meta">
          <span className="challenge-tier"><span className="tier-dot" style={{ background: TIER_COLOR[challenge.tier] }} aria-hidden />{TIER_LABEL[challenge.tier]}</span>
          <span>Challenge {index + 1} of {challenges.length}</span>
          {solved && <span className="done-badge">✓ Solved</span>}
        </div>
        <h1>{challenge.title}</h1>
        <p className="challenge-prompt"><RichText text={challenge.prompt} blockId="prompt" /></p>
        {challenge.examples && (
          <div className="challenge-examples">
            <span className="challenge-examples-label">Examples</span>
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

      <nav className="pager" aria-label="Challenge navigation">
        {prev ? <Link href={`/challenges/${prev.slug}`} className="pager-link"><span>← Previous</span><strong>{prev.title}</strong></Link> : <span />}
        {next ? <Link href={`/challenges/${next.slug}`} className="pager-link is-next"><span>Next →</span><strong>{next.title}</strong></Link> : <Link href="/challenges" className="pager-link is-next"><span>That was the last one</span><strong>Back to all challenges</strong></Link>}
      </nav>
    </main>
    </TermScope>
  )
}
