import type { Metadata } from 'next'
import QuestionsClient from './page-client'

export const metadata: Metadata = {
  title: 'Common questions | ScholastiCoder',
  description: 'The questions beginners ask most, one per lesson, each with a plain answer and the usual mix-ups explained. Searchable across every course.',
}

export default function Page() {
  return <QuestionsClient />
}
