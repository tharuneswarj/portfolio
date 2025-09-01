import Link from "next/link"
import { formatDate, getBlogPosts } from "app/blog/utils"

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div className="space-y-6">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            {/* Date */}
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {formatDate(post.metadata.publishedAt, false)}
            </p>

            {/* Title */}
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.metadata.title}
            </h3>

            {/* Summary */}
            {post.metadata.summary && (
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                {post.metadata.summary}
              </p>
            )}

            {/* Tags */}
            {post.metadata.tags && (
              <div className="flex flex-wrap gap-2 mt-2">
                {post.metadata.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
    </div>
  )
}
