import { FieldLabel } from "@/components/ui/field";
import { useCategory } from "@/hooks/useCategory";
import { useSkills } from "@/hooks/useSkill";
import { IoClose } from "react-icons/io5";
import type { PublishProjectFormType } from "../hooks/usePublishProjectForm";
interface ProjectScopeFormProps {
  form: PublishProjectFormType;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  errors: Record<string, string>;
}

function ProjectScopeForm({ form, onChange, errors }: ProjectScopeFormProps) {
  const {
    categories,
    isLoading: isCategoriesLoading,
    error: categoryError,
  } = useCategory();

  const { skills, isLoading: isSkillsLoading, error: skillError } = useSkills();

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

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <FieldLabel htmlFor="exp-level">Experience Level</FieldLabel>
          <select
            name="experienceLevel"
            value={form.experienceLevel}
            onChange={onChange}
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
            <div className="text-red-500 text-sm">{errors.experienceLevel}</div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <FieldLabel htmlFor="project-size">Project Size</FieldLabel>
          <select
            name="size"
            value={form.size}
            onChange={onChange}
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
            <div className="text-red-500 text-sm">{errors.size}</div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <FieldLabel htmlFor="category">Select The Project Category</FieldLabel>
        <select
          name="category_id"
          value={form.category_id}
          onChange={onChange}
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
          <div className="text-red-500 text-sm">{errors.category_id}</div>
        )}
      </div>

      <div className="mb-6">
        <FieldLabel>Choose the skills </FieldLabel>
        <select
          name="skills"
          id="skill"
          className="w-full mt-2 border border-gray-200 h-10 text-sm px-2 rounded-lg text-gray-500"
        >
          {isSkillsLoading ? (
            <option value="">Fetching skills...</option>
          ) : skills === null || skillError !== "" ? (
            <option value="">Failed to get skills, Try again</option>
          ) : (
            <>
              <option value="">Select your skill</option>
              {skills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </>
          )}
        </select>
        {errors.skills && (
          <div className="text-red-500 text-sm">{errors.skills}</div>
        )}
        <div className="flex items-start gap-3 flex-wrap mt-3 max-h-20 overflow-auto">
          {form.skills.map((skill) => (
            <div
              key={skill}
              className="bg-sky-100 text-blue-950 px-3 py-1 rounded-lg flex justify-center items-center gap-1"
            >
              <span>{skill}</span>
              <button>
                <IoClose />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectScopeForm;
