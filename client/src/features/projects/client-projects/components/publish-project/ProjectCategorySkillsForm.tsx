import { FieldLabel } from "@/components/ui/field";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { PublishProjectFormInput } from "../../schema/project.schema";
import type { Category } from "@/types/category.types";
import type { Skill } from "@/types/skill.types";
import { IoClose } from "react-icons/io5";

interface ProjectCategorySkillsFormProps {
  register: UseFormRegister<PublishProjectFormInput>;
  errors: FieldErrors<PublishProjectFormInput>;

  categories: Category[];
  skills: Skill[];
  formSkills: number[];

  handleAddSkill: (skill: number) => void;
  handleRemoveSkill: (skill: number) => void;
}

function ProjectCategorySkillsForm({
  register,
  errors,
  categories,
  skills,
  formSkills,
  handleAddSkill,
  handleRemoveSkill,
}: ProjectCategorySkillsFormProps) {
  const renderedSkillsForSelect =
    skills?.filter((sk) => !formSkills.includes(sk.id)) ?? null;

  return (
    <div>
      <div className="mb-6">
        <FieldLabel htmlFor="category" className="text-xs font-normal">
          Select The Project Category
        </FieldLabel>
        <select
          {...register("category_id", { valueAsNumber: true })}
          id="category"
          className="w-full mt-2 border border-gray-200 h-10 text-[12px] px-2 rounded-lg text-gray-500"
        >
          <>
            <option value="">Select your category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </>
        </select>
        {errors.category_id && (
          <div className="text-xs mt-1 font-mono text-red-500">
            {errors.category_id.message}
          </div>
        )}
      </div>

      <div className="mb-6">
        <FieldLabel className="text-xs font-normal">
          Choose the skills{" "}
        </FieldLabel>
        <select
          id="skill"
          onChange={(e) => {
            const skill = e.target.value;

            if (!skill) return;

            handleAddSkill(+skill);
            e.target.value = "";
          }}
          className="w-full mt-2 border border-gray-200 h-10 text-[12px] px-2 rounded-lg text-gray-500"
        >
          <>
            <option value="">Select your skill</option>
            {renderedSkillsForSelect.map((skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.name}
              </option>
            ))}
          </>
        </select>
        {errors.skills && (
          <div className="text-xs mt-1 font-mono text-red-500">
            {errors.skills.message}
          </div>
        )}

        {skills !== null && (
          <div className="flex items-start gap-3 flex-wrap mt-3 max-h-30 overflow-auto">
            {formSkills.map((skill) => {
              const skillName = skills.find((sk) => sk.id === skill)?.name;

              return (
                <div
                  key={skill}
                  className="border border-gray-200 text-gray-600 text-sm px-5 py-1 rounded-lg flex justify-center items-center gap-2"
                >
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    <IoClose />
                  </button>
                  <span>{skillName}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectCategorySkillsForm;
