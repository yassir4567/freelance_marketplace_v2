import type { ClientDashboardData } from "../features/dashboards/client/types/dashboard.types";
import { request } from "./config.api";

const dashboardApi = {
  getClientDashboardData() {
    return request<ClientDashboardData>("/client/dashboard");
  },
};

export { dashboardApi };
