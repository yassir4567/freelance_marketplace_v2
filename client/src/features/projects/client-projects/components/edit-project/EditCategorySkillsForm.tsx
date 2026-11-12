import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { UpdateProjectFormInput } from "../../schema/project.schema";
import type { Category } from "@/types/category.types";
import type { Skill } from "@/types/skill.types";
import { FieldLabel } from "@/components/ui/field";
import { IoClose } from "react-icons/io5";

interface EditCategorySkillsFormProps {
  register: UseFormRegister<UpdateProjectFormInput>;
  categories: Category[];
  skills: Skill[];
  formSkills: number[];
  handleAddSkill: (skillId: number) => void;
  handleRemoveSkill: (skillId: number) => void;
  errors: FieldErrors<UpdateProjectFormInput>;
  isEditMode: boolean;
}

export default function EditCategorySkillsForm({
  register,
  categories,
  skills,
  formSkills,
  handleAddSkill,
  handleRemoveSkill,
  errors,
  isEditMode,
}: EditCategorySkillsFormProps) {
  const renderedSkillsForSelect = skills.filter(
    (skill) => !formSkills.includes(skill.id),
  );

  return (
    <div className="border border-gray-300 rounded-2xl p-6 mt-5">
      <div className="mb-4">
        <FieldLabel htmlFor="category" className="text-xs font-normal">
          Category
        </FieldLabel>
        <select
          {...register("category_id", { valueAsNumber: true })}
          id="category"
          className="w-full mt-2 border border-gray-200 h-10 text-[12px] px-2 rounded-lg text-black focus-within:border-blue-300 disabled:bg-gray-100 disabled:text-gray-500"
          disabled={!isEditMode}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category_id && (
          <div className="text-xs mt-1 font-mono text-red-500">
            {errors.category_id.message}
          </div>
        )}
      </div>

      <div>
        <FieldLabel htmlFor="skills" className="text-xs font-normal">
          Skills
        </FieldLabel>
        <select
          id="skills"
          onChange={(e) => {
            const skillId = e.target.value;
            if (!skillId) return;

            handleAddSkill(+skillId);
            e.target.value = "";
          }}
          className="w-full mt-2 border border-gray-200 h-10 text-[12px] px-2 rounded-lg text-black focus-within:border-blue-300 disabled:bg-gray-100 disabled:text-gray-500"
          disabled={!isEditMode}
        >
          <option value="">Choose skills from here</option>
          {renderedSkillsForSelect.map((skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>
        {errors.skills && (
          <div className="text-xs mt-1 font-mono text-red-500">
            {errors.skills.message}
          </div>
        )}
      </div>
      <div className="flex items-start gap-3 flex-wrap mt-3 max-h-30 overflow-auto">
        {formSkills.map((skill) => {
          const skillName = skills.find((sk) => sk.id === skill)?.name;

          if (!skillName) return;

          return (
            <div
              key={skill}
              className="border border-gray-200 text-gray-600 text-sm px-5 py-1 rounded-lg flex justify-center items-center gap-2"
            >
              {isEditMode && (
                <button type="button" onClick={() => handleRemoveSkill(skill)}>
                  <IoClose />
                </button>
              )}
              <span>{skillName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
