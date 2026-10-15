import { useRequiredAuth } from "../../../../context/AuthContext";
import styles from "../styles/FreelancerDashboard.module.css";

export default function DashboardHeader() {
  const { user } = useRequiredAuth();

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles.welcome}>Welcome {user.firstName}</h1>
        <p className={styles.description}>
          Here's what's happening with your contracts.
        </p>
      </div>
    </div>
  );
}
