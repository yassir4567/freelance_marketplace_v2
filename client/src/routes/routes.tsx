import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
import App from "../App";
import { ClientDashboard } from "../features/dashboards/pages/ClientDashboard";
import { FreelancerDashboard } from "../features/dashboards/pages/FreelancerDashboard";
import { AdminDashboard } from "../features/dashboards/pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/client/dashboard",
    element: <ClientDashboard />,
  },
  {
    path: "/freelancer/dashboard",
    element: <FreelancerDashboard />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
]);
