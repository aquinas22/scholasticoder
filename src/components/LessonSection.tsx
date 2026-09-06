'use client'
import type { Section } from '@/content/types'
import { CodeBlock } from './CodeBlock'
import { CodeLab } from './CodeLab'
import { LiveHtml } from './LiveHtml'
import { Quiz } from './Quiz'
import { ShellLab } from './ShellLab'
import { runtimeFor } from '@/lib/runnable'

interface Props { section: Section; index: number; languageSlug: string; lessonSlug: string }

const CALLOUT = {
  note: { label: '◆ Note', color: 'var(--accent)', bg: 'var(--card)', border: 'var(--border)' },
  warning: { label: '⚠ Warning', color: '#ff6b00', bg: 'rgba(255,107,0,0.06)', border: 'rgba(255,107,0,0.2)' },
  tip: { label: '✦ Tip', color: '#00b372', bg: 'rgba(0,179,114,0.06)', border: 'rgba(0,179,114,0.2)' },
} as const

export function LessonSection({ section, index, languageSlug, lessonSlug }: Props) {
  if (section.type === 'text') {
    return <p style={{ marginBottom: '1.4rem', lineHeight: 1.8, fontSize: '1rem', color: 'var(--text)' }}>{section.content}</p>
  }

  if (section.type === 'code') {
    const lang = section.language ?? languageSlug
    const runtime = section.runnable === false ? null : runtimeFor(lang)
    if (runtime === 'python' || runtime === 'javascript' || runtime === 'sql' || runtime === 'typescript') {
      return <CodeLab runtime={runtime} code={section.content} compact />
    }
    if (runtime === 'html' || runtime === 'css') {
      return <LiveHtml code={section.content} language={runtime} />
    }
    return (
      <div style={{ marginBottom: '1.75rem' }}>
        <CodeBlock code={section.content} language={lang} showLineNumbers />
      </div>
    )
  }

  if (section.type === 'exercise' && section.exercise) {
    const ex = section.exercise
    return (
      <div style={{ marginBottom: '1.9rem' }}>
        <p style={{ marginBottom: '0.75rem', lineHeight: 1.75, fontSize: '0.98rem', color: 'var(--text)' }}>{section.content}</p>
        <CodeLab
          runtime={(() => { const r = runtimeFor(section.language ?? languageSlug); return r === 'javascript' || r === 'sql' || r === 'typescript' ? r : 'python' })()}
          id={`${languageSlug}/${lessonSlug}/${index}`}
          title={ex.title}
          code={ex.starter}
          stdin={ex.stdin}
          tests={ex.tests}
          hints={ex.hints}
          solution={ex.solution}
          minLines={6}
        />
      </div>
    )
  }

  if (section.type === 'shell' && section.shell) {
    const sh = section.shell
    return (
      <div style={{ marginBottom: '1.9rem' }}>
        <ShellLab id={`${languageSlug}/${lessonSlug}/${index}`} title={sh.title} task={section.content} intro={sh.intro} checks={sh.checks} hints={sh.hints} solution={sh.solution} />
      </div>
    )
  }

  if (section.type === 'quiz' && section.quiz) {
    return <Quiz question={section.content} quiz={section.quiz} id={`quiz:${languageSlug}/${lessonSlug}/${index}`} />
  }

  if (section.type === 'note' || section.type === 'warning' || section.type === 'tip') {
    const c = CALLOUT[section.type]
    return (
      <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderLeft: `3px solid ${c.color}`, borderRadius: '0 8px 8px 0', padding: '0.9rem 1.1rem', marginBottom: '1.75rem', fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--text)' }}>
        <span style={{ display: 'inline-block', color: c.color, fontFamily: 'var(--font-mono, monospace)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{c.label}</span>
        <br />
        {section.content}
      </div>
    )
  }

  return null
}
