import type { Metadata } from 'next'
import GlossaryClient from './page-client'

export const metadata: Metadata = {
  title: 'Glossary — ScholastiCoder',
  description: 'Plain-language definitions of the programming words that trip people up, each linked to the lesson path that teaches it.',
}

export default function Page() {
  return <GlossaryClient />
}
