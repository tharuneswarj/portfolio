'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Project {
  slug: string
  metadata: {
    title: string
    description: string
    image: string
  }
}

export function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <div className="flex flex-col">
      {projects.map((project, i) => (
        <Link key={project.slug} href={`/projects/${project.slug}`}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative flex items-center gap-8 py-10 px-6 border-b border-surface-border hover:bg-surface-raised/50 transition-all duration-300"
          >
            {/* Index */}
            <span className="font-mono text-sm text-neutral-400 dark:text-neutral-600 w-8">
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-accent transition-colors duration-300">
                {project.metadata.title}
              </h2>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 max-w-xl">
                {project.metadata.description}
              </p>
            </div>

            {/* Image reveal on hover (desktop) */}
            <div className="hidden md:block relative w-48 h-32 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
              <Image
                src={project.metadata.image}
                alt={project.metadata.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Arrow */}
            <span className="text-neutral-400 dark:text-neutral-600 group-hover:text-accent transition-colors text-xl">
              →
            </span>
          </motion.div>
        </Link>
      ))}
    </div>
  )
}
