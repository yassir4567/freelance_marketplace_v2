import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../components/ui/LoadingScreen";

export default function ProtectedRoutes({ role }: { role: string }) {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <LoadingScreen
        text="Loading..."
        placeholder="Please wait while we verify your session."
      />
    );
  }

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  if (role && role !== user.role) {
    return <Navigate to={`/${user.role}/dashboard`} replace={true} />;
  }

  return <Outlet />;
}
