import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Tharun Eswar | Portfolio',
    template: '%s | Tharun Eswar',
  },
  description: 'A Peak into my Curious Brain. I write about Architecture , Tech and Life.',
  openGraph: {
    title: 'Tharun Eswar | Portfolio',
    description: 'A Peak into my Curious Brain. I write about Architecture , Tech and Life.',
    url: baseUrl,
    siteName: 'Tharun Eswar | Portfolio',
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

const cx = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-4xl mx-auto mt-8 pb-8 flex flex-col min-h-screen">
        <main className="flex-auto min-w-0 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}