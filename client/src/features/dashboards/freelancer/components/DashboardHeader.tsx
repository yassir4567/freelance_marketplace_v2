import styles from "../styles/FreelancerDashboard.module.css";

interface DashboardHeaderProps {
  firstName: string;
}

export default function DashboardHeader({ firstName }: DashboardHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome {firstName}</h1>
        <p className={styles.subTitle}>
          Here's what's happening with your contracts.
        </p>
      </div>
    </div>
  );
}
