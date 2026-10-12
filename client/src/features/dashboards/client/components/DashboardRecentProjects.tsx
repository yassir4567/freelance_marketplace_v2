import { Link } from "react-router-dom";
import styles from "../styles/ClientDashboard.module.css";
import type { ClientDashboardRecentProject } from "../types/dashboard.types";
import { MdArrowOutward } from "react-icons/md";
import RecentProjectsTable from "./RecentProjectsTable";

interface DashboardRecentProjectsProps {
  recentProjects: ClientDashboardRecentProject[];
}

export default function DashboardRecentProjects({
  recentProjects,
}: DashboardRecentProjectsProps) {
  return (
    <div className={styles["recent-projects-container"]}>
      <div className={styles["recent-projects-header"]}>
        <h3 className={styles["recent-projects-title"]}>Recent Projects</h3>
        <Link to="/client/projects" className={styles["recent-projects-link"]}>
          <span>View all projects</span>
          <MdArrowOutward />
        </Link>
      </div>
      <RecentProjectsTable recentProjects={recentProjects} />
    </div>
  );
}
