import { removeUnderScore } from "@/utils/helpers";
import type { PublishProjectFormInput } from "../../schema/project.schema";
import type { Category } from "@/types/category.types";
import { getCategoryNameById, getSkillNameById } from "../../utils/helpers";
import type { Skill } from "@/types/skill.types";
import { MdOutlineNavigateNext } from "react-icons/md";

interface ProjectOverviewProps {
  values: PublishProjectFormInput;
  isSubmitting: boolean;
  categories: Category[] | null;
  skills: Skill[] | null;
}

function ProjectOverview({
  values,
  isSubmitting,
  categories,
  skills,
}: ProjectOverviewProps) {
  const categoryName = getCategoryNameById(values.category_id, categories);
  return (
    <div>
      <h1 className="text-center font-medium text-md mb-7">
        Project Overview before submitting
      </h1>
      <div className="mb-8">
        <h6 className="mb-2 text-xs font-medium text-gray-500">
          Project title
        </h6>
        <p>{values.title}</p>
      </div>
      <div className="mb-8">
        <h6 className="mb-2 text-xs font-medium text-gray-500">
          Project description
        </h6>
        <p className="text-sm">{values.description}</p>
      </div>
      <div className="grid grid-cols-3 mb-8">
        <div>
          <h6 className="mb-2 text-xs font-medium text-gray-500">
            Experience level required
          </h6>
          <p className="text-sm">{values.experienceLevel}</p>
        </div>
        <div>
          <h6 className="mb-2 text-xs font-medium text-gray-500">
            Project size
          </h6>
          <p className="text-sm">{values.size}</p>
        </div>
        <div>
          <h6 className="mb-2 text-xs font-medium text-gray-500">
            Estimated duration
          </h6>
          <p className="text-sm">{removeUnderScore(values.duration)}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 mb-8">
        <div>
          <h6 className="mb-2 text-xs font-medium text-gray-500">Budget</h6>
          <p className="text-sm">{values.budget}$</p>
        </div>
        <div>
          <h6 className="mb-2 text-xs font-medium text-gray-500">Category</h6>
          <p className="text-sm">{categoryName}</p>
        </div>
        <div>
          <h6 className="mb-2 text-xs font-medium text-gray-500">Skills</h6>
          <p className="text-sm">
            {values.skills!.map((skillId, index) => {
              const skillName = getSkillNameById(skillId, skills);
              return (
                <span>
                  {skillName} {index !== skills!.length - 1 && ","}
                </span>
              );
            })}
          </p>
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="text-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2 ml-auto"
      >
        <span>{isSubmitting ? "Publishing..." : "Submit"}</span>{" "}
        <MdOutlineNavigateNext />
      </button>
    </div>
  );
}

export default ProjectOverview;

// {step == 4 && (
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="text-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2 ml-auto"
//             >
//               <span>{isSubmitting ? "Publishing..." : "Submit"}</span>{" "}
//               <MdOutlineNavigateNext />
//             </button>
//           )}
