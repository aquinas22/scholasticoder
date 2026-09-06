import type { Metadata } from 'next'
import ProgressClient from './page-client'

export const metadata: Metadata = {
  title: 'Your progress — ScholastiCoder',
  description: 'Every lesson completed, exercise solved and challenge climbed, kept privately in your browser.',
}

export default function Page() {
  return <ProgressClient />
}
