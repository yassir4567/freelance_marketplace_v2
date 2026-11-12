import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { UpdateProjectFormInput } from "../../schema/project.schema";
import { Textarea } from "@/components/ui/textarea";

interface EditDetailsFormProps {
  register: UseFormRegister<UpdateProjectFormInput>;
  errors: FieldErrors<UpdateProjectFormInput>;
  isEditMode: boolean;
}

export default function EditDetailsForm({
  register,
  errors,
  isEditMode,
}: EditDetailsFormProps) {
  return (
    <div className="border border-gray-300 rounded-2xl p-6 mt-5">
      <FieldGroup className="mb-4">
        <Field>
          <FieldLabel htmlFor="title" className="text-xs font-normal">
            Title
          </FieldLabel>
          <Input
            {...register("title")}
            id="title"
            className="h-11 rounded-lg text-sm border-gray-300"
            disabled={!isEditMode}
          />
          {errors.title && (
            <div className="text-xs mt-1 font-mono text-red-500">
              {errors.title.message}
            </div>
          )}
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="description" className="text-xs font-normal">
            Description
          </FieldLabel>
          <Textarea
            {...register("description")}
            id="description"
            placeholder="Enter the description here"
            className="h-60 resize-none placeholder:text-[12px] text-xs leading-5 border-gray-300"
            disabled={!isEditMode}
          />
          {errors.description && (
            <div className="text-xs mt-1 font-mono text-red-500">
              {errors.description.message}
            </div>
          )}
        </Field>
      </FieldGroup>
    </div>
  );
}
