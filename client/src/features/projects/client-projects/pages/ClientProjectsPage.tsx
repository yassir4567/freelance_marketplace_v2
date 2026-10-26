import ClientProjectsList from "../components/ClientProjectsList";
import { useProjects } from "../hooks/useProjects";
import ProjectListHeader from "../components/ProjectListHeader";
import ProjectsListFilters from "../components/ProjectsListFilters";
import { useProjectsFilters } from "../hooks/useProjectsFilters";

function ClientProjectsPage() {
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
      <ClientProjectsList
        isLoading={isLoading}
        error={error}
        projects={projects}
      />
    </div>
  );
}

export default ClientProjectsPage;
