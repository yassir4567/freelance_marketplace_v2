import { AdminDashboard } from "../features/dashboards/pages/AdminDashboard";
import ProtectedRoutes from "./ProtectedRoutes";

export const AdminRoutes = [
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
];
