import ClientDashboardHeader from "../components/DashboardHeader";
import DashboardRecentProjects from "../components/DashboardRecentProjects";
import DashboardStats from "../components/DashboardStats";
import useDashboard from "../hooks/useDashboard";

export default function ClientDashboardPage() {
  const { data, isLoading, error } = useDashboard();

  // todo : I'll improve it later
  if(error) {
   return  <div className="text-red-500">{error}</div>
  }

  return (
    <div>
      <ClientDashboardHeader />
      <div className="mt-12 grid grid-cols-[320px_1fr] gap-4">
        <DashboardStats data={data} isLoading={isLoading} />
        <DashboardRecentProjects data={data} isLoading={isLoading} />
      </div>
    </div>
  );
}
