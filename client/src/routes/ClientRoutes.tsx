import ClientDashboardPage  from "../features/dashboards/client/pages/ClientDashboardPage";
import ClientLayout from "../layouts/ClientLayout";
import ProtectedRoutes from "./ProtectedRoutes";

export const ClientRoutes = [
  {
    element: <ProtectedRoutes role="client" />,
    children: [
      {
        path: "/client/dashboard",
        element: <ClientLayout />,
        children : [
          {index: true ,element: <ClientDashboardPage />}
        ]
      },
    ],
  },
];
