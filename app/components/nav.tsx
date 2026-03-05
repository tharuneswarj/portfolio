'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const navItems = {
  '/': { name: 'Home' },
  '/projects': { name: 'Projects' },
  '/blog': { name: 'Blog' },
  '/contact': { name: 'Contact' },
}

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(8, 10, 15, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      {/* Brand */}
      <Link
        href="/"
        className="text-base font-semibold tracking-tight transition-opacity hover:opacity-70"
        style={{ color: 'var(--cream)', fontFamily: 'var(--font-space, inherit)' }}
      >
        Tharun<span style={{ color: 'var(--accent)' }}>.</span>
      </Link>

      {/* Nav links */}
      <nav className="flex items-center gap-7">
        {Object.entries(navItems).map(([path, { name }]) => {
          const isActive = pathname === path
          return (
            <Link
              key={path}
              href={path}
              className="relative text-sm font-medium transition-colors duration-200 group"
              style={{
                color: isActive ? 'var(--cream)' : 'var(--text-muted)',
              }}
            >
              {name}
              {/* animated underline */}
              <span
                className="absolute -bottom-0.5 left-0 h-px transition-all duration-300"
                style={{
                  background: 'var(--accent)',
                  width: isActive ? '100%' : '0%',
                }}
              />
              <style>{`
                .group:hover span { width: 100% !important; }
              `}</style>
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
