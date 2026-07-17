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
  description: 'Free lessons in 31 languages & CS topics — Python, JavaScript, TypeScript, SQL, Git, Rust, Go, Swift, Kotlin, and more, plus how computers, the internet, and compilers actually work. No paywalls, no accounts, no nonsense.',
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
