import ProjectsList from "../components/projects-list/ProjectsList";
import { useProjects } from "../hooks/useProjects";
import ProjectListHeader from "../components/projects-list/ProjectListHeader";
import ProjectsListFilters from "../components/projects-list/ProjectsListFilters";
import { useProjectsFilters } from "../hooks/useProjectsFilters";
import ProjectCardSkeleton from "../components/projects-list/ProjectCardSkeleton";
import ProjectsErrorState from "../components/projects-list/ProjectsErrorState";

function ProjectsPage() {
  const { filters, onChangeFields, onChangeStatus } = useProjectsFilters();
  const { projects, isLoading, error, statusCode, retry } =
    useProjects(filters);

  return (
    <div>
      <ProjectListHeader />
      <ProjectsListFilters
        filters={filters}
        onChangeFields={onChangeFields}
        onChangeStatus={onChangeStatus}
      />
      {isLoading ? (
        <div>
          {Array.from({ length: 4 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : error !== "" ? (
        <ProjectsErrorState
          error={error}
          onRetry={retry}
          statusCode={statusCode}
        />
      ) : (
        <ProjectsList projects={projects} />
      )}
    </div>
  );
}

export default ProjectsPage;
