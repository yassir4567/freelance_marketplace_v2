import { useEffect, useState } from "react";
import type { ClientProfile } from "../types/profile.types";
import { profileApi } from "@/api/profile.api";

export const useProfile = () => {
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      setProfile(null);
      setIsLoading(true);
      setError("");

      try {
        const result = await profileApi.get();

        if (!result.success) {
          setError(
            "Something went wrong when trying to retrieve your profile data",
          );
          return;
        }

        setProfile(result.data);
      } catch {
        setError("An unexpected network error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  return {
    profile,
    isLoading,
    error,
  };
};
