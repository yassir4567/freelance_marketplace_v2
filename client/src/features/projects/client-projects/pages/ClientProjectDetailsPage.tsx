import { formatDate } from "@/utils/helpers";
import { useOutletContext } from "react-router-dom";
import type { ClientProjectDetails } from "../types/project.types";
import ProjectSummary from "../components/project-details/ProjectSummary";
import ProjectCategorySkills from "../components/project-details/ProjectCategorySkills";
import ProjectBudget from "../components/project-details/ProjectBudget";
import ProjectActivities from "../components/project-details/ProjectActivities";

function ClientProjectDetailsPage() {
  const { project } = useOutletContext<{ project: ClientProjectDetails }>();

  const projectSummary = {
    description: project.description,
    experienceLevel: project.experienceLevel,
    duration: project.duration,
    size: project.size,
  };

  const budgets = {
    budget: project.budget,
    finalPrice: project.finalPrice,
  };

  return (
    <div className="border-r border-r-gray-200">
      <div className="px-6 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Published at {formatDate(project.publishedAt)}
        </p>

        {project.deadline && (
          <p className="text-xs text-gray-500">
            Deadline {formatDate(project.deadline)}
          </p>
        )}
      </div>

      <hr className="bg-gray-900 mt-5 mb-12" />

      <ProjectSummary summary={projectSummary} />

      <hr className="bg-gray-900 my-9" />

      <ProjectBudget budgets={budgets} />

      <hr className="bg-gray-900 my-9" />

      <ProjectCategorySkills
        category={project.category}
        skills={project.skills}
      />

      <hr className="bg-gray-900 my-9" />

      <ProjectActivities proposalsCount={project.proposalsCount} />
    </div>
  );
}

export default ClientProjectDetailsPage;
