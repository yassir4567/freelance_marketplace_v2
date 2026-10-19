import StateCard from "@/components/ui/StateCard";
import type { FreelancerDashboardStats } from "../types/dashboard.types";

interface DashboardStatsProps {
  stats: FreelancerDashboardStats;
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
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
    <div className="flex flex-col gap-4">
      {statsCards.map((card) => (
        <StateCard key={card.title}>
          <div>
            <h4 className="text-sm text-blue-600 mb-1">{card.title}</h4>
            <p className="text-xs text-gray-600">{card.description}</p>
          </div>
          <div className="text-md">{card.value}</div>
        </StateCard>
      ))}
    </div>
  );
}
