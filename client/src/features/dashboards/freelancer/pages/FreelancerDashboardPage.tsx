import LoadingScreen from "../../../../components/ui/LoadingScreen";
import { useRequiredAuth } from "../../../../context/AuthContext";
import DashboardActiveContracts from "../components/DashboardActiveContracts";
import DashboardHeader from "../components/DashboardHeader";
import DashboardOverview from "../components/DashboardOverview";
import useDashboard from "../hooks/useDashboard";
import styles from "../styles/FreelancerDashboard.module.css";

export default function FreelancerDashboardPage() {
  const { data, isLoading, error } = useDashboard();
  const { user } = useRequiredAuth();
  
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
      <DashboardHeader firstName={user.firstName} />
      <DashboardOverview stats={data.stats} />
      <div className={styles.main}>
        <DashboardActiveContracts activeContracts={data.activeContracts} />
      </div>
    </div>
  );
}
