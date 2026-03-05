import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'
import { ClientProviders } from './components/client-providers'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Tharun Eswar | Architect & Computational Designer',
    template: '%s | Tharun Eswar',
  },
  description:
    'Architect, computational designer, and maker — building at the intersection of code, craft, and spatial design.',
  openGraph: {
    title: 'Tharun Eswar | Architect & Computational Designer',
    description:
      'Architect, computational designer, and maker — building at the intersection of code, craft, and spatial design.',
    url: baseUrl,
    siteName: 'Tharun Eswar',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`dark ${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
        <ClientProviders>
          <main className="flex-auto min-w-0">{children}</main>
        </ClientProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}