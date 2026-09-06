import type { Metadata } from 'next'
import DojoClient from './page-client'

export const metadata: Metadata = {
  title: 'Python Dojo — ScholastiCoder',
  description: 'A full Python 3 playground that runs in your browser. No installs, no accounts. Write, run, and break things safely.',
}

export default function Page() {
  return <DojoClient />
}
