export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type SectionType = 'text' | 'code' | 'note' | 'warning' | 'tip' | 'exercise' | 'quiz' | 'shell'

/** A single automated check. `check` is Python (or JavaScript) that runs in the learner's namespace after their code.
 *  It passes when it does not raise. The captured program output is available as `_out`. */
export interface TestCase {
  name: string
  check: string
}

export interface Exercise {
  /** Short title shown in the exercise header. */
  title: string
  /** Code the learner starts from. */
  starter: string
  /** Reference solution, revealed on request. */
  solution: string
  tests: TestCase[]
  /** Progressive hints, revealed one at a time. */
  hints?: string[]
  /** Pre-filled program input, one line per input() call. */
  stdin?: string
}

export interface QuizChoice {
  text: string
  correct?: boolean
  explanation?: string
}

export interface Quiz {
  choices: QuizChoice[]
  /** Optional code snippet the question refers to. */
  code?: string
  language?: string
}

/** A shell exercise: the learner works in the simulated terminal; checks inspect its state. */
export interface ShellExercise {
  title: string
  /** Lines shown in the terminal before the learner starts. */
  intro?: string[]
  hints?: string[]
  /** One way to do it, shown on request. */
  solution?: string
  checks: Array<{ name: string; check: (state: import('../lib/shell-sim').ShellState, lastOutput: string) => boolean | string }>
}

export interface Section {
  type: SectionType
  /** Body text, code, or (for exercise/quiz) the prompt. */
  content: string
  language?: string
  /** Set false to hide the Run button on a code block that cannot work in the browser sandbox. */
  runnable?: boolean
  exercise?: Exercise
  quiz?: Quiz
  shell?: ShellExercise
}

export interface Lesson {
  slug: string
  title: string
  intro: string
  sections: Section[]
}

export interface Setup {
  description: string
  windows: string
  mac: string
  linux: string
}

export interface Language {
  slug: string
  name: string
  tagline: string
  description: string
  accentColor: string
  textOnAccent: string
  icon: string
  difficulty: Difficulty
  usedFor: string[]
  notableUsers: string[]
  setup: Setup
  lessons: Lesson[]
}
