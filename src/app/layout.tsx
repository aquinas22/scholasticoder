import type { Metadata } from 'next'
import { Rajdhani, Barlow_Semi_Condensed, Fira_Code } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Navigation } from '@/components/Navigation'

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-syne',
  display: 'swap',
})

const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ScholastiCoder — Learn to code. Actually learn it.',
  description: 'Free, interactive coding lessons: run Python in your browser, solve graded exercises, and climb a challenge ladder. 32 paths across Python, JavaScript, TypeScript, SQL, Git, Rust, Go, and how computers really work. No paywalls, no accounts.',
  metadataBase: new URL('https://aquinas22.github.io/scholasticoder/'),
  openGraph: {
    title: 'ScholastiCoder — the open-source coding scriptorium',
    description: 'Run Python in your browser, solve graded exercises, and study 32 learning paths for free.',
    type: 'website',
    images: ['/art/benedictine-coding-monk-hero.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${rajdhani.variable} ${barlowSemiCondensed.variable} ${firaCode.variable}`}>
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  )
}
