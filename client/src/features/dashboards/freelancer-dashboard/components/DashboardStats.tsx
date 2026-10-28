import type { FreelancerDashboardData } from "../types/dashboard.types";

interface DashboardStatsProps {
  data: FreelancerDashboardData | null;
  isLoading: boolean;
}

export default function DashboardStats({
  data,
  isLoading,
}: DashboardStatsProps) {
  const statsCards = [
    {
      title: "Total Projects",
      value: data?.stats.totalProjects ?? 0,
      description: "Projects you've worked on",
    },
    {
      title: "Active Contracts",
      value: data?.stats.countActiveContracts ?? 0,
      description: "Contracts currently in progress",
    },
    {
      title: "Total Earnings",
      value: `${data?.stats.totalEarnings ?? 0} $`,
      description: "Total earnings from completed work",
    },
    {
      title: "Escrow Payments",
      value: `${data?.stats.escrowPayments ?? 0} $`,
      description: "Payments currently held in escrow",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {statsCards.map((card) => (
        <div
          key={card.title}
          className="w-full border border-gray-200 rounded-md px-3 py-5 flex justify-between items-center gap-2.5"
        >
          <div>
            <h4 className="text-sm text-blue-600 mb-1">{card.title}</h4>
            <p className="text-xs text-gray-600">{card.description}</p>
          </div>
          <div className="text-md">{isLoading ? "..." : card.value}</div>
        </div>
      ))}
    </div>
  );
}
