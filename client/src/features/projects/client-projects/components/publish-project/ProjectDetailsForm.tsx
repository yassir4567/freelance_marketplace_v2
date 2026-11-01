import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { PublishProjectFormInput } from "./PublishProjectForm";

interface ProjectDetailsFormProps {
  register: UseFormRegister<PublishProjectFormInput>;
  errors: FieldErrors<PublishProjectFormInput>;
}

function ProjectDetailsForm({ register, errors }: ProjectDetailsFormProps) {
  return (
    <FieldGroup>
      <Field>
        <div className="flex gap-2 items-center">
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <FieldDescription className="text-xs">
            {"("} Make sure the title between 3 and 200 character {")"}
          </FieldDescription>
        </div>
        <Input
          {...register("title")}
          id="title"
          placeholder="Enter your title"
          className="h-11 rounded-lg text-sm"
        />
        {errors.title && (
          <div className="text-sm text-red-400">{errors.title.message}</div>
        )}
      </Field>

      <Field className="mt-4">
        <div className="flex gap-2 items-center">
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <FieldDescription className="text-xs">
            {"("} Make sure the description between 300 and 3000 character {")"}
          </FieldDescription>
        </div>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Enter your project description"
          className="h-32 resize-none"
        />
        {errors.description && (
          <div className="text-sm text-red-400">
            {errors.description.message}
          </div>
        )}
      </Field>
    </FieldGroup>
  );
}

export default ProjectDetailsForm;
