import Link from "next/link"
import Image from "next/image"
import { getAllProjects } from "./utils"

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        Projects
      </h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12 text-center">
        A curated selection of my architecture, computational design, and digital fabrication work.
      </p>

      <div className="grid gap-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block rounded-xl overflow-hidden shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full"
          >
            <div className="relative w-full h-56">
              <Image
                src={project.metadata.image}
                alt={project.metadata.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <h2 className="text-xl font-semibold group-hover:text-red-500 transition-colors">
                {project.metadata.title}
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 flex-grow">
                {project.metadata.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
