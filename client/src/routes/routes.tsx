import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { ClientRoutes } from "./ClientRoutes";
import { FreelancerRoutes } from "./FreelancerRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { AuthRoutes } from "./AuthRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  ...AuthRoutes,
  ...ClientRoutes,
  ...FreelancerRoutes,
  ...AdminRoutes,
]);
