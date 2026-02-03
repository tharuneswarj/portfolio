// app/blog/utils.ts
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { slugify } from "../../utils/slugify"

// ✅ Strong type for blog frontmatter
export type BlogMetadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
  tags?: string[]   // 👈 added
}

const BLOG_PATH = path.join(process.cwd(), "content/blog")

export function getBlogSlugs() {
  return fs.readdirSync(BLOG_PATH).filter((file) => file.endsWith(".mdx"))
}

export function getBlogPosts(): {
  slug: string
  metadata: BlogMetadata
  content: string
}[] {
  return getBlogSlugs().map((slug) => {
    const realSlug = slug.replace(/\.mdx$/, "")
    const filePath = path.join(BLOG_PATH, slug)
    const fileContent = fs.readFileSync(filePath, "utf-8")

    const { data, content } = matter(fileContent)
    const slugSource = (data as BlogMetadata).title || realSlug

    return {
      slug: slugify(slugSource),
      metadata: data as BlogMetadata, // ✅ cast as typed metadata
      content,
    }
  })
}
