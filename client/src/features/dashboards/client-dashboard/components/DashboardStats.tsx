import type { ClientDashboardData } from "../types/dashboard.types";

interface DashboardStatsProps {
  data: ClientDashboardData | null;
  isLoading: boolean;
}

function DashboardStats({ data, isLoading }: DashboardStatsProps) {
  const statsCards = [
    {
      title: "Total Projects",
      value: data?.stats.totalProjects ?? 0,
      description: "Projects you've posted",
    },
    {
      title: "Active Contracts",
      value: data?.stats.activeContracts ?? 0,
      description: "Contracts currently in progress",
    },
    {
      title: "Completed Projects",
      value: data?.stats.completedProjects ?? 0,
      description: "Projects successfully completed",
    },
    {
      title: "Hired Freelancers",
      value: data?.stats.hiredFreelancers ?? 0,
      description: "Freelancers you've hired",
    },
    {
      title: "Total Spending",
      value: `${data?.stats.totalSpending ?? 0} $`,
      description: "Total amount spent on projects",
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-4 mb-10">
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

export default DashboardStats;
