import { languages } from '@/content'
import LessonPageClient from './page-client'

export function generateStaticParams() {
  return languages.flatMap(l =>
    l.lessons.map(lesson => ({ slug: l.slug, lesson: lesson.slug }))
  )
}

export default function Page() {
  return <LessonPageClient />
}
