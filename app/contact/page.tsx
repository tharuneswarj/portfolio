import { Mail, Github, Linkedin, Instagram } from 'lucide-react'
import Link from 'next/link'

const contacts = [
  {
    name: 'Email',
    handle: 'tharuneswar@gmail.com',
    href: 'mailto:tharuneswar@gmail.com',
    icon: Mail,
    color: '#f59e0b',
  },
  {
    name: 'GitHub',
    handle: 'github.com/tharuneswarj',
    href: 'https://github.com/tharuneswarj',
    icon: Github,
    color: '#e8e4d8',
  },
  {
    name: 'LinkedIn',
    handle: 'linkedin.com/in/tharun-eswar',
    href: 'https://www.linkedin.com/in/tharun-eswar/',
    icon: Linkedin,
    color: '#38bdf8',
  },
  {
    name: 'Instagram',
    handle: 'instagram.com/tharun.j',
    href: 'https://instagram.com/tharun.j',
    icon: Instagram,
    color: '#f472b6',
  },
]

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 px-6 text-center overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(52,211,153,0.08) 0%, transparent 60%)',
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: '#34d399' }}
        >
          Let's connect
        </p>
        <h1
          className="text-4xl sm:text-6xl font-bold"
          style={{ fontFamily: 'var(--font-space, inherit)', color: 'var(--cream)' }}
        >
          Get in{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #34d399, #6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Touch
          </span>
        </h1>
        <p className="mt-4 max-w-lg mx-auto text-base" style={{ color: 'var(--text-muted)' }}>
          Architecture, computational design, digital fabrication, collaboration, or
          just a good conversation — reach me through any of these channels.
        </p>
      </section>

      {/* Contact cards */}
      <section className="max-w-2xl mx-auto px-6 pb-24">
        <div className="flex flex-col gap-4">
          {contacts.map((c) => (
            <a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card rounded-2xl px-6 py-5 flex items-center gap-5 transition-all duration-300 hover:-translate-y-0.5 glow-accent-hover"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${c.color}18`, border: `1px solid ${c.color}30` }}
              >
                <c.icon className="w-5 h-5" style={{ color: c.color }} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold" style={{ color: 'var(--cream)' }}>
                  {c.name}
                </span>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {c.handle}
                </span>
              </div>
              <span
                className="ml-auto text-lg transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: c.color }}
              >
                →
              </span>
            </a>
          ))}
        </div>

        <div
          className="mt-12 rounded-2xl p-8 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(52,211,153,0.06))',
            border: '1px solid rgba(99,102,241,0.15)',
          }}
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Based in{' '}
            <span className="font-medium" style={{ color: 'var(--cream)' }}>Tirupur, Tamil Nadu</span>{' '}
            · Available for remote collaborations worldwide.
          </p>
        </div>
      </section>
    </div>
  )
}
