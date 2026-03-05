import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { getAllProjects } from './projects/utils'
import { getBlogPosts } from './blog/utils'

// Dynamically import the 3D canvas — client only, no SSR
const PointCloudCanvas = dynamic(
  () => import('./components/PointCloudCanvas'),
  { ssr: false, loading: () => null }
)

const whatIDo = [
  {
    icon: '⬡',
    title: 'Computation & Geometry',
    desc: 'Parametric design systems, Grasshopper/Rhino pipelines, and algorithmic spatial logic.',
    color: '#6366f1',
  },
  {
    icon: '◈',
    title: 'Digital Fabrication',
    desc: 'Clay 3D printing, CNC toolpaths, custom delta printers, and hybrid material experiments.',
    color: '#f59e0b',
  },
  {
    icon: '⬢',
    title: 'BIM & Automation',
    desc: 'Cloud BIM workflows, Rhino.Compute pipelines, Revit API workers, schema-driven generation.',
    color: '#34d399',
  },
  {
    icon: '◉',
    title: 'Products & Brands',
    desc: 'Running Waves — algorithmically crafted lighting, and Koodu — a design-led architecture studio.',
    color: '#f472b6',
  },
  {
    icon: '◎',
    title: 'Teaching & Research',
    desc: 'Mentoring computational design at Novatr; teaching architecture, tools, and digital making.',
    color: '#a78bfa',
  },
  {
    icon: '◐',
    title: 'Code & Tools',
    desc: 'Python, C#, web development. Building tools that reduce friction in design workflows.',
    color: '#38bdf8',
  },
]

const companies = [
  {
    name: 'Waves',
    tagline: 'Algorithmically crafted lighting',
    desc: 'A design and manufacturing brand creating technically rigorous light objects through digital fabrication.',
    href: 'https://wavescompany.in',
    accent: '#f59e0b',
  },
  {
    name: 'Koodu',
    tagline: 'Architecture & design studio',
    desc: 'A design-led studio rooted in craft, care, and creation — working across architecture, interiors, and objects.',
    href: 'https://kooduarchitecture.com',
    accent: '#6366f1',
  },
]

