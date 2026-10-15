import { Link } from "react-router-dom";
import styles from "../styles/ClientDashboard.module.css";
import type { ClientDashboardRecentProject } from "../types/dashboard.types";
import { MdArrowOutward } from "react-icons/md";
import RecentProjectsTable from "./RecentProjectsTable";

interface DashboardRecentProjectsProps {
  projects: ClientDashboardRecentProject[];
}

function DashboardRecentProjects({ projects }: DashboardRecentProjectsProps) {
  return (
    <div className={styles["recent-projects"]}>
      <div className={styles["recent-projects-header"]}>
        <h5 className={styles["recent-projects-title"]}>Recent Projects</h5>
        <Link to="/client/projects" className={styles["recent-projects-link"]}>
          <span>View all</span>
          <MdArrowOutward />
        </Link>
      </div>
      <div className={styles["recent-projects-table-container"]}>
        {projects.length >= 0 ? (
          <RecentProjectsTable projects={projects} />
        ) : (
          <div className={styles["recent-projects-empty-stats"]}>
            You have not any projects yet
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardRecentProjects;
