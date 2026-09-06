'use client'
import { useState } from 'react'
import type { Quiz as QuizData } from '@/content/types'
import { CodeBlock } from './CodeBlock'

interface Props { question: string; quiz: QuizData; id?: string }

export function Quiz({ question, quiz }: Props) {
  const [picked, setPicked] = useState<number | null>(null)
  const choice = picked != null ? quiz.choices[picked] : null
  return (
    <section className="sc-quiz" aria-label="Quick check">
      <span className="sc-lab-kicker">Quick check</span>
      <p className="sc-quiz-q">{question}</p>
      {quiz.code && <div className="sc-quiz-code"><CodeBlock code={quiz.code} language={quiz.language ?? 'python'} /></div>}
      <div className="sc-quiz-choices" role="radiogroup" aria-label="Answers">
        {quiz.choices.map((c, i) => {
          const state = picked == null ? '' : i === picked ? (c.correct ? 'is-correct' : 'is-wrong') : c.correct ? 'is-reveal' : ''
          return (
            <button key={i} type="button" role="radio" aria-checked={picked === i} className={`sc-quiz-choice ${state}`} onClick={() => setPicked(i)} disabled={picked != null && !!choice?.correct}>
              <span className="sc-quiz-letter">{String.fromCharCode(65 + i)}</span>
              <span>{c.text}</span>
            </button>
          )
        })}
      </div>
      {choice && (
        <div className={`sc-quiz-feedback ${choice.correct ? 'ok' : 'no'}`}>
          <strong>{choice.correct ? 'Correct.' : 'Not quite.'}</strong> {choice.explanation ?? (choice.correct ? '' : 'Try another answer.')}
        </div>
      )}
    </section>
  )
}
