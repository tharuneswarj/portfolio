import { getAllProjects } from './utils'
import { ProjectsList } from '../components/projects-list'

export const metadata = {
  title: 'Projects',
  description:
    'Architecture, computational design, and digital fabrication work.',
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <section className="max-w-5xl mx-auto pt-28 pb-20">
      <div className="px-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-white">
          Projects
        </h1>
        <p className="text-base text-neutral-400 text-center max-w-lg mx-auto">
          Architecture, computational design, and digital fabrication.
        </p>
      </div>
      <ProjectsList projects={projects} />
    </section>
  )
}
