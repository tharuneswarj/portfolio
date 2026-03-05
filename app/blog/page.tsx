import { getBlogPosts } from './utils'
import BlogClientPage from './BlogClientPage'

export default function BlogPage() {
  const posts = getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  )
  return <BlogClientPage posts={posts} />
}
