import StateCard from "@/components/ui/StateCard";
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
    <div className="flex flex-col gap-4">
      {statsCards.map((card) => (
        <StateCard>
          <div>
            <h3 className="text-sm text-blue-600 mb-1">{card.title}</h3>
            <p className="text-xs text-gray-600">{card.description}</p>
          </div>
          <div className="text-md">{card.value}</div>
        </StateCard>
      ))}
    </div>
  );
}

export default DashboardStats;
