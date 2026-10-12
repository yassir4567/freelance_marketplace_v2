import { Navigate } from "react-router-dom";
import LoadingScreen from "../../../../components/ui/LoadingScreen";
import { useAuth } from "../../../../context/AuthContext";
import DashboardHeader from "../components/DashboardHeader";
import useDashboard from "../hooks/useDashboard";
import styles from "../styles/ClientDashboard.module.css";
import DashboardOverview from "../components/DashboardOverview";
import DashboardRecentProjects from "../components/DashboardRecentProjects";

export default function ClientDashboardPage() {
  const { user, isLoading: isUserLoading } = useAuth();
  const { data, isLoading, error } = useDashboard();

  if (isUserLoading) {
    return (
      <LoadingScreen
        text="Loading..."
        placeholder="Please wait while we verify your session."
      />
    );
  }

  if (isLoading) {
    return (
      <LoadingScreen
        text="Loading..."
        placeholder="Please wait while we fetch the dashboard data."
      />
    );
  }

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  if (!data) return null;

  return (
    <div className={styles.container}>
      <DashboardHeader firstName={user.firstName} />
      <DashboardOverview stats={data.stats} />
      <div className={styles.main}>
        <DashboardRecentProjects recentProjects={data.recentProjects} />
      </div>
    </div>
  );
}
