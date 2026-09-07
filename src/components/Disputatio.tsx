'use client'
import { useState } from 'react'
import type { Quaestio } from '@/content/types'
import { CodeBlock } from './CodeBlock'
import { RichText } from './Term'
import { useProgress } from '@/hooks/useProgress'
import { toRoman } from '@/lib/roman'

interface Props { quaestio: Quaestio; id: string; number?: number; blockId?: string }

type Verdict = 'holds' | 'fails'

/**
 * A disputed question in the manner of the Summa. The learner reads each objection and judges it
 * before the reply is revealed; the respondeo is shown once every objection has been weighed.
 */
export function Disputatio({ quaestio, id, number = 1, blockId = 'q' }: Props) {
  const [verdicts, setVerdicts] = useState<Record<number, Verdict>>({})
  const [revealAll, setRevealAll] = useState(false)
  const { markExerciseDone, isExerciseDone } = useProgress()
  const done = isExerciseDone(id)
  const judged = Object.keys(verdicts).length
  const allJudged = revealAll || judged === quaestio.objections.length
  const correct = quaestio.objections.filter((_, i) => verdicts[i] === 'fails').length

  const judge = (i: number, v: Verdict) => {
    const next = { ...verdicts, [i]: v }
    setVerdicts(next)
    if (Object.keys(next).length === quaestio.objections.length) markExerciseDone(id)
  }

  return (
    <section className={`disputatio ${done ? 'is-done' : ''}`} aria-label={quaestio.question}>
      <header className="disp-head">
        <span className="sc-lab-kicker">Quaestio {toRoman(number)} · disputed question</span>
        <h3>{quaestio.question}</h3>
        <p className="disp-how">Weigh each objection before reading the reply. In the schools this was the whole method: state the strongest case against the truth, then answer it.</p>
      </header>

      <ol className="disp-objections">
        {quaestio.objections.map((o, i) => {
          const v = verdicts[i]
          const shown = revealAll || v !== undefined
          return (
            <li key={i} className={`disp-objection ${shown ? 'is-shown' : ''}`}>
              <div className="disp-label">Objection {i + 1}</div>
              <p className="disp-claim">It seems that <RichText text={o.claim} blockId={`${blockId}.o${i}`} /></p>
              {!shown ? (
                <div className="disp-judge">
                  <span>Does this objection hold?</span>
                  <button type="button" className="sc-btn sc-btn-ghost" onClick={() => judge(i, 'holds')}>It holds</button>
                  <button type="button" className="sc-btn sc-btn-ghost" onClick={() => judge(i, 'fails')}>It does not</button>
                </div>
              ) : (
                <div className={`disp-reply ${v === 'fails' ? 'judged-right' : v === 'holds' ? 'judged-wrong' : ''}`}>
                  {v && <div className="disp-verdict">{v === 'fails' ? '✓ Rightly judged — the objection does not hold.' : '✗ The objection seemed strong, but it does not hold.'}</div>}
                  <div className="disp-label">Reply to objection {i + 1}</div>
                  <p><RichText text={o.reply} blockId={`${blockId}.r${i}`} /></p>
                  {o.code && <CodeBlock code={o.code} language={o.language ?? quaestio.language ?? 'python'} />}
                </div>
              )}
            </li>
          )
        })}
      </ol>

      <div className="disp-sedcontra">
        <div className="disp-label">Sed contra</div>
        <p><RichText text={quaestio.sedContra} blockId={`${blockId}.sc`} /></p>
      </div>

      {allJudged ? (
        <div className="disp-respondeo">
          <div className="disp-label">Respondeo — I answer that</div>
          {quaestio.respondeo.map((para, i) => <p key={i} className={i === 0 ? 'has-initial' : ''}><RichText text={para} blockId={`${blockId}.a${i}`} /></p>)}
          {quaestio.code && <CodeBlock code={quaestio.code} language={quaestio.language ?? 'python'} showLineNumbers />}
          {judged > 0 && <p className="disp-score">You judged {correct} of {quaestio.objections.length} objections correctly{correct === quaestio.objections.length ? '. Bene disputatum.' : '.'}</p>}
        </div>
      ) : (
        <div className="disp-locked">
          <p>The respondeo opens once every objection has been weighed ({judged}/{quaestio.objections.length}).</p>
          <button type="button" className="sc-btn sc-btn-ghost" onClick={() => setRevealAll(true)}>Skip the disputation and read the answer</button>
        </div>
      )}
    </section>
  )
}
