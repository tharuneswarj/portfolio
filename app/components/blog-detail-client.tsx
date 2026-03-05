'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ReadingProgress } from './reading-progress'
import { ArrowLeft } from 'lucide-react'

interface BlogDetailClientProps {
  title: string
  date: string
  readTime: string
  image?: string
  tags?: string[]
  children: React.ReactNode
}

export function BlogDetailClient({
  title,
  date,
  readTime,
  image,
  tags,
  children,
}: BlogDetailClientProps) {
  return (
    <>
      <ReadingProgress />

      <section className="pt-20 pb-20">
        {/* Hero image with parallax */}
        {image && (
          <div className="relative w-full h-[40vh] md:h-[50vh] mb-8 overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
          </div>
        )}

        <div className="max-w-3xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-accent transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>

          {/* Title */}
          <motion.h1
            className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500 mb-8">
            <span>{date}</span>
            <span>·</span>
            <span>{readTime}</span>
            {tags && tags.length > 0 && (
              <>
                <span>·</span>
                <div className="flex gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-accent/10 text-accent-light text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Article content */}
          {children}
        </div>
      </section>
    </>
  )
}
