import { notFound } from "next/navigation"
import { CustomMDX } from "app/components/mdx"
import { getAllProjects, getProjectBySlug } from "../utils"
import { baseUrl } from "app/sitemap"
import type { Metadata } from "next"

// ✅ Generate static params
export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

// ✅ Metadata
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
      type: "article",
      publishedTime: publishedAt,
      url: `${baseUrl}/projects/${project.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}

// ✅ Project detail page
export default function ProjectPage({ params }: any) {
  const project = getProjectBySlug(params.slug)

  if (!project) return notFound()

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        {project.metadata.title}
      </h1>

      {/* Meta */}
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8">
        {project.metadata.publishedAt}
      </p>

      {/* Content */}
      <article className="prose dark:prose-invert max-w-none">
        <CustomMDX source={project.content} />
      </article>
    </section>
  )
}
