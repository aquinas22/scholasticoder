import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How lessons work | ScholastiCoder',
  description: 'How ScholastiCoder lessons are put together: short explanations, code you can run, a common question answered plainly, exercises that check your work, and quick quizzes.',
}

const STEPS = [
  { title: 'Read a short explanation', copy: 'Each lesson starts with one idea, explained in plain words and shown in real code. Underlined words open a quick definition with an example, so you never have to leave the page to look something up.' },
  { title: 'Run the examples', copy: 'Python, JavaScript, TypeScript and SQL examples run right in your browser. Change a value and run it again. Breaking things on purpose is one of the fastest ways to learn how they work.' },
  { title: 'Clear up a common mix-up', copy: 'Most lessons answer one question beginners often get wrong, such as "Does a Python variable have a type?". You get the answer first, then a few reasonable-sounding beliefs about it. Think about why each is wrong before you open the explanation.' },
  { title: 'Practise with checked exercises', copy: 'Exercises run your code and tell you exactly which checks passed. Hints come one at a time, and a reference solution is there when you want to compare.' },
  { title: 'Check yourself', copy: 'A couple of quick multiple-choice questions at the end show whether the idea has stuck. Wrong answers explain what went wrong.' },
]

export default function MethodPage() {
  return (
    <main className="wrap page page-narrow">
      <header className="page-head">
        <h1>How lessons work</h1>
        <p>Every lesson follows the same pattern, so you can focus on the ideas instead of working out the page. The approach is simple: explain one thing clearly, let you try it straight away, and check that it stuck.</p>
      </header>

      <ol className="steps steps-vertical">
        {STEPS.map((s, i) => (
          <li key={s.title}>
            <span className="step-num">{i + 1}</span>
            <div>
              <h2>{s.title}</h2>
              <p>{s.copy}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="section-tight prose">
        <h2>A few tips</h2>
        <ul>
          <li><strong>Go in order.</strong> Lessons within a course build on each other. The previous and next links at the bottom of each lesson keep you on track.</li>
          <li><strong>Type the code yourself</strong> rather than only reading it. Small typos and their error messages are part of learning.</li>
          <li><strong>Little and often beats long sessions.</strong> One lesson a day adds up quickly.</li>
          <li><strong>Your progress is saved in this browser.</strong> Nothing is sent anywhere and there is no account. The <Link className="text-link" href="/progress">progress page</Link> shows where you are.</li>
        </ul>
      </section>

      <div className="actions">
        <Link href="/languages/python/lessons/hello-world" className="btn btn-primary">Start the first Python lesson <span aria-hidden>→</span></Link>
        <Link href="/questions" className="btn btn-secondary">Browse common questions</Link>
      </div>
    </main>
  )
}
