'use client'
import { useState } from 'react'
import type { Quaestio } from '@/content/types'
import { CodeBlock } from './CodeBlock'
import { RichText } from './Term'
import { useProgress } from '@/hooks/useProgress'

interface Props { quaestio: Quaestio; id: string; blockId?: string }

/**
 * A question beginners often ask, answered plainly, followed by the common mix-ups around it.
 * Each mix-up hides its explanation until the learner has had a moment to think about it.
 * Opening every explanation counts the question as done on the progress page.
 */
export function CommonQuestion({ quaestio, id, blockId = 'q' }: Props) {
  const [opened, setOpened] = useState<Set<number>>(() => new Set())
  const { markExerciseDone, isExerciseDone } = useProgress()
  const done = isExerciseDone(id)
  const lang = quaestio.language ?? 'python'

  const toggle = (i: number) => {
    const next = new Set(opened)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    setOpened(next)
    if (next.size === quaestio.objections.length) markExerciseDone(id)
  }

  return (
    <section className={`faq ${done ? 'is-done' : ''}`} aria-labelledby={`${blockId}-q`}>
      <p className="faq-kicker">Common question{done && <span className="faq-done"> · reviewed</span>}</p>
      <h2 id={`${blockId}-q`} className="faq-question">{quaestio.question}</h2>

      <div className="faq-answer">
        {quaestio.respondeo.map((para, i) => <p key={i}><RichText text={para} blockId={`${blockId}.a${i}`} /></p>)}
        {quaestio.code && <CodeBlock code={quaestio.code} language={lang} showLineNumbers />}
        <p className="faq-source"><span>Source:</span> <RichText text={quaestio.sedContra} blockId={`${blockId}.sc`} /></p>
      </div>

      <h3 className="faq-subhead">Common mix-ups</h3>
      <p className="faq-hint">Each of these sounds reasonable. Think about why it is wrong, then open the explanation.</p>
      <ul className="faq-mixups">
        {quaestio.objections.map((o, i) => {
          const isOpen = opened.has(i)
          return (
            <li key={i} className={`mixup ${isOpen ? 'is-open' : ''}`}>
              <p className="mixup-claim"><RichText text={o.claim} blockId={`${blockId}.o${i}`} /></p>
              <button type="button" className="btn btn-small btn-quiet" aria-expanded={isOpen} onClick={() => toggle(i)}>
                {isOpen ? 'Hide explanation' : 'Why is this wrong?'}
              </button>
              {isOpen && (
                <div className="mixup-reply">
                  <p><RichText text={o.reply} blockId={`${blockId}.r${i}`} /></p>
                  {o.code && <CodeBlock code={o.code} language={o.language ?? lang} />}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
