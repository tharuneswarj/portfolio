import Image from "next/image"
import Link from "next/link"
import { getAllProjects } from "./projects/utils"

function formatHighlightCopy(
  title: string,
  description: string
) {
  return { title, description }
}

export default function Page() {
  const projects = getAllProjects()
    .sort((a, b) => {
      const aDate = new Date(a.metadata.publishedAt || 0).getTime()
      const bDate = new Date(b.metadata.publishedAt || 0).getTime()
      return bDate - aDate
    })
    .slice(0, 3)

  const highlights = [
    formatHighlightCopy(
      "Architecture with a computational core",
      "I design spatial systems that blend geometry, material behavior, and digital workflows."
    ),
    formatHighlightCopy(
      "Digital fabrication experiments",
      "From clay extrusion to CNC assemblies, I prototype how tools can shape new craft."
    ),
    formatHighlightCopy(
      "Research-driven storytelling",
      "Every project is documented with process notes, visuals, and learnings you can reuse."
    ),
  ]

  return (
    <main className="flex flex-col gap-20 px-6 pb-20 pt-16">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 text-center">
        <div className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-4 py-1 text-sm font-medium text-neutral-600 shadow-sm dark:border-neutral-800 dark:text-neutral-300">
          Architect · Computational Designer · Maker
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl md:text-6xl">
          I build spatial ideas into tangible systems.
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-neutral-600 dark:text-neutral-300 sm:text-xl">
          Hi, I’m Tharun Eswar. I work at the intersection of architecture, computation, and
          digital fabrication - translating research into meaningfull spaces and products.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/projects"
            className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
          >
            Explore projects
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:-translate-y-0.5 hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:text-white"
          >
            Read my blog to see what Iâ€™m building
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:-translate-y-0.5 hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:text-white"
          >
            Start a collaboration
          </Link>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-3">
        {highlights.map((highlight) => (
          <div
            key={highlight.title}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
          >
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {highlight.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {highlight.description}
            </p>
          </div>
        ))}
      </section>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Featured projects
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              A snapshot of recent work across research, fabrication, and spatial design.
            </p>
          </div>
          <Link
            href="/projects"
            className="text-sm font-semibold text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
          >
            View all projects →
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={project.metadata.image}
                  alt={project.metadata.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  {project.metadata.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {project.metadata.description}
                </p>
                <span className="mt-auto text-sm font-semibold text-neutral-700 transition group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-white">
                  Read the case study →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl rounded-3xl border border-neutral-200 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 px-8 py-10 text-center text-white shadow-lg dark:border-neutral-800">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Let’s shape your next prototype or installation.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-200 sm:text-base">
          I’m open to collaborations in architecture, material research, and computational
          workflows. Share your idea and let’s build something remarkable.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:-translate-y-0.5 hover:bg-neutral-100"
        >
          Contact me
        </Link>
      </section>
    </main>
  )
}
