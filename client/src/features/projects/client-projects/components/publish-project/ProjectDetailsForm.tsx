import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { PublishProjectFormInput } from "../../schema/project.schema";

interface ProjectDetailsFormProps {
  register: UseFormRegister<PublishProjectFormInput>;
  errors: FieldErrors<PublishProjectFormInput>;
}

function ProjectDetailsForm({ register, errors }: ProjectDetailsFormProps) {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="title" className="text-xs font-normal">
          Enter a title for you project
        </FieldLabel>
        <Input
          {...register("title")}
          id="title"
          className="h-11 rounded-lg text-sm"
        />
        {errors.title && (
          <div className="text-xs mt-1 font-mono text-red-500">
            {errors.title.message}
          </div>
        )}
      </Field>

      <Field className="mt-4">
        <FieldLabel htmlFor="description" className="text-xs font-normal">
          Description what you need
        </FieldLabel>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Enter the description here"
          className="h-32 resize-none placeholder:text-[12px] text-xs"
        />
        {errors.description && (
          <div className="text-xs mt-1 font-mono text-red-500">
            {errors.description.message}
          </div>
        )}
      </Field>
    </FieldGroup>
  );
}

export default ProjectDetailsForm;
