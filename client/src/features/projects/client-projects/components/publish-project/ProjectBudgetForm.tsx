import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { PublishProjectFormInput } from "../../schema/project.schema";

interface ProjectBudgetFormProps {
  register: UseFormRegister<PublishProjectFormInput>;
  errors: FieldErrors<PublishProjectFormInput>;
}

function ProjectBudgetForm({ register, errors }: ProjectBudgetFormProps) {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="budget" className="text-xs font-normal">
          Budget
        </FieldLabel>
        <Input
          {...register("budget")}
          type="number"
          placeholder="0"
          className="h-11 rounded-lg text-sm"
        />
        {errors.budget && (
          <div className="text-xs mt-1 font-mono text-red-500">
            {errors.budget.message}
          </div>
        )}
      </Field>
    </FieldGroup>
  );
}

export default ProjectBudgetForm;
