import type { Metadata } from 'next'
import DojoClient from './page-client'

export const metadata: Metadata = {
  title: 'Playground | ScholastiCoder',
  description: 'Write and run Python, JavaScript, TypeScript and shell commands in your browser. No installs, no account.',
}

export default function Page() {
  return <DojoClient />
}
