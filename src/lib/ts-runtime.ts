'use client'

/** Loads the TypeScript compiler from cdnjs on first use and transpiles learner code to JavaScript on the main thread. */

interface TsDiagnostic { messageText: string | { messageText: string }; start?: number; file?: { getLineAndCharacterOfPosition(pos: number): { line: number; character: number } } }
interface TsModule {
  transpileModule(input: string, options: { compilerOptions: Record<string, unknown>; reportDiagnostics?: boolean; fileName?: string }): { outputText: string; diagnostics?: TsDiagnostic[] }
  ScriptTarget: { ES2022: number }
  ModuleKind: { ESNext: number; None: number }
  flattenDiagnosticMessageText(text: string | { messageText: string }, newline: string): string
  version: string
}

declare global { interface Window { ts?: TsModule } }

const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/typescript/5.9.2/typescript.min.js'
let loading: Promise<TsModule> | null = null

export function loadTypeScript(): Promise<TsModule> {
  if (loading) return loading
  loading = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('no window'))
    if (window.ts) return resolve(window.ts)
    const script = document.createElement('script')
    script.src = CDN
    script.async = true
    script.onload = () => (window.ts ? resolve(window.ts) : reject(new Error('TypeScript did not initialise')))
    script.onerror = () => reject(new Error('Could not download the TypeScript compiler. Check your connection and try again.'))
    document.head.appendChild(script)
  })
  return loading
}

export type TranspileResult = { ok: true; js: string; version: string } | { ok: false; error: string }

/** Erase types and report syntax errors. Type errors are not checked here (that needs a full program and lib files). */
export async function transpileTypeScript(code: string): Promise<TranspileResult> {
  let ts: TsModule
  try {
    ts = await loadTypeScript()
  } catch (err) {
    return { ok: false, error: (err as Error).message }
  }
  if (/^\s*import\s.+from\s/m.test(code)) {
    return { ok: false, error: 'import statements are not available in the browser sandbox — the program is a single file. Remove the import and define what you need inline.' }
  }
  // export keywords are fine in a file but meaningless inside the sandbox function; drop them.
  const source = code.replace(/^(\s*)export\s+(default\s+)?/gm, '$1')
  const result = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None, strict: true, removeComments: false, esModuleInterop: true, useDefineForClassFields: true }, reportDiagnostics: true, fileName: 'program.ts' })
  const problems = (result.diagnostics ?? []).map(d => {
    const text = ts.flattenDiagnosticMessageText(d.messageText, '\n')
    if (d.file && d.start !== undefined) {
      const { line, character } = d.file.getLineAndCharacterOfPosition(d.start)
      return `program.ts:${line + 1}:${character + 1} — ${text}`
    }
    return text
  })
  if (problems.length) return { ok: false, error: 'SyntaxError\n' + problems.join('\n') }
  return { ok: true, js: result.outputText, version: ts.version }
}
