import { categoryApi } from "@/api/category.api";
import type { Category } from "@/types/category.types";
import { useEffect, useState } from "react";

export const useCategory = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      try {
        const result = await categoryApi.getAll();
        if (!result.success) {
          setError(result.message ?? "Something error in categories fetching");
        } else {
          setCategories(result.data);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadCategories();
  }, []);

  return { categories, isLoading, error };
};
