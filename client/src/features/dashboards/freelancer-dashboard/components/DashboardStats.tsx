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
    <div className="grid grid-cols-2 gap-4 mb-10">
      {statsCards.map((card) => (
        <div
          key={card.title}
          className="w-full border border-gray-200 rounded-xl px-4 py-7 flex justify-between items-center gap-2.5"
        >
          <div>
            <h3 className="text-md font-medium mb-2">{card.title}</h3>
            <p className="text-xs text-gray-600">{card.description}</p>
          </div>
          <div className="text-xl font-bold">
            {isLoading ? "..." : card.value}
          </div>
        </div>
      ))}
    </div>
  );
}
