import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../components/ui/LoadingScreen";

export default function GuestRoutes() {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <LoadingScreen
        text="Loading..."
        placeholder="Please wait while we verify your session."
      />
    );
  }

  if (isAuthenticated && user !== null) {
    return <Navigate to={`/${user.role}/dashboard`} replace={true} />;
  }

  return <Outlet />;
}
