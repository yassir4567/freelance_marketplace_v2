import { formatDate } from "@/utils/helpers";
import { Link, useOutletContext } from "react-router-dom";
import type { ClientProjectDetails } from "../types/project.types";
import ProjectSummary from "../components/project-details/ProjectSummary";
import ProjectCategorySkills from "../components/project-details/ProjectCategorySkills";
import ProjectBudget from "../components/project-details/ProjectBudget";
import ProjectActivities from "../components/project-details/ProjectActivities";
import { useState } from "react";
import CloseProjectConfirmation from "../components/modals/CloseProjectConfirmation";

function ProjectDetailsPage() {
  const { project } = useOutletContext<{ project: ClientProjectDetails }>();
  const [showCloseProject, setShowCloseProject] = useState(false);

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
    <div className="border-r border-r-gray-200 mb-50">
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

      <hr className="bg-gray-900 my-9" />

      {["open", "in_review"].includes(project.status) && (
        <div className="px-6">
          <h4 className="text-lg font-medium mb-1">Actions</h4>
          <div className="flex items-center gap-5">
            <Link
              to={`/client/projects/${project.id}/edit`}
              className="text-blue-500 border-b border-b-blue-400 hover:text-blue-600 hover:border-b-blue-500"
            >
              Edit
            </Link>
            <button
              onClick={() => setShowCloseProject(true)}
              type="button"
              className="text-red-500 border-b border-b-red-400 hover:text-red-600 hover:border-b-red-500"
            >
              Close project
            </button>
          </div>
        </div>
      )}

      {showCloseProject && (
        <CloseProjectConfirmation
          onCloseModal={() => setShowCloseProject(false)}
          projectId={String(project.id)}
        />
      )}
    </div>
  );
}

export default ProjectDetailsPage;
