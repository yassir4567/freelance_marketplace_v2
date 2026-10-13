import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/helpers";
import styles from "../styles/ClientDashboard.module.css";
import type { ClientDashboardRecentProject } from "../types/dashboard.types";

interface RecentProjectsTableProps {
  recentProjects: ClientDashboardRecentProject[];
}

export default function RecentProjectsTable({
  recentProjects,
}: RecentProjectsTableProps) {
  return (
    <table className={styles["recent-projects-table"]} cellSpacing={0}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Published At</th>
          <th>Total Proposals</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {recentProjects.map((project) => (
          <tr key={project.id}>
            <td>{project.title}</td>
            <td>{project.status}</td>
            <td>{formatDate(project.created_at)}</td>
            <td>{project.proposals_count}</td>
            <td>
              <Link
                to={`/client/projects/${project.id}`}
                className={styles["recent-project-link"]}
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
