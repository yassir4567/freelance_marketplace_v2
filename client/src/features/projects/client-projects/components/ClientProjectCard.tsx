import { FaRegUser } from "react-icons/fa6";
import { VscProjectCompact } from "react-icons/vsc";
import { Link } from "react-router-dom";
import type { ClientProjectList } from "../types/project.types";
import { formatDate, removeUnderScore } from "@/utils/helpers";

interface ClientProjectCardProps {
  project: ClientProjectList;
}

function ClientProjectCard({ project }: ClientProjectCardProps) {
  return (
    <div className="w-full flex border border-gray-100 shadow-sm px-8 py-7 rounded-xl ">
      <div className="flex-1">
        <div className="flex items-center gap-4">
          <VscProjectCompact size={30} />
          <div>
            <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
            <p className="text-sm pl-2 text-gray-600 flex items-center gap-1">
              <span>{project.category.name}</span>-
              <span>Published at {formatDate(project.publishedAt)}</span>
            </p>
          </div>
        </div>

        <div className="mt-10 flex w-[80%]">
          <div className="w-38">
            <p className="text-sm font-semibold mb-2 text-sky-700">Budget</p>
            <p className="text-sm text-gray-600">{project.budget}$</p>
          </div>
          {project.deadline && (
            <div className="w-38">
              <p className="text-sm font-semibold mb-2 text-sky-700">
                Deadline
              </p>
              <p className="text-sm text-gray-600">
                {formatDate(project.deadline)}
              </p>
            </div>
          )}
          <div className="w-38  ">
            <p className="text-sm font-semibold mb-2 text-sky-700">Status</p>
            <p className="text-sm text-gray-600 capitalize">
              {removeUnderScore(project.status)}
            </p>
          </div>
        </div>

        {project.freelancer && (
          <div className="mt-10 flex items-center gap-4">
            <FaRegUser size={20} />
            <div>
              <h4 className="font-medium text-sm text-sky-700">Freelancer</h4>
              <p className="text-gray-500 text-md capitalize">
                {project.freelancer.firstName +
                  " " +
                  project.freelancer.lastName}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="w-[15%] flex flex-col">
        <Link
          to={`/client/projects/${project.id}`}
          className="w-full border border-blue-500 text-blue-500 mb-3 rounded-lg h-8 flex items-center justify-center hover:text-white hover:bg-blue-500 transition"
        >
          Details
        </Link>
        <Link
          to={`/client/projects/${project.id}/proposals`}
          className="w-full border border-blue-500 text-blue-500 mb-3 rounded-lg h-8 flex items-center justify-center hover:text-white hover:bg-blue-500 transition"
        >
          Proposals
        </Link>
        <Link
          to={`/client/projects/$${project.id}/edit`}
          className="w-full border border-blue-500 text-blue-500 mb-3 rounded-lg h-8 flex items-center justify-center hover:text-white hover:bg-blue-500 transition"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}

export default ClientProjectCard;
