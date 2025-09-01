// app/blog/utils.ts
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const BLOG_PATH = path.join(process.cwd(), "content/blog")

export function getBlogSlugs() {
  return fs.readdirSync(BLOG_PATH).filter((file) => file.endsWith(".mdx"))
}

export function getBlogPosts() {
  return getBlogSlugs().map((slug) => {
    const realSlug = slug.replace(/\.mdx$/, "")
    const filePath = path.join(BLOG_PATH, slug)
    const fileContent = fs.readFileSync(filePath, "utf-8")

    const { data, content } = matter(fileContent)

    return {
      slug: realSlug,
      metadata: data,
      content,
    }
  })
}