export default function Page() {
  const projects = getAllProjects()
    .sort((a, b) => {
      const aDate = new Date(((a.metadata) as any).publishedAt || 0).getTime()
      const bDate = new Date(((b.metadata) as any).publishedAt || 0).getTime()
      return bDate - aDate
    })
    .slice(0, 3)

  const posts = getBlogPosts()
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
    .slice(0, 2)

  return (
    <div>
      {/* ─── HERO ───────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden px-6">
        {/* 3D Canvas background */}
        <div className="absolute inset-0 z-0">
          <PointCloudCanvas />
        </div>

        {/* Vignette overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 30%, var(--bg) 80%)',
          }}
        />

        {/* Content */}
        <div className="relative z-[2] max-w-4xl mx-auto">
          {/* Role chip */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium mb-8 animate-fade-up"
            style={{
              background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.3)',
              color: 'var(--accent-2)',
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--accent)', animation: 'glow-pulse 2s ease-in-out infinite' }}
            />
            Architect · Computational Designer · Maker · Educator
          </div>

          <h1
            className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[0.95] mb-6 animate-fade-up delay-100"
            style={{ fontFamily: 'var(--font-space, inherit)', color: 'var(--cream)' }}
          >
            I build{' '}
            <span className="gradient-text">spatial ideas</span>
            <br />
            into systems.
          </h1>

          <p
            className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-10 animate-fade-up delay-300"
            style={{ color: 'var(--text-muted)' }}
          >
            Hi, I'm Tharun. I work at the intersection of architecture, computation,
            and digital fabrication — translating research into spaces, products, and tools.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-up delay-400">
            <Link
              href="/projects"
              id="hero-projects-btn"
              className="rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'var(--accent)',
                color: '#fff',
                boxShadow: '0 0 30px rgba(99,102,241,0.35)',
              }}
            >
              Explore work
            </Link>
            <Link
              href="/blog"
              id="hero-blog-btn"
              className="rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 glass-card"
              style={{ color: 'var(--cream)' }}
            >
              Read the blog →
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 z-[2] flex flex-col items-center gap-2 animate-float"
          style={{ color: 'var(--text-muted)' }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div
            className="w-px h-10"
            style={{ background: 'linear-gradient(to bottom, var(--text-muted), transparent)' }}
          />
        </div>
      </section>

      {/* ─── WHAT I DO ──────────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-space, inherit)', color: 'var(--cream)' }}
          >
            What I do
          </h2>
          <p style={{ color: 'var(--text-muted)' }} className="text-base max-w-xl mx-auto">
            A multidisciplinary practice that lives at the edge of design and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whatIDo.map((item) => (
            <div
              key={item.title}
              className="glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 glow-accent-hover group"
            >
              <div
                className="text-3xl mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ color: item.color }}
              >
                {item.icon}
              </div>
              <h3
                className="text-base font-semibold mb-2"
                style={{ color: 'var(--cream)' }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── COMPANIES ──────────────────────────────────────────── */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-space, inherit)', color: 'var(--cream)' }}
          >
            Ventures
          </h2>
          <p style={{ color: 'var(--text-muted)' }} className="text-base max-w-lg mx-auto">
            Beyond the day job — brands I'm building rooted in design craft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companies.map((co) => (
            <a
              key={co.name}
              href={co.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-2xl p-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 group"
              style={{ borderColor: `${co.accent}22` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: co.accent }}>
                    {co.tagline}
                  </p>
                  <h3
                    className="text-2xl font-bold"
                    style={{ fontFamily: 'var(--font-space, inherit)', color: 'var(--cream)' }}
                  >
                    {co.name}
                  </h3>
                </div>
                <span
                  className="text-2xl transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: co.accent }}
                >
                  ↗
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {co.desc}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ──────────────────────────────────── */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: 'var(--font-space, inherit)', color: 'var(--cream)' }}
            >
              Selected work
            </h2>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              Fabrication, computation, and spatial design.
            </p>
          </div>
          <Link
            href="/projects"
            className="text-sm font-semibold transition-colors hover:opacity-70"
            style={{ color: 'var(--accent-2)' }}
          >
            All projects →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 glow-accent-hover"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="relative h-48 w-full overflow-hidden">
                {(project.metadata as any).image ? (
                  <Image
                    src={(project.metadata as any).image}
                    alt={(project.metadata as any).title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-5xl"
                    style={{ background: 'rgba(99,102,241,0.1)' }}
                  >
                    ⬡
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 p-5">
                <h3 className="text-base font-semibold" style={{ color: 'var(--cream)' }}>
                  {(project.metadata as any).title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {(project.metadata as any).description}
                </p>
                <span
                  className="mt-2 text-xs font-semibold transition-opacity opacity-60 group-hover:opacity-100"
                  style={{ color: 'var(--accent-2)' }}
                >
                  Case study →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── LATEST POSTS ───────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: 'var(--font-space, inherit)', color: 'var(--cream)' }}
            >
              Latest thoughts
            </h2>
            <Link href="/blog" className="text-sm font-semibold transition-colors hover:opacity-70" style={{ color: 'var(--accent-2)' }}>
              All posts →
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-card rounded-2xl p-6 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-1 h-6 rounded-full"
                    style={{ background: 'var(--accent)' }}
                  />
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {post.metadata.publishedAt}
                  </span>
                </div>
                <h3
                  className="text-base font-semibold transition-colors group-hover:text-indigo-300"
                  style={{ color: 'var(--cream)' }}
                >
                  {post.metadata.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {post.metadata.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ─── CTA ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div
          className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(245,158,11,0.08) 100%)',
            border: '1px solid rgba(99,102,241,0.2)',
          }}
        >
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(99,102,241,0.15)' }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(245,158,11,0.08)' }}
          />
          <h2
            className="relative text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-space, inherit)', color: 'var(--cream)' }}
          >
            Let's build something{' '}
            <span className="gradient-text">remarkable</span>.
          </h2>
          <p className="relative max-w-xl mx-auto text-base mb-8" style={{ color: 'var(--text-muted)' }}>
            Architecture, computational workflows, material research, or digital fabrication—
            share your idea and let's make it real.
          </p>
          <Link
            href="/contact"
            id="cta-contact-btn"
            className="relative inline-flex rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'var(--accent)',
              color: '#fff',
              boxShadow: '0 0 30px rgba(99,102,241,0.4)',
            }}
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  )
}
