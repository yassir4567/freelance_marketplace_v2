import { FieldLabel } from "@/components/ui/field";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { type PublishProjectFormInput } from "../../schema/project.schema";
import {
  DURATIONS,
  EXPERIENCE_LEVEL,
  PROJECT_SIZE,
} from "../../utils/constants";

interface ProjectScopeFormProps {
  register: UseFormRegister<PublishProjectFormInput>;
  errors: FieldErrors<PublishProjectFormInput>;
}

function ProjectScopeForm({ register, errors }: ProjectScopeFormProps) {
  return (
    <div>
      <div className="flex flex-col gap-1 mb-6">
        <FieldLabel htmlFor="exp-level" className="text-xs font-normal">
          Experience Level
        </FieldLabel>
        <select
          {...register("experienceLevel")}
          id="exp-level"
          className="w-full mt-2 border border-gray-200 h-10 text-[12px] px-2 rounded-lg text-gray-500"
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
          <div className="text-xs mt-1 font-mono text-red-500">
            {errors.experienceLevel.message}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 mb-6">
        <FieldLabel htmlFor="project-size" className="text-xs font-normal">
          Project Size
        </FieldLabel>
        <select
          {...register("size")}
          id="project-size"
          className="w-full mt-2 border border-gray-200 h-10 text-[12px] px-2 rounded-lg text-gray-500"
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
          <div className="text-xs mt-1 font-mono text-red-500">
            {errors.size.message}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <FieldLabel htmlFor="project-duration" className="text-xs font-normal">
          Project Duration
        </FieldLabel>
        <div className="w-fit mt-3 flex flex-col gap-2">
          {DURATIONS.map((duration) => (
            <div key={duration.label} className="flex items-center gap-3">
              <input
                {...register("duration")}
                value={duration.value}
                type="radio"
                id={`id-${duration.value}`}
              />
              <label
                htmlFor={`id-${duration.value}`}
                className="text-xs font-normal"
              >
                {duration.label}
              </label>
            </div>
          ))}
        </div>
        {errors.duration && (
          <div className="text-xs mt-1 font-mono text-red-500">
            {errors.duration.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectScopeForm;
