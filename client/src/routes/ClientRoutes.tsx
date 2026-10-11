import { ClientDashboard } from "../features/dashboards/pages/ClientDashboard";
import ProtectedRoutes from "./ProtectedRoutes";

export const ClientRoutes = [
  {
    element: <ProtectedRoutes role="client" />,
    children: [
      {
        path: "/client/dashboard",
        element: <ClientDashboard />,
      },
    ],
  },
];
