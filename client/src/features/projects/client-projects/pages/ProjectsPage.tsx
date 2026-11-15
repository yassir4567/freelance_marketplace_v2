import ProjectsList from "../components/projects-list/ProjectsList";
import { useProjects } from "../hooks/useProjects";
import ProjectListHeader from "../components/projects-list/ProjectListHeader";
import ProjectsListFilters from "../components/projects-list/ProjectsListFilters";
import { useProjectsFilters } from "../hooks/useProjectsFilters";

function ProjectsPage() {
  const { filters, onChangeFields, onChangeStatus } = useProjectsFilters();
  const { projects, isLoading, error } = useProjects(filters);

  return (
    <div>
      <ProjectListHeader />
      <ProjectsListFilters
        filters={filters}
        onChangeFields={onChangeFields}
        onChangeStatus={onChangeStatus}
      />
      <ProjectsList
        isLoading={isLoading}
        error={error}
        projects={projects}
      />
    </div>
  );
}

export default ProjectsPage;
