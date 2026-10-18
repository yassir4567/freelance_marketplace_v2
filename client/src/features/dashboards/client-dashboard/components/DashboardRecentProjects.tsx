import { Link } from "react-router-dom";
import type { ClientDashboardRecentProject } from "../types/dashboard.types";
import { MdArrowOutward } from "react-icons/md";
import RecentProjectsTable from "./RecentProjectsTable";

interface DashboardRecentProjectsProps {
  projects: ClientDashboardRecentProject[];
}

function DashboardRecentProjects({ projects }: DashboardRecentProjectsProps) {
  return (
    <div className="mt-3">
      <div className="flex justify-between">
        <h5 className="text-md font-medium text-blue-500">Recent Projects</h5>
        <Link
          to="/client/projects"
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
        >
          <span>View all</span>
          <MdArrowOutward />
        </Link>
      </div>
      <div className="w-full mt-4">
        {projects.length >= 0 ? (
          <RecentProjectsTable projects={projects} />
        ) : (
          <div className="text-red-500 mt-25 text-center bg-gray-100 h-12 flex items-center justify-center rounded-lg text-sm">
            You have not had any projects yet
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardRecentProjects;
