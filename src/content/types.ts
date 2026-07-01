export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type SectionType = 'text' | 'code' | 'note' | 'warning' | 'tip'

export interface Section {
  type: SectionType
  content: string
  language?: string
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
