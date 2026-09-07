import type { MetadataRoute } from 'next'
import { languages } from '@/content'
import { challenges } from '@/content/challenges'

export const dynamic = 'force-static'

const BASE = 'https://aquinas22.github.io/scholasticoder'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const top: MetadataRoute.Sitemap = ['', '/languages/', '/dojo/', '/challenges/', '/glossary/', '/questions/', '/method/', '/progress/', '/editors/'].map(p => ({ url: `${BASE}${p}`, lastModified: now, changeFrequency: 'weekly', priority: p === '' ? 1 : 0.8 }))
  const paths: MetadataRoute.Sitemap = languages.map(l => ({ url: `${BASE}/languages/${l.slug}/`, lastModified: now, changeFrequency: 'monthly', priority: l.slug === 'python' ? 0.9 : 0.7 }))
  const lessons: MetadataRoute.Sitemap = languages.flatMap(l => l.lessons.map(lesson => ({ url: `${BASE}/languages/${l.slug}/lessons/${lesson.slug}/`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 })))
  const ladder: MetadataRoute.Sitemap = challenges.map(c => ({ url: `${BASE}/challenges/${c.slug}/`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 }))
  return [...top, ...paths, ...lessons, ...ladder]
}
