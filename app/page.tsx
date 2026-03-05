import { getBlogPosts, readingTime } from './blog/utils'
import { getAllProjects } from './projects/utils'
import { HomeClient } from './components/home-client'

export default function Page() {
  const projects = getAllProjects().slice(0, 3)
  const posts = getBlogPosts()
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      metadata: p.metadata,
      readTime: readingTime(p.content),
    }))

  return (
    <HomeClient
      projects={projects.map((p) => ({
        slug: p.slug,
        title: p.metadata.title,
        description: p.metadata.description,
        image: p.metadata.image,
      }))}
      posts={posts.map((p) => ({
        slug: p.slug,
        title: p.metadata.title,
        summary: p.metadata.summary || '',
        image: p.metadata.image,
        readTime: p.readTime,
      }))}
    />
  )
}
