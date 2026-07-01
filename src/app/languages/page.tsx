'use client'
import { languages } from '@/content'
import { LanguageCard } from '@/components/LanguageCard'
import { useProgress } from '@/hooks/useProgress'

export default function LanguagesPage() {
  const { getLangProgress } = useProgress()

  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1
        style={{
          fontFamily: 'var(--font-syne, sans-serif)',
          fontSize: '2rem',
          fontWeight: 800,
          color: 'var(--text)',
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em',
        }}
      >
        All Languages
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        12 languages, 0 paywalls.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1rem',
        }}
      >
        {languages.map(lang => {
          const prog = getLangProgress(lang.slug, lang.lessons.length)
          return (
            <LanguageCard key={lang.slug} language={lang} completed={prog.completed} />
          )
        })}
      </div>
    </main>
  )
}
