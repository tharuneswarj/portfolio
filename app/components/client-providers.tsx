'use client'

import { ThemeProvider } from './theme-provider'
import { FloatingNav } from './floating-nav'
import { SmoothScroll } from './smooth-scroll'
import Footer from './footer'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <FloatingNav />
        {children}
        <Footer />
      </SmoothScroll>
    </ThemeProvider>
  )
}
