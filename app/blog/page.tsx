import { getBlogPosts, readingTime } from './utils'
import { BlogGrid } from '../components/blog-grid'

export const metadata = {
  title: 'Blog',
  description:
    'Thoughts on architecture, computation, digital fabrication, and the craft of making.',
}

export default function BlogPage() {
  const posts = getBlogPosts()
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
    .map((p) => ({
      slug: p.slug,
      metadata: p.metadata,
      readTime: readingTime(p.content),
    }))

  return (
    <section className="max-w-5xl mx-auto px-6 pt-28 pb-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-white">
        Blog
      </h1>
      <p className="text-base text-neutral-400 mb-12 text-center max-w-lg mx-auto">
        Thoughts on architecture, computation, and the craft of making.
      </p>
      <BlogGrid posts={posts} />
    </section>
  )
}
