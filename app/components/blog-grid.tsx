'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { TiltCard } from './tilt-card'
import type { BlogMetadata } from '../blog/utils'

interface BlogPost {
  slug: string
  metadata: BlogMetadata
  readTime: string
}

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.metadata.tags || []))
  ).sort()

  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = activeTag
    ? posts.filter((p) => p.metadata.tags?.includes(activeTag))
    : posts

  return (
    <div>
      {/* Tag filters */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              !activeTag
                ? 'bg-accent text-white'
                : 'bg-surface-raised text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-surface-border'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTag === tag
                  ? 'bg-accent text-white'
                  : 'bg-surface-raised text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-surface-border'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((post, i) => (
            <motion.div
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="break-inside-avoid"
            >
              <Link href={`/blog/${post.slug}`}>
                <TiltCard className="glass-card overflow-hidden group cursor-pointer">
                  {post.metadata.image && (
                    <div className="relative w-full h-44 overflow-hidden">
                      <Image
                        src={post.metadata.image}
                        alt={post.metadata.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
                      {post.metadata.title}
                    </h2>
                    {post.metadata.summary && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-3">
                        {post.metadata.summary}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <span>{post.readTime}</span>
                      {post.metadata.tags?.[0] && (
                        <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent-light">
                          {post.metadata.tags[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-neutral-500 mt-12">
          No posts found for this tag.
        </p>
      )}
    </div>
  )
}
