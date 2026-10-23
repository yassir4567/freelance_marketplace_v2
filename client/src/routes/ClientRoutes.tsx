import PublishProjectPage from "@/features/projects/client-projects/pages/PublishProjectPage";
import ClientDashboardPage from "../features/dashboards/client-dashboard/pages/ClientDashboardPage";
import ClientLayout from "../layouts/ClientLayout";
import ProtectedRoutes from "./ProtectedRoutes";

export const ClientRoutes = [
  {
    element: <ProtectedRoutes role="client" />,
    children: [
      {
        element: <ClientLayout />,
        children: [
          { path: "/client/dashboard", element: <ClientDashboardPage /> },
          {
            path: "/client/post-project",
            element: <PublishProjectPage />,
          },
        ],
      },
    ],
  },
];
