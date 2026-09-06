'use client'
import { SQL_SEED } from './sql-seed'

/** SQLite in the browser via sql.js, loaded from cdnjs on first use. */

export interface SqlTable { columns: string[]; rows: unknown[][]; statement: string }
export interface SqlNotice { text: string; statement: string }
export interface SqlTestCase { name: string; check: string }
export interface SqlTestResult { name: string; passed: boolean; message: string }
export interface SqlRunResult { ok: boolean; error?: string; tables: SqlTable[]; notices: SqlNotice[]; ms: number; tests?: SqlTestResult[] }

interface SqlJsStatement { step(): boolean; get(): unknown[]; getColumnNames(): string[]; free(): void; getSQL(): string }
interface SqlJsDatabase { iterateStatements(sql: string): Iterable<SqlJsStatement>; getRowsModified(): number; run(sql: string, params?: unknown[]): void; exec(sql: string): Array<{ columns: string[]; values: unknown[][] }>; close(): void }
interface SqlJsModule { Database: new () => SqlJsDatabase }

declare global {
  interface Window { initSqlJs?: (config: { locateFile: (f: string) => string }) => Promise<SqlJsModule> }
}

const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.13.0/'
let modulePromise: Promise<SqlJsModule> | null = null
let db: SqlJsDatabase | null = null
let dbScope = ''

function loadModule(): Promise<SqlJsModule> {
  if (modulePromise) return modulePromise
  modulePromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('no window'))
    const boot = () => window.initSqlJs!({ locateFile: f => CDN + f }).then(resolve, reject)
    if (window.initSqlJs) return boot()
    const script = document.createElement('script')
    script.src = CDN + 'sql-wasm.js'
    script.async = true
    script.onload = boot
    script.onerror = () => reject(new Error('Could not download the SQL engine. Check your connection and try again.'))
    document.head.appendChild(script)
  })
  return modulePromise
}

/** Get the shared database for a scope (typically the page path); a new scope gets a fresh seeded database. */
async function getDb(scope: string, reset = false): Promise<SqlJsDatabase> {
  const SQL = await loadModule()
  if (!db || dbScope !== scope || reset) {
    db?.close()
    db = new SQL.Database()
    db.run('PRAGMA foreign_keys = ON;')
    db.run(SQL_SEED)
    dbScope = scope
  }
  return db
}

export function resetSqlDatabase(scope: string) {
  return getDb(scope, true)
}

const ROW_LIMIT = 200

function failAll(tests: SqlTestCase[] | undefined, message: string): SqlTestResult[] | undefined {
  return tests?.map(t => ({ name: t.name, passed: false, message }))
}
const SEED_TABLES = new Set(['students', 'courses', 'enrollments', 'customers', 'products', 'orders', 'order_items', 'employees', 'daily_sales', 'accounts', 'users'])

/** Lessons often CREATE a table the sample database already provides; keep the sample data and say so. */
function tolerateSeedCreates(code: string, notices: SqlNotice[]) {
  return code.replace(/CREATE\s+TABLE\s+(?!IF\s+NOT\s+EXISTS)([A-Za-z_][A-Za-z0-9_]*)/gi, (whole, name: string) => {
    if (!SEED_TABLES.has(name.toLowerCase())) return whole
    notices.push({ text: `${name} already exists in the sample database, so CREATE TABLE was skipped and the sample rows were kept.`, statement: whole })
    return `CREATE TABLE IF NOT EXISTS ${name}`
  })
}

function dedupe(columns: string[]) {
  const seen = new Map<string, number>()
  return columns.map(c => {
    const n = seen.get(c) ?? 0
    seen.set(c, n + 1)
    return n === 0 ? c : `${c}_${n + 1}`
  })
}

function verb(sql: string) {
  const m = sql.trim().match(/^([A-Za-z]+)/)
  return (m?.[1] ?? 'Statement').toUpperCase()
}

export async function runSql(code: string, scope: string, tests?: SqlTestCase[]): Promise<SqlRunResult> {
  const started = performance.now()
  const tables: SqlTable[] = []
  const notices: SqlNotice[] = []
  let database: SqlJsDatabase
  try {
    database = await getDb(scope)
  } catch (err) {
    return { ok: false, error: (err as Error).message, tables, notices, ms: 0, tests: failAll(tests, 'The SQL engine could not be loaded.') }
  }
  let last: SqlTable | null = null
  const program = tolerateSeedCreates(code, notices)
  try {
    for (const stmt of database.iterateStatements(program)) {
      const sql = stmt.getSQL().trim()
      const columns = stmt.getColumnNames()
      const rows: unknown[][] = []
      let truncated = false
      while (stmt.step()) {
        if (rows.length >= ROW_LIMIT) { truncated = true; continue }
        rows.push(stmt.get())
      }
      stmt.free()
      if (columns.length > 0) {
        const table = { columns: dedupe(columns), rows, statement: sql }
        tables.push(table)
        last = table
        if (truncated) notices.push({ text: `Showing the first ${ROW_LIMIT} rows.`, statement: sql })
      } else {
        const v = verb(sql)
        const changed = database.getRowsModified()
        notices.push({ text: v === 'INSERT' || v === 'UPDATE' || v === 'DELETE' ? `${v}: ${changed} row${changed === 1 ? '' : 's'} affected` : `${v} ok`, statement: sql })
      }
    }
  } catch (err) {
    return { ok: false, error: String((err as Error).message ?? err), tables, notices, ms: Math.round(performance.now() - started), tests: failAll(tests, 'Your SQL raised an error before this check could run.') }
  }

  let testResults: SqlTestResult[] | undefined
  if (tests) {
    // Expose the learner's last result set as a temp table so checks can query it.
    try { database.run('DROP TABLE IF EXISTS _result') } catch {}
    if (last) {
      const cols = last.columns.map(c => `"${c.replace(/"/g, '""')}"`).join(', ')
      database.run(`CREATE TEMP TABLE _result (${cols})`)
      const placeholders = last.columns.map(() => '?').join(', ')
      for (const row of last.rows) database.run(`INSERT INTO _result VALUES (${placeholders})`, row)
    }
    testResults = tests.map(t => {
      try {
        const res = database.exec(t.check)
        const value = res[0]?.values?.[0]?.[0]
        if (!last && /_result/.test(t.check)) return { name: t.name, passed: false, message: 'Your query did not return any result set.' }
        const passed = value === 1 || value === true || (typeof value === 'number' && value !== 0) || (typeof value === 'string' && value.length > 0 && value !== '0')
        return { name: t.name, passed, message: passed ? '' : 'The check query returned false.' }
      } catch (err) {
        return { name: t.name, passed: false, message: String((err as Error).message ?? err) }
      }
    })
  }
  return { ok: true, tables, notices, ms: Math.round(performance.now() - started), tests: testResults }
}
