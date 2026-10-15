import { useEffect, useState } from "react";
import type { ClientDashboardData } from "../types/dashboard.types";
import { dashboardApi } from "../../../../api/dashboard.api";

export default function useDashboard() {
  const [data, setData] = useState<ClientDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      setError("");
      const result = await dashboardApi.getClientDashboardData();

      if (!result.success) {
        setError(result.message);
        setData(null);
      } else {
        setData(result.data);
      }

      setIsLoading(false);
    };
    loadDashboardData();
  }, []);

  return {
    data,
    isLoading,
    error,
  };
}
