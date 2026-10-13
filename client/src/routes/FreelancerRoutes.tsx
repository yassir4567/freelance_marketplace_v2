import FreelancerDashboardPage from "../features/dashboards/freelancer/pages/FreelancerDashboardPage";
import FreelancerLayout from "../layouts/FreelancerLayout";
import ProtectedRoutes from "./ProtectedRoutes";

export const FreelancerRoutes = [
  {
    element: <ProtectedRoutes role="freelancer" />,
    children: [
      {
        path: "/freelancer/dashboard",
        element: <FreelancerLayout />,
        children: [
          {
            index: true,
            element: <FreelancerDashboardPage />,
          },
        ],
      },
    ],
  },
];
