'use client'
import { useState, useEffect, useCallback } from 'react'

interface LanguageProgress {
  completedLessons: string[]
}

interface Progress {
  [languageSlug: string]: LanguageProgress
}

const STORAGE_KEY = 'scholasticoder_progress'

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setProgress(JSON.parse(stored))
    } catch {
      // localStorage unavailable (SSR / private browsing)
    }
    setLoaded(true)
  }, [])

  const markComplete = useCallback((languageSlug: string, lessonSlug: string) => {
    setProgress(prev => {
      const langProgress = prev[languageSlug] ?? { completedLessons: [] }
      if (langProgress.completedLessons.includes(lessonSlug)) return prev
      const next: Progress = {
        ...prev,
        [languageSlug]: {
          completedLessons: [...langProgress.completedLessons, lessonSlug],
        },
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }, [])

  const markIncomplete = useCallback((languageSlug: string, lessonSlug: string) => {
    setProgress(prev => {
      const langProgress = prev[languageSlug]
      if (!langProgress) return prev
      const next: Progress = {
        ...prev,
        [languageSlug]: {
          completedLessons: langProgress.completedLessons.filter(s => s !== lessonSlug),
        },
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }, [])

  const isComplete = useCallback((languageSlug: string, lessonSlug: string): boolean => {
    return progress[languageSlug]?.completedLessons.includes(lessonSlug) ?? false
  }, [progress])

  const getLangProgress = useCallback((languageSlug: string, totalLessons: number) => {
    const completed = progress[languageSlug]?.completedLessons.length ?? 0
    return {
      completed,
      total: totalLessons,
      percentage: totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0,
    }
  }, [progress])

  return { progress, loaded, markComplete, markIncomplete, isComplete, getLangProgress }
}
