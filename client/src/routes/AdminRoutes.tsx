import AdminDashboardPage from "../features/dashboards/admin-dashboard/pages/AdminDashboardPage";
import ProtectedRoutes from "./ProtectedRoutes";

export const AdminRoutes = [
  {
    element: <ProtectedRoutes role="admin" />,
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminDashboardPage />,
      },
    ],
  },
];
