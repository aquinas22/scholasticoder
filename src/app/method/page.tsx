import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Method — ScholastiCoder',
  description: 'How ScholastiCoder teaches: lectio, quaestio, disputatio and exercitatio, after the manner of the medieval schools and the Summa Theologiae.',
}

const STEPS = [
  { mark: 'L', title: 'Lectio', latin: 'the reading', copy: 'Each lesson opens with a careful reading: definitions before abstractions, every idea shown in real code you can run and change on the spot. Key words are underlined; click one for a definition and an example.' },
  { mark: 'Q', title: 'Quaestio', latin: 'the question', copy: 'The lesson then poses its central question in the scholastic form — "Whether a Python variable has a type?" — because a truth that has not been questioned is only half understood.' },
  { mark: 'D', title: 'Disputatio', latin: 'the disputation', copy: 'Objections are stated at full strength: the plausible beliefs a learner actually holds. You judge each one before the reply is revealed. Then the sed contra names an authority, and the respondeo gives the teaching itself, followed by the reply to every objection.' },
  { mark: 'E', title: 'Exercitatio', latin: 'the practice', copy: 'Understanding is proved by doing. Graded exercises run in your browser with hints and a reference solution; the checks tell you exactly which expectation was missed.' },
  { mark: 'X', title: 'Examen', latin: 'the examination', copy: 'Short questions at the end test whether the idea has taken. Progress is kept on your device; nothing is sent anywhere.' },
]

export default function MethodPage() {
  return (
    <main className="section-wrap method-shell">
      <header className="method-head">
        <p className="eyebrow"><span>M</span> The method</p>
        <h1>Taught in the manner of the schools.</h1>
        <p>The medieval universities taught by reading a text, raising a question, disputing the strongest objections, and only then giving the answer. Thomas Aquinas arranged the whole of the Summa Theologiae this way. ScholastiCoder borrows the structure because it fits how programming is actually learned: by confronting what you believe, finding where it fails, and rebuilding it on firmer ground.</p>
      </header>

      <ol className="method-steps">
        {STEPS.map(s => (
          <li key={s.mark}>
            <span className="lesson-part-mark" aria-hidden>{s.mark}</span>
            <div>
              <h2>{s.title} <small>{s.latin}</small></h2>
              <p>{s.copy}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="method-article">
        <h2>Anatomy of a quaestio</h2>
        <dl>
          <dt>Videtur quod — it seems that…</dt>
          <dd>The objections. Each is a real misconception, stated persuasively. If you have never held one of them, you are further along than most.</dd>
          <dt>Sed contra — on the contrary</dt>
          <dd>A short, authoritative statement pointing the other way: a line from the language reference, a standard, or a figure who settled the matter.</dd>
          <dt>Respondeo — I answer that</dt>
          <dd>The body of the teaching: what is actually true, why, and what follows from it in practice.</dd>
          <dt>Ad primum, ad secundum… — replies</dt>
          <dd>Each objection is answered on its own terms, usually with the code that demonstrates the point.</dd>
        </dl>
        <p>The learner judges each objection before seeing its reply. That small act of commitment is where the learning happens: being wrong about something you had to decide is memorable in a way that reading the right answer is not.</p>
      </section>

      <div className="hero-actions">
        <Link href="/languages/python/lessons/variables" className="button-primary">See a disputation <span>→</span></Link>
        <Link href="/glossary" className="button-ghost">Browse the glossary</Link>
      </div>
    </main>
  )
}
