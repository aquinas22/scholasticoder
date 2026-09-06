'use client'

/** Runs JavaScript inside a throwaway Web Worker so infinite loops can be killed and the page never freezes. */

export interface JsRunHandlers {
  onStdout?: (text: string) => void
  onStderr?: (text: string) => void
}

export interface JsTestResult { name: string; passed: boolean; message: string }
export interface JsRunResult { ok: boolean; error?: string; ms: number; stopped?: boolean; tests?: JsTestResult[] }
export interface JsTestCase { name: string; check: string }

const PRELUDE = `
const __fmt = (v, depth = 0) => {
  if (typeof v === 'string') return depth === 0 ? v : JSON.stringify(v)
  if (v === null) return 'null'
  if (v === undefined) return 'undefined'
  if (typeof v === 'function') return '[Function: ' + (v.name || 'anonymous') + ']'
  if (typeof v === 'symbol') return v.toString()
  if (typeof v === 'bigint') return v + 'n'
  if (v instanceof Error) return v.stack || String(v)
  if (v instanceof Date) return v.toISOString()
  if (v instanceof RegExp) return String(v)
  if (v instanceof Map) return 'Map(' + v.size + ') {' + [...v].map(([k, x]) => ' ' + __fmt(k, depth + 1) + ' => ' + __fmt(x, depth + 1)).join(',') + ' }'
  if (v instanceof Set) return 'Set(' + v.size + ') {' + [...v].map(x => ' ' + __fmt(x, depth + 1)).join(',') + ' }'
  if (Array.isArray(v)) { if (depth > 2) return '[Array]'; return '[' + v.map(x => ' ' + __fmt(x, depth + 1)).join(',') + (v.length ? ' ' : '') + ']' }
  if (typeof v === 'object') {
    if (depth > 2) return '[Object]'
    const keys = Object.keys(v)
    if (!keys.length) return '{}'
    const name = v.constructor && v.constructor.name !== 'Object' ? v.constructor.name + ' ' : ''
    return name + '{' + keys.map(k => ' ' + k + ': ' + __fmt(v[k], depth + 1)).join(',') + ' }'
  }
  return String(v)
}
let __captured = ''
const __send = (kind, args) => { const text = args.map(a => __fmt(a)).join(' ') + '\\n'; if (kind === 'stdout') __captured += text; postMessage({ kind, text }) }
const console = {
  log: (...a) => __send('stdout', a), info: (...a) => __send('stdout', a), debug: (...a) => __send('stdout', a),
  warn: (...a) => __send('stderr', a), error: (...a) => __send('stderr', a),
  table: (...a) => __send('stdout', a), dir: (...a) => __send('stdout', a),
  assert: (c, ...a) => { if (!c) __send('stderr', ['Assertion failed:', ...a]) },
  group: () => {}, groupEnd: () => {}, time: () => {}, timeEnd: () => {}, clear: () => {},
}
const require = name => { throw new Error("require('" + name + "') is not available in the browser sandbox. Node-only modules such as fs, http, and path need to run locally with Node.js.") }
const process = { env: {}, argv: ['node', 'script.js'], platform: 'browser', exit: () => { throw new Error('process.exit() called') }, stdout: { write: s => postMessage({ kind: 'stdout', text: String(s) }) } }
const alert = (...a) => __send('stdout', ['[alert]', ...a])
const prompt = () => null
self.onerror = (msg, src, line, col, err) => { postMessage({ kind: 'error', text: err && err.stack ? err.stack : String(msg) }); return true }
self.onunhandledrejection = e => { postMessage({ kind: 'error', text: 'Uncaught (in promise) ' + (e.reason && e.reason.stack ? e.reason.stack : String(e.reason)) }) }
`

function cleanStack(text: string) {
  return text
    .split('\n')
    .filter(l => !/blob:|__sc_main|at __/.test(l))
    .join('\n')
    .trim()
}

export function runJavaScript(code: string, handlers: JsRunHandlers = {}, timeoutMs = 8000, tests?: JsTestCase[], originalSource?: string): { promise: Promise<JsRunResult>; stop: () => void } {
  // Checks run inside the same function scope as the learner's code so their const/let/function declarations are visible.
  const testBlock = tests && tests.length
    ? `\n;{ const _out = __captured; const _src = ${JSON.stringify(originalSource ?? code)}; const __results = [];\n` +
      tests.map(t => `try { await (async () => { ${t.check}\n })(); __results.push({ name: ${JSON.stringify(t.name)}, passed: true, message: '' }) } catch (e) { __results.push({ name: ${JSON.stringify(t.name)}, passed: false, message: e && e.message ? String(e.message) : String(e) }) }\n`).join('') +
      `postMessage({ kind: 'tests', results: __results }) }\n`
    : ''
  const source = `${PRELUDE}\nconst assert = (cond, msg) => { if (!cond) throw new Error(msg || 'Assertion failed') }\nassert.equal = (a, b, msg) => { if (a !== b) throw new Error(msg || ('expected ' + __fmt(b, 1) + ' but got ' + __fmt(a, 1))) }\nassert.deepEqual = (a, b, msg) => { const x = JSON.stringify(a), y = JSON.stringify(b); if (x !== y) throw new Error(msg || ('expected ' + y + ' but got ' + x)) }\n;(async function __sc_main() {\n${code}\n${testBlock}})().then(() => postMessage({ kind: 'done' })).catch(err => postMessage({ kind: 'error', text: err && err.stack ? err.stack : String(err) }))`
  const blob = new Blob([source], { type: 'text/javascript' })
  const url = URL.createObjectURL(blob)
  let worker: Worker | null = null
  let finished = false
  let resolveFn: (r: JsRunResult) => void = () => {}
  const started = performance.now()
  const promise = new Promise<JsRunResult>(resolve => { resolveFn = resolve })
  const finish = (r: JsRunResult) => {
    if (finished) return
    finished = true
    worker?.terminate()
    URL.revokeObjectURL(url)
    resolveFn(r)
  }
  try {
    worker = new Worker(url)
  } catch (err) {
    finish({ ok: false, error: String((err as Error).message), ms: 0 })
    return { promise, stop: () => {} }
  }
  let testResults: JsTestResult[] | undefined
  worker.onmessage = e => {
    const { kind, text, results } = e.data as { kind: string; text?: string; results?: JsTestResult[] }
    if (kind === 'stdout') handlers.onStdout?.(text ?? '')
    else if (kind === 'stderr') handlers.onStderr?.(text ?? '')
    else if (kind === 'tests') testResults = results
    else if (kind === 'error') finish({ ok: false, error: cleanStack(text ?? 'Error'), ms: Math.round(performance.now() - started), tests: tests ? (testResults ?? tests.map(t => ({ name: t.name, passed: false, message: 'Your code threw an error before this check could run.' }))) : undefined })
    else if (kind === 'done') finish({ ok: true, ms: Math.round(performance.now() - started), tests: testResults })
  }
  worker.onerror = e => {
    // Syntax errors surface here, before any code runs.
    finish({ ok: false, error: cleanStack(e.message || 'SyntaxError'), ms: Math.round(performance.now() - started) })
  }
  const timer = setTimeout(() => finish({ ok: false, stopped: true, error: `Stopped after ${timeoutMs / 1000}s. Is there an infinite loop?`, ms: timeoutMs }), timeoutMs)
  promise.then(() => clearTimeout(timer))
  return { promise, stop: () => finish({ ok: false, stopped: true, error: 'Stopped.', ms: Math.round(performance.now() - started) }) }
}
