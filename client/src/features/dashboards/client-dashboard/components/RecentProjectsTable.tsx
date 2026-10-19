import { Link } from "react-router-dom";
import type { ClientDashboardRecentProject } from "../types/dashboard.types";
import { formatDate } from "@/utils/helpers";

interface RecentProjectsTableProps {
  projects: ClientDashboardRecentProject[];
}

function RecentProjectsTable({ projects }: RecentProjectsTableProps) {
  return (
    <table className="w-full table-fixed border-collapse">
      <thead className="h-15">
        <tr>
          <th className="text-center w-full p-4 border-b border-solid border-gray-300 text-gray-400 text-xs font-medium tracking-wide">
            Title
          </th>
          <th className="text-center w-32 p-4 border-b border-solid border-gray-300 text-gray-400 text-xs font-medium tracking-wide">
            Status
          </th>
          <th className="text-center w-32 p-4 border-b border-solid border-gray-300 text-gray-400 text-xs font-medium tracking-wide">
            Received Proposals
          </th>
          <th className="text-center w-32 p-4 border-b border-solid border-gray-300 text-gray-400 text-xs font-medium tracking-wide">
            Published At
          </th>
          <th className="text-center w-32 p-4 border-b border-solid border-gray-300 text-gray-400 text-xs font-medium tracking-wide">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id}>
            <td className="p-4 border-b border-solid border-gray-300 text-sm">
              {project.title}
            </td>
            <td className="p-4 border-b border-solid border-gray-300 text-sm">
              {project.status}
            </td>
            <td className="p-4 border-b border-solid border-gray-300 text-sm">
              {project.proposals_count}
            </td>
            <td className="p-4 border-b border-solid border-gray-300 text-sm">
              {formatDate(project.publishedAt)}
            </td>
            <td className="p-4 border-b border-solid border-gray-300 text-sm">
              <Link
                to={`/client/projects/${project.id}`}
                className="text-xs text-blue-500 hover:text-blue-600"
              >
                View details
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RecentProjectsTable;
