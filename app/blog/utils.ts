import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { slugify } from '../utils/slugify'

export type BlogMetadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
  tags?: string[]
}

const BLOG_PATH = path.join(process.cwd(), 'content/blog')

export function getBlogPosts(): {
  slug: string
  metadata: BlogMetadata
  content: string
}[] {
  const files = fs.readdirSync(BLOG_PATH).filter((f) => f.endsWith('.mdx'))
  return files.map((file) => {
    const filePath = path.join(BLOG_PATH, file)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    const fallback = file.replace(/\.mdx$/, '')
    return {
      slug: slugify(data.title || fallback),
      metadata: data as BlogMetadata,
      content,
    }
  })
}

export function readingTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  const mins = Math.max(1, Math.round(words / 230))
  return `${mins} min read`
}

export function formatDate(date: string, includeRelative = false) {
  if (!date || typeof date !== 'string') return 'Unknown date'
  const target = new Date(date.includes('T') ? date : `${date}T00:00:00`)
  const full = target.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  if (!includeRelative) return full

  const now = new Date()
  const diff = Math.floor(
    (now.getTime() - target.getTime()) / (1000 * 60 * 60 * 24)
  )
  let relative = 'Today'
  if (diff > 365) relative = `${Math.floor(diff / 365)}y ago`
  else if (diff > 30) relative = `${Math.floor(diff / 30)}mo ago`
  else if (diff > 0) relative = `${diff}d ago`

  return `${full} (${relative})`
}
