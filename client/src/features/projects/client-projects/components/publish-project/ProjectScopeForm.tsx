import { FieldLabel } from "@/components/ui/field";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import type { PublishProjectFormInput } from "./PublishProjectForm";
import type { Category } from "@/types/category.types";
import type { Skill } from "@/types/skill.types";

interface ProjectScopeFormProps {
  register: UseFormRegister<PublishProjectFormInput>;
  errors: FieldErrors<PublishProjectFormInput>;

  categories: Category[] | null;
  skills: Skill[] | null;

  isCategoriesLoading: boolean;
  isSkillsLoading: boolean;

  categoryError: string;
  skillError: string;

  handleAddSkill: (skill: number) => void;
  handleRemoveSkill: (skill: number) => void;

  formSkills: number[];
}

function ProjectScopeForm({
  register,
  errors,
  categories,
  skills,
  isCategoriesLoading,
  isSkillsLoading,
  categoryError,
  skillError,
  handleAddSkill,
  handleRemoveSkill,
  formSkills,
}: ProjectScopeFormProps) {
  const EXPERIENCE_LEVEL = [
    { label: "Junior", value: "junior" },
    { label: "Mid-Level", value: "mid-level" },
    { label: "Senior", value: "senior" },
  ];

  const PROJECT_SIZE = [
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },
  ];

  const renderedSkillsForSelect =
    skills?.filter((sk) => !formSkills.includes(sk.id)) ?? null;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <FieldLabel htmlFor="exp-level">Experience Level</FieldLabel>
          <select
            {...register("experienceLevel")}
            id="exp-level"
            className="border mt-2 border-gray-200 h-10 text-sm px-2 rounded-lg text-gray-500"
          >
            <option value="" className="bg-red-200">
              Select an experience level
            </option>
            {EXPERIENCE_LEVEL.map((exp) => (
              <option key={exp.label} value={exp.value}>
                {exp.label}
              </option>
            ))}
          </select>
          {errors.experienceLevel && (
            <div className="text-sm text-red-400">
              {errors.experienceLevel.message}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <FieldLabel htmlFor="project-size">Project Size</FieldLabel>
          <select
            {...register("size")}
            id="project-size"
            className="border mt-2 border-gray-200 h-10 text-sm px-2 rounded-lg text-gray-500"
          >
            <option value="" className="bg-red-200">
              Select the project size
            </option>
            {PROJECT_SIZE.map((size) => (
              <option key={size.label} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
          {errors.size && (
            <div className="text-sm text-red-400">{errors.size.message}</div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <FieldLabel htmlFor="category">Select The Project Category</FieldLabel>
        <select
          {...register("category_id")}
          id="category"
          className="w-full mt-2 border border-gray-200 h-10 text-sm px-2 rounded-lg text-gray-500"
        >
          {isCategoriesLoading ? (
            <option value="">Fetching categories...</option>
          ) : categories === null || categoryError !== "" ? (
            <option value="">Failed to get categories, Try again</option>
          ) : (
            <>
              <option value="">Select your category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </>
          )}
        </select>
        {errors.category_id && (
          <div className="text-sm text-red-400">
            {errors.category_id.message}
          </div>
        )}
      </div>

      <div className="mb-6">
        <FieldLabel>Choose the skills </FieldLabel>
        <select
          id="skill"
          onChange={(e) => {
            const skill = e.target.value;

            if (!skill) return;

            handleAddSkill(+skill);
            e.target.value = "";
          }}
          className="w-full mt-2 border border-gray-200 h-10 text-sm px-2 rounded-lg text-gray-500"
        >
          {isSkillsLoading ? (
            <option value="">Fetching skills...</option>
          ) : renderedSkillsForSelect === null || skillError !== "" ? (
            <option value="">Failed to get skills, Try again</option>
          ) : (
            <>
              <option value="">Select your skill</option>
              {renderedSkillsForSelect.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </>
          )}
        </select>
        {errors.skills && (
          <div className="text-sm text-red-400">{errors.skills.message}</div>
        )}

        {skills !== null && (
          <div className="flex items-start gap-3 flex-wrap mt-3 max-h-20 overflow-auto">
            {formSkills.map((skill) => {
              const skillName = skills.find((sk) => sk.id === skill)?.name;

              return (
                <div
                  key={skill}
                  className="bg-sky-100 text-blue-950 px-3 py-1 rounded-lg flex justify-center items-center gap-1"
                >
                  <span>{skillName}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    <IoClose />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectScopeForm;
