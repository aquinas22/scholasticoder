import type { Metadata } from 'next'
import QuestionsClient from './page-client'

export const metadata: Metadata = {
  title: 'Tabula Quaestionum — ScholastiCoder',
  description: 'Every disputed question on the site, in the form of the Summa: the objections, the sed contra, and the answer. Searchable across all paths.',
}

export default function Page() {
  return <QuestionsClient />
}
