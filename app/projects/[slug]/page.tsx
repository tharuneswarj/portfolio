import { notFound } from "next/navigation"
import { getProjectBySlug, getAllProjects } from "../utils"
import { CustomMDX } from "../../components/mdx"

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)

  if (!project) return notFound()

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        {project.metadata.title}
      </h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
        {project.metadata.description}
      </p>

      <div className="prose dark:prose-invert max-w-none">
        <CustomMDX source={project.content} />
      </div>
    </article>
  )
}

import type { Metadata } from "next"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)

  if (!project) return { title: "Not Found" }

  return {
    title: `${project.metadata.title} | Tharun Eswar`,
    description: project.metadata.description,
    openGraph: {
      title: project.metadata.title,
      description: project.metadata.description,
      images: [project.metadata.image],
      type: "article",
    },
  }
}