import { projectApi } from "@/api/project.api";
import { useEffect, useState } from "react";
import type { ClientProjectList } from "../types/project.types";
import { type ClientProjectsListFilters } from "./useProjectsFilters";

export const useProjects = (filters: ClientProjectsListFilters) => {
  const [projects, setProjects] = useState<ClientProjectList[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const buildFilterQuery = (filters: ClientProjectsListFilters) => {
    const params = new URLSearchParams();
    if (filters.status !== "all") {
      params.set("status", filters.status);
    }
    if (filters.search.trim() !== "") {
      params.set("search", filters.search);
    }
    if (filters.sort !== "") {
      params.set("sort", filters.sort);
    }
    const query = params.toString();
    return query ? `?${query}` : "";
  };

  useEffect(() => {
    const loadClientProjects = async () => {
      setError("");
      setIsLoading(true);
      const query = buildFilterQuery(filters);

      const result = await projectApi.getAll(`${query}`);

      setIsLoading(false);
      if (!result.success) {
        setError(result.message);
        return;
      }
      setProjects(result.data);
    };
    loadClientProjects();
  }, [filters]);

  return {
    projects,
    isLoading,
    error,
  };
};
