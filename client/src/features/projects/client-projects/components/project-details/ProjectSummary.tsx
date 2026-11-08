import { removeSpecialCharacter } from "@/utils/helpers";
import type { ClientProjectDetails } from "../../types/project.types";
import { GiLevelEndFlag } from "react-icons/gi";

interface ProjectSummaryProps {
  summary: Pick<
    ClientProjectDetails,
    "description" | "experienceLevel" | "duration" | "size"
  >;
}

function ProjectSummary({ summary }: ProjectSummaryProps) {
  return (
    <div>
      <div className="px-6">
        <h6 className="text-xs mb-4 text-gray-500">Description</h6>
        <p className="text-sm">{summary.description}</p>
      </div>

      <hr className="bg-gray-900 my-9" />

      <div className="grid grid-cols-3 gap-3 px-6">
        <div className="flex gap-2">
          <GiLevelEndFlag size={20} />
          <div className="mt-1">
            <h6 className="text-xs text-gray-500 mb-1">Experience required</h6>
            <p className="text-sm text-black capitalize">
              {removeSpecialCharacter(summary.experienceLevel, "-")}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <GiLevelEndFlag size={20} />
          <div className="mt-1">
            <h6 className="text-xs text-gray-500 mb-1">Estimated duration</h6>
            <p className="text-sm text-black capitalize">
              {removeSpecialCharacter(summary.duration, "_")}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <GiLevelEndFlag size={20} />
          <div className="mt-1">
            <h6 className="text-xs text-gray-500 mb-1">Project size</h6>
            <p className="text-sm text-black capitalize">{summary.size}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectSummary;
