import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { UpdateProjectFormInput } from "../../schema/project.schema";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  DURATIONS,
  EXPERIENCE_LEVEL,
  PROJECT_SIZE,
} from "../../utils/constants";
import { Input } from "@/components/ui/input";

interface EditProjectScopeProps {
  register: UseFormRegister<UpdateProjectFormInput>;
  errors: FieldErrors<UpdateProjectFormInput>;
  isEditMode: boolean;
}

export default function EditProjectScope({
  register,
  errors,
  isEditMode,
}: EditProjectScopeProps) {
  return (
    <div className="border border-gray-300 rounded-2xl p-6 mt-5">
      <div className="grid grid-cols-3 gap-10">
        <Field className="flex flex-col gap-1 mb-6">
          <FieldLabel htmlFor="exp-level" className="text-xs font-normal">
            Experience Level
          </FieldLabel>
          <select
            {...register("experienceLevel")}
            id="exp-level"
            className="w-full mt-2 border border-gray-200 h-10 text-[12px] px-2 rounded-lg text-black focus-within:border-blue-300 disabled:bg-gray-100 disabled:text-gray-500"
            disabled={!isEditMode}
          >
            {EXPERIENCE_LEVEL.map((exp) => (
              <option key={exp.label} value={exp.value}>
                {exp.label}
              </option>
            ))}
          </select>
          {errors.experienceLevel && (
            <div className="text-xs mt-1 font-mono text-red-500">
              {errors.experienceLevel.message}
            </div>
          )}
        </Field>

        <div className="flex flex-col gap-1 mb-6">
          <FieldLabel htmlFor="project-size" className="text-xs font-normal">
            Project Size
          </FieldLabel>
          <select
            {...register("size")}
            id="project-size"
            className="w-full mt-2 border border-gray-200 h-10 text-[12px] px-2 rounded-lg text-black focus-within:border-blue-300 disabled:bg-gray-100 disabled:text-gray-500"
            disabled={!isEditMode}
          >
            {PROJECT_SIZE.map((size) => (
              <option key={size.label} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
          {errors.size && (
            <div className="text-xs mt-1 font-mono text-red-500">
              {errors.size.message}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <FieldLabel
            htmlFor="project-duration"
            className="text-xs font-normal"
          >
            Project Duration
          </FieldLabel>
          <select
            {...register("duration")}
            id="project-duration"
            className="w-full mt-2 border border-gray-200 h-10 text-[12px] px-2 rounded-lg text-black focus-within:border-blue-300 disabled:bg-gray-100 disabled:text-gray-500"
            disabled={!isEditMode}
          >
            {DURATIONS.map((duration) => (
              <option key={duration.label} value={duration.value}>
                {duration.label}
              </option>
            ))}
          </select>
          {errors.duration && (
            <div className="text-xs mt-1 font-mono text-red-500">
              {errors.duration.message}
            </div>
          )}
        </div>
      </div>

      <div>
        <Field>
          <FieldLabel htmlFor="budget" className="text-xs font-normal">
            Budget
          </FieldLabel>
          <Input
            {...register("budget")}
            type="number"
            placeholder="0"
            className="h-11 rounded-lg text-sm border-gray-300"
            disabled={!isEditMode}
          />
          {errors.budget && (
            <div className="text-xs mt-1 font-mono text-red-500">
              {errors.budget.message}
            </div>
          )}
        </Field>
      </div>
    </div>
  );
}
