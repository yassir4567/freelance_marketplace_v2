import StateCard from "../../../../components/ui/StateCard";
import styles from "../styles/FreelancerDashboard.module.css";
import type { FreelancerDashboardStats } from "../types/dashboard.types";

interface DashboardOverviewProps {
  stats: FreelancerDashboardStats;
}

export default function DashboardOverview({ stats }: DashboardOverviewProps) {
  const statsCards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      description: "Projects you've worked on",
    },
    {
      title: "Active Contracts",
      value: stats.countActiveContracts,
      description: "Contracts currently in progress",
    },
    {
      title: "Total Earnings",
      value: `${stats.totalEarnings} $`,
      description: "Total earnings from completed work",
    },
    {
      title: "Escrow Payments",
      value: `${stats.escrowPayments} $`,
      description: "Payments currently held in escrow",
    },
  ];

  return (
    <div className={styles.overview}>
      <h1 className={styles["overview-title"]}>Overview</h1>
      <div className={styles["state-cards"]}>
        {statsCards.map((card) => (
          <StateCard key={card.title}>
            <div className={styles["card-header"]}>
              <h4 className={styles["card-title"]}>{card.title}</h4>
            </div>
            <div className={styles["card-value"]}>{card.value}</div>
            <p className={styles["card-description"]}>{card.description}</p>
          </StateCard>
        ))}
      </div>
    </div>
  );
}
