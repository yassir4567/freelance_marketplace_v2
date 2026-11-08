import { Input } from "@/components/ui/input";
import { removeSpecialCharacter } from "@/utils/helpers";
import type {
  ClientProjectsListFilters,
  ProjectStatusForFilter,
} from "../../hooks/useProjectsFilters";
import type React from "react";

interface ProjectsListFiltersProps {
  filters: ClientProjectsListFilters;
  onChangeStatus: (status: ProjectStatusForFilter) => void;
  onChangeFields: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

const PROJECT_STATUS: ProjectStatusForFilter[] = [
  "all",
  "open",
  "in_review",
  "in_progress",
  "completed",
  "cancelled",
  "closed",
];

function ProjectsListFilters({
  filters,
  onChangeStatus,
  onChangeFields,
}: ProjectsListFiltersProps) {
  return (
    <div className="mb-4 flex flex-col gap-3">
      <div>
        <Input
          type="text"
          name="search"
          value={filters.search}
          onChange={onChangeFields}
          placeholder="Search by title"
          className="w-100 h-10 rounded-lg text-xs placeholder:text-xs"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-5">
          {PROJECT_STATUS.map((status) => (
            <button
              key={status}
              type="button"
              className={`capitalize border-b text-sm px-2 text-gray-900 ${filters.status === status && "border-sky-600 text-sky-700"}`}
              onClick={() => onChangeStatus(status)}
            >
              {removeSpecialCharacter(status, "_")}
            </button>
          ))}
        </div>

        <select
          name="sort"
          value={filters.sort}
          onChange={onChangeFields}
          className="border border-gray-200 rounded-lg px-5 h-10 text-sm"
        >
          <option value="oldest">Oldest</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
}

export default ProjectsListFilters;
