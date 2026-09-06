import { challenges } from '@/content/challenges'
import ChallengeClient from './page-client'

export function generateStaticParams() {
  return challenges.map(c => ({ slug: c.slug }))
}

export default function Page() {
  return <ChallengeClient />
}
