import type { Metadata } from 'next'
import ChallengesClient from './page-client'

export const metadata: Metadata = {
  title: 'Python Challenges — ScholastiCoder',
  description: 'A graded ladder of Python problems with automated checks, hints and reference solutions. Runs entirely in your browser.',
}

export default function Page() {
  return <ChallengesClient />
}
