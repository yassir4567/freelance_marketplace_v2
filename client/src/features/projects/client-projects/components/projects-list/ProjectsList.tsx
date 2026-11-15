import type { ClientProjectList } from "../../types/project.types";
import ProjectCard from "./ProjectCard";

interface ProjectsListProps {
  projects: ClientProjectList[] | null;
  isLoading: boolean;
  error: string;
}

function ProjectsList({
  projects,
  isLoading,
  error,
}: ProjectsListProps) {
  // todo : This loading state is temporaryy I'll improve it later with all the other loading states
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-100">
        Loading Projects ...
      </div>
    );
  }

  // todo : Also this error state is temporary
  if (error) {
    return <div className="text-red-600">{error}</div>;
  }
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
