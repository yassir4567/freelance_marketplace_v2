import PublishProjectPage from "@/features/projects/client-projects/pages/PublishProjectPage";
import ClientDashboardPage from "../features/dashboards/client-dashboard/pages/ClientDashboardPage";
import ClientLayout from "../layouts/ClientLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import ProjectsPage from "@/features/projects/client-projects/pages/ProjectsPage";
import ProjectDetailsPage from "@/features/projects/client-projects/pages/ProjectDetailsPage";
import ProjectDetailsLayout from "@/features/projects/client-projects/layouts/ProjectDetailsLayout";
import EditProjectPage from "@/features/projects/client-projects/pages/EditProjectPage";

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
          {
            path: "/client/projects",
            element: <ProjectsPage />,
          },
          {
            element: <ProjectDetailsLayout />,
            children: [
              {
                path: "/client/projects/:id",
                element: <ProjectDetailsPage />,
              },
            ],
          },
          {
            path: "/client/projects/:id/edit",
            element: <EditProjectPage />,
          },
        ],
      },
    ],
  },
];
