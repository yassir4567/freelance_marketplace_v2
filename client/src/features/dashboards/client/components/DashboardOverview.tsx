import { Link } from "react-router-dom";
import StateCard from "../../../../components/ui/StateCard";
import styles from "../styles/ClientDashboard.module.css";
import type { ClientDashboardStats } from "../types/dashboard.types";
import { MdArrowOutward } from "react-icons/md";

interface DashboardOverviewProps {
  stats: ClientDashboardStats;
}

export default function DashboardOverview({ stats }: DashboardOverviewProps) {
  const statsCards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      to: "/client/projects",
      description: "The total number of projects you have published.",
    },
    {
      title: "Active Contracts",
      value: stats.activeContracts,
      to: "/client/contracts?status=active",
      description: "The number of contracts currently in progress.",
    },
    {
      title: "Completed Projects",
      value: stats.completedProjects,
      to: "/client/projects?status=completed",
      description: "The total number of projects successfully completed.",
    },
    {
      title: "Hired Freelancers",
      value: stats.hiredFreelancers,
      to: null,
      description: "The total number of freelancers you have hired.",
    },
    {
      title: "Total Spending",
      value: `${stats.totalSpending} $`,
      to: null,
      description: "The total amount you have spent on freelance projects.",
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
              {card.to !== null && (
                <Link to={card.to} className={styles["card-link"]}>
                  <MdArrowOutward />
                </Link>
              )}
            </div>
            <div className={styles["card-value"]}>{card.value}</div>
            <p className={styles["card-description"]}>{card.description}</p>
          </StateCard>
        ))}
      </div>
    </div>
  );
}
