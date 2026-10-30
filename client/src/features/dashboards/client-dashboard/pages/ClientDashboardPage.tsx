import ClientDashboardHeader from "../components/DashboardHeader";
import DashboardRecentProjects from "../components/DashboardRecentProjects";
import DashboardStats from "../components/DashboardStats";
import useDashboard from "../hooks/useDashboard";

export default function ClientDashboardPage() {
  const { data, isLoading, error } = useDashboard();

  // todo : I'll improve it later
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <ClientDashboardHeader />
      <div className="mt-12">
        <div>
          <h1 className="text-xl font-medium mb-5">Overview</h1>
          <DashboardStats data={data} isLoading={isLoading} />
        </div>
        <DashboardRecentProjects data={data} isLoading={isLoading} />
      </div>
    </div>
  );
}
