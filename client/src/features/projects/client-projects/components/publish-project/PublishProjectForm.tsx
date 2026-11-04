import { MdOutlineNavigateNext } from "react-icons/md";
import ProjectDetailsForm from "./ProjectDetailsForm";
import ProjectScopeForm from "./ProjectScopeForm";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSkills } from "@/hooks/useSkill";
import { useCategory } from "@/hooks/useCategory";
import { projectApi } from "@/api/project.api";
import { useNavigate } from "react-router-dom";
import {
  publishProjectSchema,
  type PublishProjectFormInput,
  type PublishProjectFormOutput,
} from "../../schema/project.schema";
import ProjectCategorySkillsForm from "./ProjectCategorySkillsForm";
import ProjectBudgetForm from "./ProjectBudgetForm";
import ProjectOverview from "./ProjectOverview";

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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<PublishProjectFormInput, unknown, PublishProjectFormOutput>({
    resolver: zodResolver(publishProjectSchema),
    mode: "onChange",
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
      isValid = await trigger(["category_id", "skills"]);
    } else if (step === 3) {
      isValid = await trigger(["experienceLevel", "size", "duration"]);
    } else if (step === 4) {
      isValid = await trigger(["budget"]);
    }

    if (!isValid) return;

    onNext();
  };

  let stepsRender: Record<number, React.ReactNode> = {
    1: <ProjectDetailsForm register={register} errors={errors} />,
    2: (
      <ProjectCategorySkillsForm
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
    ),
    3: <ProjectScopeForm register={register} errors={errors} />,
    4: <ProjectBudgetForm register={register} errors={errors} />,
  };

  const formValues = getValues();

  return (
    <div className="">
      {errors.root && (
        <p className="bg-red-100 text-red-900 mt-3 rounded-md py-2 px-3 text-sm">
          {errors.root.message}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {step < 5 ? (
          (stepsRender[step] ?? null)
        ) : (
          <ProjectOverview
            values={formValues}
            isSubmitting={isSubmitting}
            categories={categories}
            skills={skills}
          />
        )}

        {step < 5 && (
          <div className="mt-5 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                className="text-blue-400 hover:text-blue-500 transition flex items-center justify-center gap-2 mr-auto"
                onClick={onPrev}
              >
                <MdOutlineNavigateNext className="rotate-180" />
                <span>Prev</span>
              </button>
            )}
            {step <= 3 && (
              <button
                type="button"
                className="text-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2 ml-auto"
                onClick={handleNextStep}
              >
                <span>Next</span> <MdOutlineNavigateNext />
              </button>
            )}
            {step == 4 && (
              <button
                type="button"
                className="text-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2 ml-auto"
                onClick={handleNextStep}
              >
                <span>Overview</span>
                <MdOutlineNavigateNext />
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default PublishProjectForm;
