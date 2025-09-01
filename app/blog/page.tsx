import Link from "next/link"
import Image from "next/image"
import { getBlogPosts } from "./utils"
import { formatDate } from "./utils"

export default function BlogPage() {
  const posts = getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  )

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        Blog
      </h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12 text-center">
        Thoughts on architecture, computation, and digital fabrication.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-neutral-900"
          >
            {/* Image */}
            <div className="relative w-full h-40">
              {post.metadata.image ? (
                <Image
                  src={post.metadata.image}
                  alt={post.metadata.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl bg-neutral-100 dark:bg-neutral-800">
                  📝
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 group-hover:text-red-500 transition-colors">
                {post.metadata.title}
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                {post.metadata.summary}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {formatDate(post.metadata.publishedAt)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
