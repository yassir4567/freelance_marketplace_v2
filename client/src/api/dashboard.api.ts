import type { ClientDashboardData } from "../features/dashboards/client/types/dashboard.types";
import type { FreelancerDashboardData } from "../features/dashboards/freelancer/types/dashboard.types";
import { request } from "./config.api";

const dashboardApi = {
  getClientDashboardData() {
    return request<ClientDashboardData>("/client/dashboard");
  },
  getFreelancerDashboardData() {
    return request<FreelancerDashboardData>("/freelancer/dashboard");
  },
};

export { dashboardApi };
