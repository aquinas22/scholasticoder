'use client'
import { useSyncExternalStore } from 'react'

export type PythonStatus = 'idle' | 'loading' | 'ready' | 'running' | 'error'

export interface TestCase { name: string; check: string }
export interface TestResult { name: string; passed: boolean; message: string }

export interface RunHandlers {
  onStdout?: (text: string) => void
  onStderr?: (text: string) => void
  onStatus?: (text: string) => void
}

export interface RunResult {
  ok: boolean
  error?: string
  tests?: TestResult[]
  ms: number
  stopped?: boolean
}

interface Pending extends RunHandlers {
  resolve: (r: RunResult) => void
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

class PythonRuntime {
  private worker: Worker | null = null
  private status: PythonStatus = 'idle'
  private statusText = ''
  private version = ''
  private readyPromise: Promise<void> | null = null
  private readyResolve: (() => void) | null = null
  private readyReject: ((e: Error) => void) | null = null
  private pending = new Map<string, Pending>()
  private queue: Array<() => void> = []
  private listeners = new Set<() => void>()
  private snapshot = { status: 'idle' as PythonStatus, statusText: '', version: '' }
  private seq = 0

  subscribe = (fn: () => void) => { this.listeners.add(fn); return () => { this.listeners.delete(fn) } }
  getSnapshot = () => this.snapshot

  private emit(status: PythonStatus, statusText = this.statusText) {
    this.status = status
    this.statusText = statusText
    this.snapshot = { status, statusText, version: this.version }
    this.listeners.forEach(fn => fn())
  }

  /** Start downloading the runtime. Safe to call repeatedly. */
  warm(): Promise<void> {
    if (this.readyPromise) return this.readyPromise
    if (typeof window === 'undefined') return Promise.resolve()
    this.readyPromise = new Promise<void>((resolve, reject) => {
      this.readyResolve = resolve
      this.readyReject = reject
    })
    this.emit('loading', 'Starting Python…')
    try {
      const worker = new Worker(`${BASE_PATH}/workers/python-worker.js`)
      this.worker = worker
      worker.onmessage = e => this.handle(e.data)
      worker.onerror = e => {
        this.emit('error', `Could not start Python: ${e.message || 'worker error'}`)
        this.readyReject?.(new Error(e.message || 'worker error'))
      }
      worker.postMessage({ type: 'init' })
    } catch (err) {
      this.emit('error', `Could not start Python: ${(err as Error).message}`)
      this.readyReject?.(err as Error)
    }
    return this.readyPromise
  }

  private handle(msg: { type: string; id?: string; text?: string; version?: string; error?: string; ok?: boolean; tests?: TestResult[]; ms?: number }) {
    switch (msg.type) {
      case 'status':
        if (msg.id && this.pending.get(msg.id)?.onStatus) this.pending.get(msg.id)!.onStatus!(msg.text ?? '')
        else if (this.status === 'loading') this.emit('loading', msg.text ?? '')
        break
      case 'ready':
        this.version = msg.version ?? ''
        this.emit('ready', `Python ${this.version}`)
        this.readyResolve?.()
        break
      case 'fatal':
        this.emit('error', msg.error ?? 'Python failed to start')
        this.readyReject?.(new Error(msg.error))
        break
      case 'stdout':
        if (msg.id) this.pending.get(msg.id)?.onStdout?.(msg.text ?? '')
        break
      case 'stderr':
        if (msg.id) this.pending.get(msg.id)?.onStderr?.(msg.text ?? '')
        break
      case 'done': {
        if (!msg.id) break
        const p = this.pending.get(msg.id)
        this.pending.delete(msg.id)
        p?.resolve({ ok: !!msg.ok, error: msg.error, tests: msg.tests, ms: msg.ms ?? 0 })
        this.emit('ready')
        this.drain()
        break
      }
    }
  }

  private drain() {
    if (this.status !== 'ready') return
    const next = this.queue.shift()
    if (next) next()
  }

  /** Run a program. Resolves when it finishes (or is stopped). */
  run(code: string, opts: RunHandlers & { stdin?: string; tests?: TestCase[] } = {}): Promise<RunResult> {
    return new Promise<RunResult>(resolve => {
      const start = () => {
        this.warm().then(() => {
          if (this.status !== 'ready') { this.queue.push(start); return }
          const id = `run-${++this.seq}`
          this.pending.set(id, { ...opts, resolve })
          this.emit('running')
          this.worker!.postMessage({ type: 'run', id, code, stdin: opts.stdin ?? '', tests: opts.tests })
        }).catch(err => resolve({ ok: false, error: `Python could not start: ${(err as Error).message}`, ms: 0 }))
      }
      start()
    })
  }

  /** Kill the current program. The runtime restarts in the background (cached, so it's quick). */
  stop() {
    if (!this.worker) return
    this.worker.terminate()
    this.worker = null
    this.readyPromise = null
    for (const p of this.pending.values()) p.resolve({ ok: false, stopped: true, error: 'Stopped.', ms: 0 })
    this.pending.clear()
    this.emit('idle', '')
    this.warm().then(() => this.drain()).catch(() => {})
  }

  isReady() { return this.status === 'ready' }
}

export const pythonRuntime = new PythonRuntime()

const serverSnapshot = { status: 'idle' as PythonStatus, statusText: '', version: '' }

export function usePythonRuntime() {
  return useSyncExternalStore(pythonRuntime.subscribe, pythonRuntime.getSnapshot, () => serverSnapshot)
}
