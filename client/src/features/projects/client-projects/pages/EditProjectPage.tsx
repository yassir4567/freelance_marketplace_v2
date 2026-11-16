import { useParams } from "react-router-dom";
import { useProject } from "../hooks/useProject";
import EditProjectForm from "../components/edit-project/EditProjectForm";
import { useCategory } from "@/hooks/useCategory";
import { useSkills } from "@/hooks/useSkill";
import EditProjectSkeleton from "../components/edit-project/EditProjectSkeleton";

function EditProjectPage() {
  const { id } = useParams();
  const {
    project,
    isLoading: isProjectLoading,
    error: projectError,
  } = useProject(id);
  const {
    categories,
    isLoading: isCategoriesLoading,
    error: categoryError,
  } = useCategory();

  const { skills, isLoading: isSkillsLoading, error: skillError } = useSkills();

  const isLoading = isCategoriesLoading || isSkillsLoading || isProjectLoading;

  if (isLoading) return <EditProjectSkeleton />;

  if (
    categoryError ||
    skillError ||
    projectError ||
    !project ||
    !categories ||
    !skills
  )
    return <div>Something error happen refresh to try again</div>;

  if (!project.isEditable) return null;

  return (
    <EditProjectForm
      project={project}
      categories={categories}
      skills={skills}
    />
  );
}

export default EditProjectPage;
