import LoadingScreen from "@/components/shared/LoadingScreen";
import DashboardActiveContracts from "../components/DashboardActiveContracts";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import useDashboard from "../hooks/useDashboard";

export default function FreelancerDashboardPage() {
  const { data, isLoading, error } = useDashboard();

  // todo : I'll improve it later
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (isLoading) {
    return (
      <LoadingScreen
        text="Loading..."
        placeholder="Please wait while we fetch the dashboard data."
      />
    );
  }

  return (
    <div>
      <DashboardHeader />
      <div className="mt-12 grid grid-cols-[340px_1fr] gap-5">
        <DashboardStats data={data} isLoading={isLoading} />
        <DashboardActiveContracts data={data} isLoading={isLoading} />
      </div>
    </div>
  );
}
