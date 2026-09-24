'use client'

import Link from 'next/link'
import { languages, totalLessons, totalExercises, getLanguage } from '@/content'
import { CodeLab } from '@/components/CodeLab'
import { challenges } from '@/content/challenges'
import { LanguageCard } from '@/components/LanguageCard'
import { LangIcon } from '@/components/LangIcon'
import { useProgress } from '@/hooks/useProgress'
import { useLastVisited } from '@/hooks/useLastVisited'
import { COURSE_GROUPS } from '@/lib/categories'

const STARTERS = [
  { slug: 'python', lesson: 'hello-world', why: 'The usual first language. Readable, useful everywhere, and every example runs right here.' },
  { slug: 'html', lesson: 'first-page', why: 'Make a web page. Pair it with CSS and you can build a real site.' },
  { slug: 'javascript', lesson: 'hello-world', why: 'Make web pages interactive. Runs in every browser.' },
  { slug: 'sql', lesson: 'tables-and-select', why: 'Ask questions of data. Queries run on a sample database in your browser.' },
]

const HOME_DEMO = `# This is real Python, running in your browser.
# Change the list, then press Run (or Ctrl+Enter).
groceries = ["apples", "bread", "milk", "apples", "eggs", "milk", "apples"]

counts = {}
for item in groceries:
    counts[item] = counts.get(item, 0) + 1

for item, n in sorted(counts.items(), key=lambda pair: -pair[1]):
    print(f"{item:<7} {'#' * n} {n}")`

export default function HomePage() {
  const { getLangProgress } = useProgress()
  const last = useLastVisited()

  return (
    <main className="home">
      <section className="hero wrap">
        <div className="hero-text">
          <p className="kicker">Free and open source</p>
          <h1>Learn to code, one clear step at a time.</h1>
          <p className="hero-lede">Short lessons with examples you can run and change right in your browser. Practise with exercises that check your answer. No account, no installs, no paywall.</p>
          <div className="actions">
            {last ? (
              <>
                <Link href={last.href} className="btn btn-primary">Continue: {last.title} <span aria-hidden>→</span></Link>
                <Link href="/languages" className="btn btn-secondary">Browse courses</Link>
              </>
            ) : (
              <>
                <Link href="/languages/python/lessons/hello-world" className="btn btn-primary">Start with Python <span aria-hidden>→</span></Link>
                <Link href="/languages" className="btn btn-secondary">Browse all courses</Link>
              </>
            )}
          </div>
          <ul className="hero-facts" aria-label="What is here">
            <li><strong>{languages.length}</strong> courses</li>
            <li><strong>{totalLessons}</strong> lessons</li>
            <li><strong>{totalExercises + challenges.length}</strong> checked exercises</li>
          </ul>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="start-here">
        <div className="section-head">
          <h2 id="start-here">New to programming? Start here.</h2>
          <p>Pick one course and follow it in order. Each lesson takes about 10 to 20 minutes.</p>
        </div>
        <div className="starter-grid">
          {STARTERS.map(s => {
            const lang = getLanguage(s.slug)
            if (!lang) return null
            const prog = getLangProgress(lang.slug, lang.lessons.length)
            return (
              <article key={s.slug} className="starter-card">
                <div className="starter-card-head">
                  <LangIcon language={lang} />
                  <h3><Link href={`/languages/${lang.slug}`}>{lang.name}</Link></h3>
                </div>
                <p>{s.why}</p>
                <Link className="text-link" href={`/languages/${lang.slug}/lessons/${s.lesson}`}>
                  {prog.completed > 0 ? `Continue (${prog.completed}/${prog.total} done)` : 'Start lesson 1'} <span aria-hidden>→</span>
                </Link>
              </article>
            )
          })}
        </div>
      </section>

      <section className="wrap section" aria-labelledby="try-it">
        <div className="section-head">
          <h2 id="try-it">Try it now</h2>
          <p>This is what every lesson looks like: real code you can edit and run. Python loads the first time you press Run, which takes a few seconds.</p>
        </div>
        <CodeLab runtime="python" code={HOME_DEMO} minLines={10} />
      </section>

      <section className="wrap section" aria-labelledby="how">
        <div className="section-head">
          <h2 id="how">How the lessons work</h2>
          <p>Every lesson follows the same simple pattern, so you always know what comes next. <Link href="/method" className="text-link">More about the approach</Link></p>
        </div>
        <ol className="steps">
          <li><span className="step-num">1</span><div><h3>Read and run</h3><p>A short explanation, then an example you can run and change. Underlined words open a quick definition.</p></div></li>
          <li><span className="step-num">2</span><div><h3>Clear up common mix-ups</h3><p>Each lesson answers the question beginners most often get wrong, with the reasoning spelled out.</p></div></li>
          <li><span className="step-num">3</span><div><h3>Practise and check</h3><p>Exercises tell you which part passed and which did not. Hints and a solution are there if you get stuck.</p></div></li>
        </ol>
      </section>

      <section className="wrap section" aria-labelledby="all-courses">
        <div className="section-head">
          <h2 id="all-courses">All courses</h2>
          <p>Grouped by what they are for. Beginners: pick one from the first row.</p>
        </div>
        {COURSE_GROUPS.map(group => (
          <div key={group.id} className="course-group">
            <h3 className="course-group-title">{group.label} <span>{group.blurb}</span></h3>
            <div className="course-grid">
              {group.slugs.map(slug => {
                const language = getLanguage(slug)
                if (!language) return null
                const progress = getLangProgress(language.slug, language.lessons.length)
                return <LanguageCard key={slug} language={language} completed={progress.completed} />
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
