import { useParams } from "react-router-dom";
import { useProject } from "../hooks/useProject";
import EditProjectForm from "../components/edit-project/EditProjectForm";

function ClientEditProjectPage() {
  const { id } = useParams();
  const { project, isLoading, error } = useProject(id);

  if (isLoading) return <div>Loading project data...</div>;

  if (error) return <div>{error}</div>;

  if (!project) return <div>No data found</div>;

  if (!project.isEditable) return null;

  return (
    <div>
      <EditProjectForm project={project} />
    </div>
  );
}

export default ClientEditProjectPage;
