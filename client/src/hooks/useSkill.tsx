import { skillApi } from "@/api/skill.api";
import type { Skill } from "@/types/skill.types";
import { useEffect, useState } from "react";

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSkills = async () => {
      setIsLoading(true);
      try {
        const result = await skillApi.getAll();
        if (!result.success) {
          setError(result.message ?? "Something error in skills fetching");
        } else {
          setSkills(result.data);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadSkills();
  }, []);

  return { skills, isLoading, error };
};
