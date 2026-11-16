import { useEffect, useState } from "react";
import type { ClientProjectDetails } from "../types/project.types";
import { projectApi } from "@/api/project.api";

export const useProject = (id: string | undefined) => {
  const [project, setProject] = useState<ClientProjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProject = async () => {
    if (!id) {
      setIsLoading(false);
      setError("Project not found");
      return;
    }

    setIsLoading(true);
    setProject(null);
    setError("");
    try {
      const result = await projectApi.getDetails(id);
      if (!result.success) {
        if (result.status === 404) {
          setError("Project not found");
        } else if (result.status === 401) {
          setError("Your session has expired. Please refresh to log in again");
        } else {
          setError("Unable to load your project. Please refresh to try again");
        }
        return;
      }

      setProject(result.data);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadProject();
  }, [id]);

  return {
    project,
    isLoading,
    error,
  };
};
