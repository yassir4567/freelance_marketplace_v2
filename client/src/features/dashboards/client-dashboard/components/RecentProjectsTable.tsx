import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/helpers";
import styles from "../styles/ClientDashboard.module.css";
import type { ClientDashboardRecentProject } from "../types/dashboard.types";

interface RecentProjectsTableProps {
  projects: ClientDashboardRecentProject[];
}

function RecentProjectsTable({ projects }: RecentProjectsTableProps) {
  return (
    <table className={styles["recent-projects-table"]}>
      <thead>
        <tr>
          <th className={styles["col-title"]}>Title</th>
          <th className={styles["col-status"]}>Status</th>
          <th className={styles["col-proposals"]}>Received Proposals</th>
          <th className={styles["col-published-date"]}>Published At</th>
          <th className={styles["col-actions"]}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id}>
            <td>{project.title}</td>
            <td>{project.status}</td>
            <td>{project.proposals_count}</td>
            <td>{formatDate(project.created_at)}</td>
            <td>
              <Link
                to={`/client/projects/${project.id}`}
                className={styles["view-details-action"]}
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
