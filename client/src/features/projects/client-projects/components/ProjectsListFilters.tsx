import { Input } from "@/components/ui/input";
import { removeUnderScore } from "@/utils/helpers";
import type {
  ClientProjectsListFilters,
  ProjectStatusForFilter,
} from "../hooks/useProjectsFilters";
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
];

function ProjectsListFilters({
  filters,
  onChangeStatus,
  onChangeFields,
}: ProjectsListFiltersProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex gap-5">
        {PROJECT_STATUS.map((status) => (
          <button
            key={status}
            type="button"
            className={`capitalize border-b text-sm px-2 text-gray-900 ${filters.status === status && "border-sky-600 text-sky-700"}`}
            onClick={() => onChangeStatus(status)}
          >
            {removeUnderScore(status)}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Input
          type="text"
          name="search"
          value={filters.search}
          onChange={onChangeFields}
          placeholder="Search by title"
          className="w-100 h-10 rounded-lg text-xs placeholder:text-xs"
        />
        <select
          name="sort"
          value={filters.sort}
          onChange={onChangeFields}
          className="border border-gray-200 rounded-lg px-5 h-10 text-sm"
        >
          <option value="">Sort by</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
  // <form className="mb-6">
  /* <div className="text-end">
        <button
          type="submit"
          className="text-gray-600 border-b border-gray-800"
        >
          Apply filters
        </button>
        </div> */
  // </form>
}

export default ProjectsListFilters;
