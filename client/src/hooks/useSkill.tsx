import { skillApi } from "@/api/skill.api";
import type { Skill } from "@/types/skill.types";
import { useEffect, useState } from "react";

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSkills = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await skillApi.getAll();
      if (!result.success) {
        setError(result.message ?? "Something error in skills fetching");
        return;
      }
      setSkills(result.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  return { skills, isLoading, error, onRetry: loadSkills };
};
