import { getAllProjects } from './utils'
import ProjectsClientPage from './ProjectsClientPage'

export default function ProjectsPage() {
  const projects = getAllProjects()
  return <ProjectsClientPage projects={projects} />
}
