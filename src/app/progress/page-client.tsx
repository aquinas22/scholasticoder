'use client'
import Link from 'next/link'
import { languages, totalLessons, totalExercises, countExercises } from '@/content'
import { challenges } from '@/content/challenges'
import { allQuaestiones } from '@/content'
import { useProgress } from '@/hooks/useProgress'
import { ProgressBar } from '@/components/ProgressBar'
import { useLastVisited } from '@/hooks/useLastVisited'
import { LangIcon } from '@/components/LangIcon'

export default function ProgressClient() {
  const { progress, exercisesDone, loaded } = useProgress()
  const last = useLastVisited()
  const lessonsDone = Object.values(progress).reduce((n, p) => n + p.completedLessons.length, 0)
  const challengesDone = challenges.filter(c => exercisesDone.includes(`challenge/${c.slug}`)).length
  const exercisesSolved = exercisesDone.filter(id => !id.startsWith('challenge/') && !id.startsWith('quiz:') && !id.startsWith('quaestio:')).length
  const quizzesAnswered = exercisesDone.filter(id => id.startsWith('quiz:')).length
  const reviewed = exercisesDone.filter(id => id.startsWith('quaestio:')).length
  const started = languages.filter(l => (progress[l.slug]?.completedLessons.length ?? 0) > 0 || exercisesDone.some(id => id.startsWith(l.slug + '/')))
  const untouched = languages.filter(l => !started.includes(l))

  const resetAll = () => {
    if (!confirm('Erase all progress stored in this browser? This cannot be undone.')) return
    try { localStorage.removeItem('scholasticoder_progress'); localStorage.removeItem('scholasticoder_exercises'); localStorage.removeItem('scholasticoder_last') } catch {}
    location.reload()
  }

  return (
    <main className="wrap page">
      <header className="page-head page-head-split">
        <div>
          <h1>Your progress</h1>
          <p>Saved in this browser only. Nothing is sent anywhere, so there is no account to make. Using another device or browser starts fresh.</p>
        </div>
        {last && (
          <Link href={last.href} className="continue-card">
            <span className="sc-lab-kicker">Continue where you left off</span>
            <strong>{last.title}</strong>
            <span>{last.language} →</span>
          </Link>
        )}
      </header>

      <div className="stat-row" aria-label="Totals">
        <div className="stat-tile"><strong>{loaded ? lessonsDone : '–'}</strong><span>of {totalLessons} lessons completed</span></div>
        <div className="stat-tile"><strong>{loaded ? exercisesSolved : '–'}</strong><span>of {totalExercises} exercises solved</span></div>
        <div className="stat-tile"><strong>{loaded ? challengesDone : '–'}</strong><span>of {challenges.length} challenges solved</span></div>
        <div className="stat-tile"><strong>{loaded ? reviewed : '–'}</strong><span>of {allQuaestiones.length} common questions reviewed</span></div>
        <div className="stat-tile"><strong>{loaded ? quizzesAnswered : '–'}</strong><span>quick checks answered</span></div>
        <div className="stat-tile"><strong>{loaded ? started.length : '–'}</strong><span>of {languages.length} courses started</span></div>
      </div>

      {started.length > 0 && (
        <section className="progress-section">
          <h2>Courses in progress</h2>
          <div className="progress-list">
            {started.map(l => {
              const done = progress[l.slug]?.completedLessons.length ?? 0
              const ex = countExercises(l)
              const exDone = exercisesDone.filter(id => id.startsWith(l.slug + '/')).length
              const pct = Math.round((done / l.lessons.length) * 100)
              const nextLesson = l.lessons.find(ls => !progress[l.slug]?.completedLessons.includes(ls.slug))
              return (
                <div key={l.slug} className="progress-row">
                  <LangIcon language={l} />
                  <div className="progress-row-body">
                    <div className="progress-row-head">
                      <Link href={`/languages/${l.slug}`}>{l.name}</Link>
                      <span>{done}/{l.lessons.length} lessons{ex > 0 ? ` · ${exDone}/${ex} exercises` : ''}</span>
                    </div>
                    <ProgressBar value={pct} height={6} label={`${l.name} progress`} />
                    {nextLesson && <Link className="progress-next" href={`/languages/${l.slug}/lessons/${nextLesson.slug}`}>Next: {nextLesson.title} →</Link>}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      <section className="progress-section">
        <h2>Python challenges</h2>
        <div className="ladder-strip" aria-label="Challenge completion">
          {challenges.map((c, i) => {
            const done = exercisesDone.includes(`challenge/${c.slug}`)
            return <Link key={c.slug} href={`/challenges/${c.slug}`} className={`ladder-rung ${done ? 'is-done' : ''}`} title={c.title}>{done ? '✓' : i + 1}</Link>
          })}
        </div>
      </section>

      {untouched.length > 0 && (
        <section className="progress-section">
          <h2>Not started yet</h2>
          <div className="untouched-list">{untouched.map(l => <Link key={l.slug} href={`/languages/${l.slug}`}><LangIcon language={l} size="sm" />{l.name}</Link>)}</div>
        </section>
      )}

      <footer className="progress-footer">
        <button type="button" className="btn btn-quiet" onClick={resetAll}>Erase all progress in this browser</button>
      </footer>
    </main>
  )
}
