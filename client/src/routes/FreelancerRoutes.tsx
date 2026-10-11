import { FreelancerDashboard } from "../features/dashboards/pages/FreelancerDashboard";
import ProtectedRoutes from "./ProtectedRoutes";

export const FreelancerRoutes = [
  {
    element: <ProtectedRoutes role="freelancer" />,
    children: [
      {
        path: "/freelancer/dashboard",
        element: <FreelancerDashboard />,
      },
    ],
  },
];
