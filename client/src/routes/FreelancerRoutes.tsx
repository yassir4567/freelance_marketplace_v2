import FreelancerDashboardPage from "../features/dashboards/freelancer/pages/FreelancerDashboardPage";
import ProtectedRoutes from "./ProtectedRoutes";

export const FreelancerRoutes = [
  {
    element: <ProtectedRoutes role="freelancer" />,
    children: [
      {
        path: "/freelancer/dashboard",
        element: <FreelancerDashboardPage />,
      },
    ],
  },
];
