import { formsHeaderData } from "../utils/data";
import { MdOutlineNavigateNext } from "react-icons/md";
import ProjectDetailsForm from "./ProjectDetailsForm";
import ProjectScopeForm from "./ProjectScopeForm";
import ProjectBudgetDuration from "./ProjectBudgetDuration";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSkills } from "@/hooks/useSkill";
import { useCategory } from "@/hooks/useCategory";
import { projectApi } from "@/api/project.api";
import { useNavigate } from "react-router-dom";

const publishProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { error: "Title must be at least 3 characters" })
    .max(200, { error: "Title must be at most 200 characters" }),
  description: z
    .string()
    .trim()
    .min(300, { error: "Description must be at least 300 characters" })
    .max(3000, { error: "Description must be at most 3000 characters" }),
  experienceLevel: z.enum(["junior", "mid-level", "senior"], {
    error: "Please select an experience level",
  }),
  size: z.enum(["small", "medium", "large"], {
    error: "Please select the project size",
  }),
  duration: z.enum(
    ["less_than_1_month", "1_to_3_month", "3_to_6_month", "more_than_6_month"],
    { error: "Please select the estimated duration" },
  ),
  budget: z
    .string()
    .trim()
    .min(1, { error: "Budget is required" })
    .regex(/^\d+(\.\d{1,2})?$/, {
      error: "Invalid budget format",
    })
    .refine((value) => Number(value) >= 20, {
      error: "Budget should be at least 20$",
    }),
  category_id: z.preprocess(
    (value) => (value === "" ? undefined : Number(value)),
    z.number({
      error: "Please select a category",
    }),
  ),
  skills: z
    .array(z.number(), { error: "Skills must be a valid list" })
    .min(1, { error: "You must select at least one skill" }),
});

export type PublishProjectFormInput = z.input<typeof publishProjectSchema>;

export type PublishProjectFormOutput = z.output<typeof publishProjectSchema>;

interface PublishProjectFormProps {
  step: number;
  onNext: () => void;
  onPrev: () => void;
}

function PublishProjectForm({ step, onNext, onPrev }: PublishProjectFormProps) {
  const navigate = useNavigate();
  const {
    categories,
    isLoading: isCategoriesLoading,
    error: categoryError,
  } = useCategory();

  const { skills, isLoading: isSkillsLoading, error: skillError } = useSkills();

  const currentFormHeader = formsHeaderData.find((f) => f.step === step);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PublishProjectFormInput, unknown, PublishProjectFormOutput>({
    resolver: zodResolver(publishProjectSchema),
    defaultValues: {
      skills: [],
    },
  });

  const onSubmit: SubmitHandler<PublishProjectFormOutput> = async (data) => {
    const result = await projectApi.publish(data);
    if (!result.success) {
      setError("root", {
        message: "Something went wrong, try again",
      });
      return;
    }

    navigate("/client/projects");
  };

  const formSkills = watch("skills");

  const handleAddSkill = (skill: number) => {
    if (skills === null) return;

    if (!skills.map((sk) => sk.id).includes(skill)) {
      return;
    }

    if (formSkills.includes(skill)) return;

    setValue("skills", [...formSkills, skill], {
      shouldValidate: true,
    });
  };

  const handleRemoveSkill = (skill: number) => {
    if (skills === null) return;

    if (!skills.map((sk) => sk.id).includes(skill)) {
      return;
    }

    setValue(
      "skills",
      formSkills.filter((sk) => sk !== skill),
      {
        shouldValidate: true,
      },
    );
  };

  const handleNextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(["title", "description"]);
    } else if (step === 2) {
      isValid = await trigger([
        "category_id",
        "skills",
        "experienceLevel",
        "size",
      ]);
    } else if (step === 3) {
      isValid = await trigger(["budget", "duration"]);
    }

    if (!isValid) return;

    onNext();
  };

  if (!currentFormHeader) {
    return (
      <div className="bg-gray-50 rounded-xl p-3 px-4">
        <div className="text-xl text-red-500 flex items-center justify-center h-[90%]">
          No Form
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-xl p-3 px-10">
      <h1 className="pt-10 text-center text-xl font-medium">
        {currentFormHeader.title}
      </h1>
      {errors.root && (
        <p className="bg-red-100 text-red-900 mt-3 rounded-md py-2 px-3 text-sm">
          {errors.root.message}
        </p>
      )}
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <ProjectDetailsForm register={register} errors={errors} />
        )}
        {step === 2 && (
          <ProjectScopeForm
            register={register}
            errors={errors}
            categories={categories}
            skills={skills}
            formSkills={formSkills}
            isCategoriesLoading={isCategoriesLoading}
            isSkillsLoading={isSkillsLoading}
            categoryError={categoryError}
            skillError={skillError}
            handleAddSkill={handleAddSkill}
            handleRemoveSkill={handleRemoveSkill}
          />
        )}
        {step === 3 && (
          <ProjectBudgetDuration register={register} errors={errors} />
        )}

        <div className="mt-5 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              className="bg-blue-500 text-white hover:bg-blue-600 transition w-30 h-8 rounded-md flex items-center justify-center gap-2 mr-auto"
              onClick={onPrev}
            >
              <MdOutlineNavigateNext className="rotate-180" /> <span>Prev</span>
            </button>
          )}
          {step < 3 && (
            <button
              type="button"
              className="bg-blue-500 text-white hover:bg-blue-600 transition w-30 h-8 rounded-md flex items-center justify-center gap-2 ml-auto"
              onClick={handleNextStep}
            >
              <span>Next</span> <MdOutlineNavigateNext />
            </button>
          )}
          {step == 3 && (
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white hover:bg-blue-600 transition w-30 h-8 rounded-md flex items-center justify-center gap-2 ml-auto"
            >
              <span>{isSubmitting ? "Publishing..." : "Submit"}</span>{" "}
              <MdOutlineNavigateNext />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default PublishProjectForm;
