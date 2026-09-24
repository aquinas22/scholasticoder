import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Navigation } from '@/components/Navigation'
import { SiteFooter } from '@/components/SiteFooter'
import { paletteBootScript, paletteCss } from '@/lib/themes'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans-var',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono-var',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ScholastiCoder: learn to code, step by step',
  description: 'Free, hands-on coding lessons that run in your browser. Start with Python, JavaScript, SQL or the web, try every example, and check your answers as you go. No account, no installs, no paywall.',
  metadataBase: new URL('https://aquinas22.github.io/scholasticoder/'),
  openGraph: {
    title: 'ScholastiCoder: learn to code, step by step',
    description: 'Free, hands-on coding lessons that run in your browser. No account, no installs, no paywall.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-palette="dark" className="dark">
      <head>
        <style id="palettes" dangerouslySetInnerHTML={{ __html: paletteCss() }} />
        <script dangerouslySetInnerHTML={{ __html: paletteBootScript }} />
      </head>
      <body className={`${inter.variable} ${mono.variable}`}>
        <Providers>
          <a href="#main" className="skip-link">Skip to content</a>
          <Navigation />
          <div id="main" className="site-main">{children}</div>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  )
}
