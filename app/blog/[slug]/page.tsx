import { notFound } from "next/navigation"
import { CustomMDX } from "app/components/mdx"
import { formatDate, getBlogPosts } from "../utils"
import { baseUrl } from "app/sitemap"
import type { Metadata, ResolvingMetadata } from "next"

type PageProps = {
  params: {
    slug: string
  }
}

// ✅ Generate static paths
export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return getBlogPosts().map((post) => ({ slug: post.slug }))
}

// ✅ Metadata
export async function generateMetadata(
  { params }: PageProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const post = getBlogPosts().find((p) => p.slug === params.slug)
  if (!post) return {}

  const { title, publishedAt: publishedTime, summary: description, image } =
    post.metadata

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
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
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

// ✅ Page component
export default function BlogPage({ params }: PageProps) {
  const post = getBlogPosts().find((p) => p.slug === params.slug)

  if (!post) return notFound()

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        {post.metadata.title}
      </h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8">
        {formatDate(post.metadata.publishedAt)}
      </p>
      <article className="prose dark:prose-invert max-w-none">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
