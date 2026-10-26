import type { ProjectStatus } from "@/types/project.types";
import React, { useState } from "react";

export type ProjectStatusForFilter = "all" | ProjectStatus;

export type ClientProjectsListFilters = {
  search: string;
  status: ProjectStatusForFilter;
  sort: "" | "newest" | "oldest";
};
const useProjectsFilters = () => {
  const [filters, setFilters] = useState<ClientProjectsListFilters>({
    search: "",
    status: "all",
    sort: "",
  });

  const onChangeStatus = (status: "all" | ProjectStatus) => {
    if (status === filters.status) return;
    setFilters((prev) => ({ ...prev, status: status }));
  };

  const onChangeFields = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return { filters, onChangeStatus, onChangeFields };
};

export { useProjectsFilters };
