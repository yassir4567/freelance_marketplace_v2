import LoadingScreen from "../../../../components/ui/LoadingScreen";
import ClientDashboardHeader from "../components/DashboardHeader";
import DashboardRecentProjects from "../components/DashboardRecentProjects";
import DashboardStats from "../components/DashboardStats";
import useDashboard from "../hooks/useDashboard";
import styles from "../styles/ClientDashboard.module.css";

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
    <div className={styles.container}>
      <ClientDashboardHeader />
      <div className={styles.main}>
        <DashboardStats stats={data.stats} />
        <DashboardRecentProjects projects={data.recentProjects} />
      </div>
    </div>
  );
}
