'use client'
import { useSyncExternalStore } from 'react'

export interface LastVisited { href: string; title: string; language: string }

const KEY = 'scholasticoder_last'
const listeners = new Set<() => void>()
let cached: LastVisited | null | undefined

function read(): LastVisited | null {
  if (cached !== undefined) return cached
  try {
    const raw = localStorage.getItem(KEY)
    cached = raw ? (JSON.parse(raw) as LastVisited) : null
  } catch {
    cached = null
  }
  return cached
}

export function recordLastVisited(entry: LastVisited) {
  cached = entry
  try { localStorage.setItem(KEY, JSON.stringify(entry)) } catch {}
  listeners.forEach(fn => fn())
}

function subscribe(fn: () => void) {
  listeners.add(fn)
  return () => { listeners.delete(fn) }
}

/** The most recently opened lesson, or null. */
export function useLastVisited(): LastVisited | null {
  return useSyncExternalStore(subscribe, read, () => null)
}
