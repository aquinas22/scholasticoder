import { Language } from './types'
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
  go,
  rust,
  java,
  csharp,
  cpp,
  c,
  bash,
  powershell,
  ruby,
  asm,
]

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
