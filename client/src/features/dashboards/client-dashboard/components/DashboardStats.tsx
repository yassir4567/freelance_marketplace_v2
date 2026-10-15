import StateCard from "../../../../components/ui/StateCard";
import styles from "../styles/ClientDashboard.module.css";
import type { ClientDashboardStats } from "../types/dashboard.types";

interface DashboardStatsProps {
  stats: ClientDashboardStats;
}

function DashboardStats({ stats }: DashboardStatsProps) {
  const statsCards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      description: "Projects you've posted",
    },
    {
      title: "Active Contracts",
      value: stats.activeContracts,
      description: "Contracts currently in progress",
    },
    {
      title: "Completed Projects",
      value: stats.completedProjects,
      description: "Projects successfully completed",
    },
    {
      title: "Hired Freelancers",
      value: stats.hiredFreelancers,
      description: "Freelancers you've hired",
    },
    {
      title: "Total Spending",
      value: `${stats.totalSpending} $`,
      description: "Total amount spent on projects",
    },
  ];
  return (
    <div className={styles["stats-container"]}>
      {statsCards.map((card) => (
        <StateCard>
          <div className={styles["card-content"]}>
            <h3 className={styles["card-title"]}>{card.title}</h3>
            <p className={styles["card-description"]}>{card.description}</p>
          </div>
          <div className={styles["card-value"]}>{card.value}</div>
        </StateCard>
      ))}
    </div>
  );
}

export default DashboardStats;
