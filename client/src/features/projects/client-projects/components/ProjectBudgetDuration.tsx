import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { PublishProjectFormType } from "../hooks/usePublishProjectForm";

interface ProjectBudgetDurationProps {
  form: PublishProjectFormType;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  errors: Record<string, string>;
}

function ProjectBudgetDuration({ errors }: ProjectBudgetDurationProps) {
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
          name="budget"
          type="number"
          placeholder="Enter your budget"
          className="h-11 rounded-lg text-sm"
        />
      </Field>
      <div className="flex flex-col gap-1">
        <FieldLabel htmlFor="duration">Duration</FieldLabel>
        <select
          name="duration"
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
      </div>
    </FieldGroup>
  );
}

export default ProjectBudgetDuration;
