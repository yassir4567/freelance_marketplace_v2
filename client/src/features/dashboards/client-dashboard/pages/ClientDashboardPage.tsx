import LoadingScreen from "../../../../components/ui/LoadingScreen";
import ClientDashboardHeader from "../components/DashboardHeader";
import DashboardRecentProjects from "../components/DashboardRecentProjects";
import DashboardStats from "../components/DashboardStats";
import useDashboard from "../hooks/useDashboard";

export default function ClientDashboardPage() {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <LoadingScreen
        text="Loading..."
        placeholder="Please wait while we fetch the dashboard data."
      />
    );
  }

  if (!data) return null;

  return (
    <div>
      <ClientDashboardHeader />
      <div className="mt-12 grid grid-cols-[320px_1fr] gap-4">
        <DashboardStats stats={data.stats} />
        <DashboardRecentProjects projects={data.recentProjects} />
      </div>
    </div>
  );
}
