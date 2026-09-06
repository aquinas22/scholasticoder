/** Languages that can execute or preview inside the browser. */
export const RUNNABLE_LANGS = new Set(['python', 'javascript', 'js', 'html', 'css'])

export function runtimeFor(lang: string): 'python' | 'javascript' | 'html' | 'css' | null {
  if (lang === 'python') return 'python'
  if (lang === 'javascript' || lang === 'js') return 'javascript'
  if (lang === 'html') return 'html'
  if (lang === 'css') return 'css'
  return null
}
