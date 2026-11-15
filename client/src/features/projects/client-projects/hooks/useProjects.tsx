import { projectApi } from "@/api/project.api";
import { useEffect, useState } from "react";
import type { ClientProjectList } from "../types/project.types";
import { type ClientProjectsListFilters } from "./useProjectsFilters";

export const useProjects = (filters: ClientProjectsListFilters) => {
  const [projects, setProjects] = useState<ClientProjectList[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusCode, setStatusCode] = useState<number | null>(null);

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

  const loadClientProjects = async () => {
    setError("");
    setIsLoading(true);
    setStatusCode(null);
    try {
      const query = buildFilterQuery(filters);
      const result = await projectApi.getAll(`${query}`);

      if (!result.success) {
        if (result.status === 401) {
          setError("Your session has expired. Please log in again");
        } else {
          setError("Unable to load your projects. Please try again");
        }
        setStatusCode(result.status);
        return;
      }
      setProjects(result.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadClientProjects();
  }, [filters]);

  return {
    projects,
    isLoading,
    error,
    statusCode,
    retry: loadClientProjects,
  };
};
