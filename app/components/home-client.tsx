'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { WordReveal } from './word-reveal'
import { TiltCard } from './tilt-card'
import { ScrollIndicator } from './scroll-indicator'
import { ArrowRight } from 'lucide-react'

const SceneContainer = dynamic(
  () => import('./three/scene-container').then((mod) => mod.SceneContainer),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-surface" /> }
)

interface HomeClientProps {
  projects: {
    slug: string
    title: string
    description: string
    image: string
  }[]
  posts: {
    slug: string
    title: string
    summary: string
    image?: string
    readTime: string
  }[]
}

export function HomeClient({ projects, posts }: HomeClientProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])

  return (
    <>
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <SceneContainer />

        <motion.div
          className="relative z-10 text-center px-6"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <motion.h1
            className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tharun Eswar
          </motion.h1>

          <motion.p
            className="font-mono text-sm sm:text-base text-neutral-600 dark:text-neutral-400 tracking-widest uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Architect · Computational Designer · Maker
          </motion.p>
        </motion.div>

        <ScrollIndicator />
      </section>

      {/* ── Manifesto ── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <WordReveal
            text="I work where code meets craft — building spatial ideas into tangible systems, one layer at a time."
            className="text-2xl sm:text-3xl md:text-4xl font-medium leading-relaxed text-neutral-900 dark:text-white tracking-tight"
          />
        </div>
      </section>

      {/* ── Companies ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            What I&apos;m Building
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.slice(0, 2).map((project, i) => (
              <Link key={project.slug} href={`/projects/${project.slug}`}>
                <TiltCard className="glass-card p-8 h-full group cursor-pointer">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm text-accent font-medium group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="w-4 h-4" />
                    </span>
                  </motion.div>
                </TiltCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Blog ── */}
      {posts.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <motion.h2
                className="text-sm font-mono text-neutral-500 uppercase tracking-widest"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Recent Writing
              </motion.h2>
              <Link
                href="/blog"
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-accent transition-colors"
              >
                All posts →
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <TiltCard className="glass-card overflow-hidden group cursor-pointer h-full">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {post.image && (
                        <div className="relative w-full h-40 overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
                          {post.title}
                        </h3>
                        {post.summary && (
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-3">
                            {post.summary}
                          </p>
                        )}
                        <span className="text-xs text-neutral-500">
                          {post.readTime}
                        </span>
                      </div>
                    </motion.div>
                  </TiltCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Let&apos;s build something together.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-xl mx-auto">
            Open to collaborations in architecture, computational design, and
            digital fabrication.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition hover:bg-accent-glow hover:-translate-y-0.5"
          >
            Get in touch <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </>
  )
}
