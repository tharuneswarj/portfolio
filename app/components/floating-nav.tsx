'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTheme } from './theme-provider'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { path: '/', name: 'Home' },
  { path: '/projects', name: 'Projects' },
  { path: '/blog', name: 'Blog' },
  { path: '/contact', name: 'Contact' },
]

export function FloatingNav() {
  const pathname = usePathname()
  const { theme, toggle } = useTheme()
  const { scrollY } = useScroll()
  const [mobileOpen, setMobileOpen] = useState(false)

  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1])
  const blur = useTransform(scrollY, [0, 100], [0, 12])

  return (
    <>
      <motion.header
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-2"
        style={{
          width: 'min(90vw, 600px)',
        }}
      >
        <motion.nav
          className="flex items-center justify-between rounded-full px-4 py-2.5 border"
          style={{
            backgroundColor: useTransform(
              bgOpacity,
              (v) =>
                theme === 'dark'
                  ? `rgba(10, 10, 10, ${0.5 + v * 0.4})`
                  : `rgba(250, 250, 250, ${0.5 + v * 0.4})`
            ),
            borderColor:
              theme === 'dark'
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(0,0,0,0.08)',
            backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
          }}
        >
          <Link
            href="/"
            className="font-mono text-sm font-semibold tracking-tight"
          >
            tha.run
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, name }) => {
              const isActive =
                path === '/' ? pathname === '/' : pathname.startsWith(path)
              return (
                <Link
                  key={path}
                  href={path}
                  className="relative px-3 py-1.5 text-sm transition-colors"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-accent/10"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      isActive
                        ? 'text-accent font-medium'
                        : 'text-neutral-400 hover:text-white dark:hover:text-white'
                    }`}
                  >
                    {name}
                  </span>
                </Link>
              )
            })}
            <button
              onClick={toggle}
              className="ml-2 p-1.5 rounded-full transition-colors hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggle}
              className="p-1.5 rounded-full"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </motion.nav>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 rounded-2xl border p-4 flex flex-col gap-2 backdrop-blur-xl md:hidden"
            style={{
              backgroundColor:
                theme === 'dark'
                  ? 'rgba(10,10,10,0.95)'
                  : 'rgba(250,250,250,0.95)',
              borderColor:
                theme === 'dark'
                  ? 'rgba(255,255,255,0.08)'
                  : 'rgba(0,0,0,0.08)',
            }}
          >
            {navItems.map(({ path, name }) => {
              const isActive =
                path === '/' ? pathname === '/' : pathname.startsWith(path)
              return (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'text-accent font-medium bg-accent/10'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {name}
                </Link>
              )
            })}
          </motion.div>
        )}
      </motion.header>
    </>
  )
}
