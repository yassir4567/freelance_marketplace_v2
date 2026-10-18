import LoadingScreen from "../../../../components/ui/LoadingScreen";
import DashboardActiveContracts from "../components/DashboardActiveContracts";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import useDashboard from "../hooks/useDashboard";

export default function FreelancerDashboardPage() {
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
      <DashboardHeader />
      <div className="mt-12 grid grid-cols-[340px_1fr] gap-5">
        <DashboardStats stats={data.stats} />
        <DashboardActiveContracts contracts={data.activeContracts} />
      </div>
    </div>
  );
}
