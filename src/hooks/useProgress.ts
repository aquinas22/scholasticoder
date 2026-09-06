'use client'
import { useSyncExternalStore, useCallback } from 'react'

interface LanguageProgress {
  completedLessons: string[]
}

interface Progress {
  [languageSlug: string]: LanguageProgress
}

const STORAGE_KEY = 'scholasticoder_progress'
const EXERCISE_KEY = 'scholasticoder_exercises'

/* A tiny external store so every component sees the same progress and updates together. */
let progress: Progress = {}
let exercises: string[] = []
let hydrated = false
const listeners = new Set<() => void>()
let snapshot = { progress, exercises, loaded: false }

function load() {
  if (hydrated || typeof window === 'undefined') return
  hydrated = true
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) progress = JSON.parse(stored)
    const ex = localStorage.getItem(EXERCISE_KEY)
    if (ex) exercises = JSON.parse(ex)
  } catch {
    // localStorage unavailable (private browsing, blocked storage)
  }
  snapshot = { progress, exercises, loaded: true }
}

function commit() {
  snapshot = { progress, exercises, loaded: true }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    localStorage.setItem(EXERCISE_KEY, JSON.stringify(exercises))
  } catch {}
  listeners.forEach(fn => fn())
}

function subscribe(fn: () => void) {
  listeners.add(fn)
  return () => { listeners.delete(fn) }
}

function getSnapshot() {
  load()
  return snapshot
}

const serverSnapshot = { progress: {} as Progress, exercises: [] as string[], loaded: false }

export function useProgress() {
  const state = useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot)

  const markComplete = useCallback((languageSlug: string, lessonSlug: string) => {
    const lang = progress[languageSlug] ?? { completedLessons: [] }
    if (lang.completedLessons.includes(lessonSlug)) return
    progress = { ...progress, [languageSlug]: { completedLessons: [...lang.completedLessons, lessonSlug] } }
    commit()
  }, [])

  const markIncomplete = useCallback((languageSlug: string, lessonSlug: string) => {
    const lang = progress[languageSlug]
    if (!lang) return
    progress = { ...progress, [languageSlug]: { completedLessons: lang.completedLessons.filter(s => s !== lessonSlug) } }
    commit()
  }, [])

  const isComplete = useCallback((languageSlug: string, lessonSlug: string): boolean => {
    return state.progress[languageSlug]?.completedLessons.includes(lessonSlug) ?? false
  }, [state.progress])

  const getLangProgress = useCallback((languageSlug: string, totalLessons: number) => {
    const completed = state.progress[languageSlug]?.completedLessons.length ?? 0
    return {
      completed,
      total: totalLessons,
      percentage: totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0,
    }
  }, [state.progress])

  /** Exercises and challenges are keyed by a stable id such as `python/variables/0` or `challenge/fizzbuzz`. */
  const markExerciseDone = useCallback((id: string) => {
    if (exercises.includes(id)) return
    exercises = [...exercises, id]
    commit()
  }, [])

  const isExerciseDone = useCallback((id: string) => state.exercises.includes(id), [state.exercises])

  const countExercises = useCallback((prefix: string) => state.exercises.filter(id => id.startsWith(prefix)).length, [state.exercises])

  return {
    progress: state.progress,
    loaded: state.loaded,
    markComplete,
    markIncomplete,
    isComplete,
    getLangProgress,
    markExerciseDone,
    isExerciseDone,
    countExercises,
    exercisesDone: state.exercises,
  }
}
