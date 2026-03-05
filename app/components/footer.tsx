import { Github, Linkedin, Instagram, Mail } from 'lucide-react'
import Link from 'next/link'

const socials = [
  { href: 'mailto:tharuneswar@gmail.com', icon: Mail, label: 'Email' },
  { href: 'https://github.com/tharuneswarj', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/tharun-eswar/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://instagram.com/tharun.j', icon: Instagram, label: 'Instagram' },
]

const companies = [
  { name: 'Waves', href: 'https://wavescompany.in' },
  { name: 'Koodu', href: 'https://kooduarchitecture.com' },
]

const nav = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer
      className="mt-16"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <p
              className="text-xl font-bold mb-2"
              style={{ fontFamily: 'var(--font-space, inherit)', color: 'var(--cream)' }}
            >
              Tharun<span style={{ color: 'var(--accent)' }}>.</span>
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
              Architect · Computational Designer · Maker
            </p>
            <div className="flex items-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="transition-opacity hover:opacity-60"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Site nav */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
              Navigate
            </p>
            <ul className="flex flex-col gap-2">
              {nav.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm transition-opacity hover:opacity-60"
                    style={{ color: 'var(--cream)' }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Companies */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
              Ventures
            </p>
            <ul className="flex flex-col gap-2">
              {companies.map((co) => (
                <li key={co.name}>
                  <a
                    href={co.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-opacity hover:opacity-60 inline-flex items-center gap-1"
                    style={{ color: 'var(--cream)' }}
                  >
                    {co.name}
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Tharun Eswar. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Built with computation &amp; craft.
          </p>
        </div>
      </div>
    </footer>
  )
}
