import { languages } from '@/content'
import LanguagePageClient from './page-client'

export function generateStaticParams() {
  return languages.map(l => ({ slug: l.slug }))
}

export default function Page() {
  return <LanguagePageClient />
}
