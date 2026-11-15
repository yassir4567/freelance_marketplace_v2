import type { ClientProjectList } from "../../types/project.types";
import ProjectCard from "./ProjectCard";

interface ProjectsListProps {
  projects: ClientProjectList[] | null;
}

function ProjectsList({ projects }: ProjectsListProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-red-600 flex items-center justify-center h-100">
        No projects found
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export default ProjectsList;
