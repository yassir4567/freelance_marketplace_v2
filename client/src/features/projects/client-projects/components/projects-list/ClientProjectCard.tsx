import { Link } from "react-router-dom";
import type { ClientProjectList } from "../../types/project.types";
import { formatDate, removeUnderScore } from "@/utils/helpers";

interface ClientProjectCardProps {
  project: ClientProjectList;
}

function ClientProjectCard({ project }: ClientProjectCardProps) {
  console.log(project);

  return (
    <div className="w-full border-t border-t-gray-200 py-6 px-6 hover:bg-gray-50">
      <div className="flex-1 flex gap-5">
        <div className="flex-1">
          <h3 className="text-md mb-1.5">{project.title}</h3>
          <p className="text-xs mb-2.5 pl-2 text-gray-600 flex items-center gap-1">
            <span>{project.category.name}</span>-
            <span>Published at {formatDate(project.publishedAt)}</span>
          </p>
          {project.freelancer && (
            <div className="pl-2 flex items-center gap-4">
              <h4 className="text-xs">Working with</h4>
              <p className="text-gray-500 text-xs capitalize">
                {project.freelancer.firstName +
                  " " +
                  project.freelancer.lastName}
              </p>
            </div>
          )}
        </div>

        <div className="flex">
          <div className="w-38">
            <p className="text-xs text-gray-500 font-medium mb-2">Budget</p>
            <p className="text-sm text-gray-600">{project.budget}$</p>
          </div>
          {project.deadline && (
            <div className="w-38">
              <p className="text-xs text-gray-500 font-medium mb-2">Deadline</p>
              <p className="text-sm text-gray-600">
                {formatDate(project.deadline)}
              </p>
            </div>
          )}
          <div className="w-38">
            <p className="text-xs text-gray-500 font-medium mb-2">Status</p>
            <p className="text-sm text-gray-600 capitalize">
              {removeUnderScore(project.status)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <Link
          to={`/client/projects/${project.id}`}
          className="text-xs border border-blue-500 py-1 rounded-xl text-blue-600 px-4 flex items-center justify-center hover:bg-blue-500 hover:text-white transition"
        >
          Details
        </Link>
        <Link
          to={`/client/projects/${project.id}/proposals`}
          className="text-xs border border-blue-500 py-1 rounded-xl text-blue-600 px-4 flex items-center justify-center hover:bg-blue-500 hover:text-white transition"
        >
          View Proposals
        </Link>
        <Link
          to={`/client/projects/${project.id}/edit`}
          className="text-xs border border-blue-500 py-1 rounded-xl text-blue-600 px-4 flex items-center justify-center hover:bg-blue-500 hover:text-white transition"
        >
          Edit Project
        </Link>
      </div>
    </div>
  );
}

export default ClientProjectCard;
