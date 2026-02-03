import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { slugify } from "../utils/slugify"

const PROJECTS_PATH = path.join(process.cwd(), "content/projects")

export function getProjectSlugs() {
  return fs.readdirSync(PROJECTS_PATH).filter((file) => file.endsWith(".mdx"))
}

export function getProjectBySlug(slug: string) {
  const projects = getAllProjects()
  return projects.find((project) => project.slug === slug)
}

export function getAllProjects() {
  const slugs = getProjectSlugs()
  return slugs.map((slug) => {
    const realSlug = slug.replace(/\.mdx$/, "")
    const filePath = path.join(PROJECTS_PATH, `${realSlug}.mdx`)
    const fileContent = fs.readFileSync(filePath, "utf-8")

    const { data, content } = matter(fileContent)
    const slugSource = (data as { title?: string }).title || realSlug

    return {
      slug: slugify(slugSource),
      metadata: data,
      content,
    }
  })
}
