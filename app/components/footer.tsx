import Link from 'next/link'
import { Github, Linkedin, Instagram, Mail } from 'lucide-react'

const socials = [
  { icon: Mail, href: 'mailto:tharuneswar@gmail.com', label: 'Email' },
  { icon: Github, href: 'https://github.com/tharuneswarj', label: 'GitHub' },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/tharun-eswar/',
    label: 'LinkedIn',
  },
  {
    icon: Instagram,
    href: 'https://instagram.com/tharun.j',
    label: 'Instagram',
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-surface-border mt-20">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <span className="font-mono text-lg font-semibold text-neutral-900 dark:text-white">
              tha.run
            </span>
            <p className="text-sm text-neutral-500 mt-2">
              Architect · Computational Designer · Maker
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-2">
            {['/', '/projects', '/blog', '/contact'].map((path) => (
              <Link
                key={path}
                href={path}
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-accent transition-colors"
              >
                {path === '/'
                  ? 'Home'
                  : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex gap-4 md:justify-end items-start">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-neutral-500 dark:text-neutral-500 hover:text-accent hover:bg-accent/10 transition-all"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-surface-border text-center text-xs text-neutral-400 dark:text-neutral-600">
          &copy; {new Date().getFullYear()} Tharun Eswar. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
