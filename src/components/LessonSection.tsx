'use client'
import type { Section } from '@/content/types'
import { CodeBlock } from './CodeBlock'
import { CodeLab } from './CodeLab'
import { LiveHtml } from './LiveHtml'
import { Quiz } from './Quiz'
import { ShellLab } from './ShellLab'
import { RichText } from './Term'
import { CommonQuestion } from './CommonQuestion'
import { runtimeFor } from '@/lib/runnable'

interface Props { section: Section; index: number; languageSlug: string; lessonSlug: string }

const CALLOUT_LABEL = { note: 'Note', warning: 'Watch out', tip: 'Tip' } as const

export function LessonSection({ section, index, languageSlug, lessonSlug }: Props) {
  if (section.type === 'text') {
    return <p className="prose-p"><RichText text={section.content} blockId={`s${index}`} /></p>
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
      <div className="block">
        <CodeBlock code={section.content} language={lang} showLineNumbers />
      </div>
    )
  }

  if (section.type === 'exercise' && section.exercise) {
    const ex = section.exercise
    return (
      <div className="block">
        <p className="exercise-prompt"><RichText text={section.content} blockId={`s${index}`} /></p>
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

  if (section.type === 'quaestio' && section.quaestio) {
    return <CommonQuestion quaestio={section.quaestio} id={`quaestio:${languageSlug}/${lessonSlug}/${index}`} blockId={`s${index}`} />
  }

  if (section.type === 'shell' && section.shell) {
    const sh = section.shell
    return (
      <div className="block">
        <ShellLab id={`${languageSlug}/${lessonSlug}/${index}`} title={sh.title} task={section.content} intro={sh.intro} checks={sh.checks} hints={sh.hints} solution={sh.solution} />
      </div>
    )
  }

  if (section.type === 'quiz' && section.quiz) {
    return <Quiz question={section.content} quiz={section.quiz} id={`quiz:${languageSlug}/${lessonSlug}/${index}`} />
  }

  if (section.type === 'note' || section.type === 'warning' || section.type === 'tip') {
    return (
      <aside className={`callout callout-${section.type}`}>
        <strong className="callout-label">{CALLOUT_LABEL[section.type]}</strong>
        <div><RichText text={section.content} blockId={`s${index}`} /></div>
      </aside>
    )
  }

  return null
}
