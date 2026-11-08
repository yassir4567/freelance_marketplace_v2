import { useEffect, useState } from "react";
import type { ClientProjectDetails } from "../types/project.types";
import { projectApi } from "@/api/project.api";

export const useProject = (id: string | undefined) => {
  const [project, setProject] = useState<ClientProjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      if (!id) {
        setIsLoading(false);
        setError("Project not found");
        return;
      }

      setIsLoading(true);
      const result = await projectApi.getDetails(id);
      setIsLoading(false);

      if (!result.success) {
        if (result.status === 404) {
          setError("Project Not Found");
          return;
        }
        setError(result.message);
        return;
      }

      setProject(result.data);
    };

    loadProject();
  }, [id]);

  return {
    project,
    isLoading,
    error,
  };
};
