import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import {
  formatDate,
  getBlogPosts,
  readingTime,
} from '../utils'
import { baseUrl } from 'app/sitemap'
import type { Metadata } from 'next'
import { BlogDetailClient } from 'app/components/blog-detail-client'

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const post = getBlogPosts().find((p) => p.slug === params.slug)
  if (!post) return {}

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata

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
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
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

export default function BlogPage({ params }: any) {
  const post = getBlogPosts().find((p) => p.slug === params.slug)
  if (!post) return notFound()

  const time = readingTime(post.content)
  const date = formatDate(post.metadata.publishedAt)

  return (
    <BlogDetailClient
      title={post.metadata.title}
      date={date}
      readTime={time}
      image={post.metadata.image}
      tags={post.metadata.tags}
    >
      <article className="prose max-w-none">
        <CustomMDX source={post.content} />
      </article>
    </BlogDetailClient>
  )
}
