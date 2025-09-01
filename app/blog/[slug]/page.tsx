import { notFound } from "next/navigation"
import { CustomMDX } from "app/components/mdx"
import { formatDate, getBlogPosts } from "../utils"
import { baseUrl } from "app/sitemap"
import type { Metadata } from "next"

type Props = { params: { slug: string } }

// ✅ Generate static paths for all blog posts
export async function generateStaticParams() {
  let posts = getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

// ✅ Dynamic metadata for SEO / social previews
export function generateMetadata({ params }: Props): Metadata | undefined {
  let post = getBlogPosts().find((post) => post.slug === params.slug)
  if (!post) return

  let { title, publishedAt: publishedTime, summary: description, image } =
    post.metadata

  let ogImage = image
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

// ✅ Blog detail page
export default function BlogPage({ params }: Props) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)

  if (!post) notFound()

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Tharun Eswar",
            },
          }),
        }}
      />

      {/* Blog title */}
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        {post.metadata.title}
      </h1>

      {/* Blog meta */}
      <div className="flex justify-between items-center text-sm text-neutral-600 dark:text-neutral-400 mb-8">
        <p>{formatDate(post.metadata.publishedAt)}</p>
      </div>

      {/* Blog content */}
      <article className="prose dark:prose-invert max-w-none">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
