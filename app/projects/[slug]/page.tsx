import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CustomMDX } from 'app/components/mdx'
import { getAllProjects, getProjectBySlug } from '../utils'
import { baseUrl } from 'app/sitemap'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}

  const { title, description, image, publishedAt } = project.metadata

  const ogImage = image
    ? `${baseUrl}${image}`
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: publishedAt,
      url: `${baseUrl}/projects/${project.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function ProjectPage({ params }: any) {
  const project = getProjectBySlug(params.slug)
  if (!project) return notFound()

  const allProjects = getAllProjects()
  const idx = allProjects.findIndex((p) => p.slug === project.slug)
  const prev = idx > 0 ? allProjects[idx - 1] : null
  const next = idx < allProjects.length - 1 ? allProjects[idx + 1] : null

  return (
    <section className="pt-20 pb-20">
      {/* Hero image */}
      {project.metadata.image && (
        <div className="relative w-full h-[50vh] mb-8">
          <Image
            src={project.metadata.image}
            alt={project.metadata.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              {project.metadata.title}
            </h1>
          </div>
        </div>
      )}

      {!project.metadata.image && (
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-8">
            {project.metadata.title}
          </h1>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6">
        <article className="prose max-w-none">
          <CustomMDX source={project.content} />
        </article>

        {/* Prev/Next */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-surface-border">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="text-sm text-neutral-400 hover:text-accent transition-colors"
            >
              ← {prev.metadata.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="text-sm text-neutral-400 hover:text-accent transition-colors"
            >
              {next.metadata.title} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </section>
  )
}
