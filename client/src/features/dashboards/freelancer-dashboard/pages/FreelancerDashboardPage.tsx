import LoadingScreen from "../../../../components/ui/LoadingScreen";
import DashboardActiveContracts from "../components/DashboardActiveContracts";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import useDashboard from "../hooks/useDashboard";
import styles from "../styles/FreelancerDashboard.module.css";

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
    <div className={styles.container}>
      <DashboardHeader />
      <div className={styles.main}>
        <DashboardStats stats={data.stats} />
        <DashboardActiveContracts contracts={data.activeContracts} />
      </div>
    </div>
  );
}
