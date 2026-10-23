import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { PublishProjectFormInput } from "./PublishProjectForm";

interface ProjectBudgetDurationProps {
  register: UseFormRegister<PublishProjectFormInput>;
  errors: FieldErrors<PublishProjectFormInput>;
}

function ProjectBudgetDuration({
  register,
  errors,
}: ProjectBudgetDurationProps) {
  const DURATION = [
    { label: "Less than 1 month", value: "less_than_1_month" },
    { label: "1 to 3 months", value: "1_to_3_month" },
    { label: "3 to 6 months", value: "3_to_6_month" },
    { label: "More than 6 months", value: "more_than_6_month" },
  ];

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="budget">Budget</FieldLabel>
        <FieldDescription>Your budget should be atleast 20$</FieldDescription>
        <Input
          {...register("budget", { valueAsNumber: true })}
          type="number"
          placeholder="Enter your budget"
          className="h-11 rounded-lg text-sm"
        />
        {errors.budget && (
          <div className="text-sm text-red-400">{errors.budget.message}</div>
        )}
      </Field>
      <div className="flex flex-col gap-1">
        <FieldLabel htmlFor="duration">Duration</FieldLabel>
        <select
          {...register("duration")}
          id="duration"
          className="border mt-2 border-gray-200 h-10 text-sm px-2 rounded-lg text-gray-500"
        >
          <option value="" className="bg-red-200">
            Select the duration
          </option>
          {DURATION.map((duration) => (
            <option key={duration.label} value={duration.value}>
              {duration.label}
            </option>
          ))}
        </select>
        {errors.duration && (
          <div className="text-sm text-red-400">{errors.duration.message}</div>
        )}
      </div>
    </FieldGroup>
  );
}

export default ProjectBudgetDuration;
