import { AdminDashboard } from "../features/dashboards/pages/AdminDashboard";
import ProtectedRoutes from "./ProtectedRoutes";

export const AdminRoutes = [
  {
    element: <ProtectedRoutes role="admin" />,
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
];
