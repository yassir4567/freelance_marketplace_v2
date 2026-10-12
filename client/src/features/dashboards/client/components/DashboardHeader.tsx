import { Link } from "react-router-dom";
import styles from "../styles/ClientDashboard.module.css";
import { LuPlus } from "react-icons/lu";

interface DashboardHeaderProps {
  firstName: string;
}

export default function DashboardHeader({ firstName }: DashboardHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome {firstName}</h1>
        <p className={styles.subTitle}>
          Here's what's happening with your projects.
        </p>
      </div>

      <div className={styles.actions}>
        <Link to="/client/post-project" className={styles["post-project-btn"]}>
          <span>Post Project</span>
          <LuPlus />
        </Link>
      </div>
    </div>
  );
}
