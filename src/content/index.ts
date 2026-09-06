import { Language } from './types'
import { cheatsheets } from './cheatsheets'
import { pythonPractice } from './python-practice'
import { pythonExtraLessons } from './languages/python-extra'
import { jsPractice } from './js-practice'
import { sqlPractice } from './sql-practice'
import { python } from './languages/python'
import { javascript } from './languages/javascript'
import { rust } from './languages/rust'
import { go } from './languages/go'
import { c } from './languages/c'
import { cpp } from './languages/cpp'
import { csharp } from './languages/csharp'
import { java } from './languages/java'
import { html } from './languages/html'
import { css } from './languages/css'
import { bash } from './languages/bash'
import { powershell } from './languages/powershell'
import { typescript } from './languages/typescript'
import { ruby } from './languages/ruby'
import { react } from './languages/react'
import { nodejs } from './languages/nodejs'
import { tailwind } from './languages/tailwind'
import { vue } from './languages/vue'
import { vite } from './languages/vite'
import { asm } from './languages/asm'
import { sql } from './languages/sql'
import { git } from './languages/git'
import { php } from './languages/php'
import { lua } from './languages/lua'
import { kotlin } from './languages/kotlin'
import { swift } from './languages/swift'
import { terminal } from './languages/terminal'
import { internet } from './languages/internet'
import { computerArchitecture } from './languages/computer-architecture'
import { operatingSystems } from './languages/operating-systems'
import { compilers } from './languages/compilers'
import { dsa } from './languages/dsa'

export const languages: Language[] = [
  python,
  javascript,
  typescript,
  react,
  vue,
  nodejs,
  html,
  css,
  tailwind,
  vite,
  sql,
  php,
  go,
  rust,
  java,
  kotlin,
  swift,
  csharp,
  cpp,
  c,
  lua,
  git,
  bash,
  powershell,
  terminal,
  ruby,
  dsa,
  internet,
  computerArchitecture,
  operatingSystems,
  compilers,
  asm,
]

// Python lessons that demonstrate desktop windows, subprocesses, network sockets or web servers
// cannot run inside the browser sandbox, so their code blocks are shown without a Run button.
// Extra Python lessons slot in after the core sequence, before the package tutorials.
{
  const at = python.lessons.findIndex(l => l.slug === 'package-field-guide')
  if (at !== -1 && !python.lessons.some(l => l.slug === pythonExtraLessons[0].slug)) python.lessons.splice(at, 0, ...pythonExtraLessons)
}

const LOCAL_ONLY_PYTHON_LESSONS = new Set(['subprocess-automation', 'tkinter-desktop-apps', 'paramiko-ssh', 'requests-and-apis', 'rich-typer-cli', 'fastapi-pydantic', 'sqlalchemy-databases', 'openpyxl-excel', 'pillow-images', 'testing-and-tooling'])
for (const lesson of python.lessons) {
  if (LOCAL_ONLY_PYTHON_LESSONS.has(lesson.slug)) {
    for (const section of lesson.sections) if (section.type === 'code') section.runnable = false
  }
  const practice = pythonPractice[lesson.slug]
  if (practice && !lesson.sections.some(s => s.type === 'exercise')) lesson.sections.push(...practice)
}

for (const lesson of javascript.lessons) {
  const practice = jsPractice[lesson.slug]
  if (practice && !lesson.sections.some(s => s.type === 'exercise')) lesson.sections.push(...practice)
}
for (const lesson of sql.lessons) {
  const practice = sqlPractice[lesson.slug]
  if (practice && !lesson.sections.some(s => s.type === 'exercise')) lesson.sections.push(...practice)
}

// SQL lessons run on SQLite in the browser. Blocks that need PostgreSQL features stay read-only,
// and the sample database is described in src/lib/sql-seed.ts.
const POSTGRES_ONLY = /DATE_TRUNC|INTERVAL|BIGSERIAL|TIMESTAMPTZ|NUMERIC\(|EXPLAIN ANALYZE|USING GIN|INCLUDE \(|NOT VALID|ALTER COLUMN|pg_|CHAR\(2\)|NOW\(\)|cursor\.execute/
for (const lesson of sql.lessons) {
  for (const section of lesson.sections) {
    if (section.type !== 'code') continue
    if ((section.language ?? 'sql') !== 'sql' || POSTGRES_ONLY.test(section.content)) section.runnable = false
  }
}

// Append each track's cheatsheet as its final lesson.
for (const lang of languages) {
  const sheet = cheatsheets[lang.slug]
  if (sheet && lang.lessons[lang.lessons.length - 1]?.slug !== sheet.slug) {
    lang.lessons.push(sheet)
  }
}

export function getLanguage(slug: string): Language | undefined {
  return languages.find(l => l.slug === slug)
}

export function getLesson(languageSlug: string, lessonSlug: string) {
  const lang = getLanguage(languageSlug)
  if (!lang) return undefined
  const lesson = lang.lessons.find(l => l.slug === lessonSlug)
  if (!lesson) return undefined
  const index = lang.lessons.indexOf(lesson)
  return {
    lesson,
    language: lang,
    prev: index > 0 ? lang.lessons[index - 1] : null,
    next: index < lang.lessons.length - 1 ? lang.lessons[index + 1] : null,
  }
}

export type { Language, Lesson, Section } from './types'

export const totalLessons = languages.reduce((sum, l) => sum + l.lessons.length, 0)
export const totalExercises = languages.reduce((sum, l) => sum + l.lessons.reduce((n, lesson) => n + lesson.sections.filter(s => s.type === 'exercise').length, 0), 0)
export function countExercises(language: Language) {
  return language.lessons.reduce((n, lesson) => n + lesson.sections.filter(s => s.type === 'exercise').length, 0)
}
export function countRunnable(language: Language) {
  const runnable = new Set(['python', 'javascript', 'js', 'html', 'css', 'sql'])
  return language.lessons.reduce((n, lesson) => n + lesson.sections.filter(s => s.type === 'code' && s.runnable !== false && runnable.has(s.language ?? language.slug)).length, 0)
}
