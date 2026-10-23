import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { PublishProjectFormType } from "../hooks/usePublishProjectForm";

interface ProjectDetailsFormProps {
  form: PublishProjectFormType;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  errors: Record<string, string>;
}

function ProjectDetailsForm({
  form,
  onChange,
  errors,
}: ProjectDetailsFormProps) {
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
          id="title"
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="Enter your title"
          className="h-11 rounded-lg text-sm"
        />
        {errors.title && (
          <div className="text-red-500 text-sm">{errors.title}</div>
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
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Enter your project description"
          className="h-32 resize-none"
        />
        {errors.description && (
          <div className="text-red-500 text-sm">{errors.description}</div>
        )}
      </Field>
    </FieldGroup>
  );
}

export default ProjectDetailsForm;
