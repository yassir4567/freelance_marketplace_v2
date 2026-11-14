import { categoryApi } from "@/api/category.api";
import type { Category } from "@/types/category.types";
import { useEffect, useState } from "react";

export const useCategory = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCategories = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await categoryApi.getAll();
      if (!result.success) {
        setError(result.message ?? "Something error in categories fetching");
        return;
      }
      setCategories(result.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return { categories, isLoading, error, onRetry: loadCategories };
};
