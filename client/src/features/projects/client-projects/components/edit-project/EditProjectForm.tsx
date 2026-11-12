import { useCategory } from "@/hooks/useCategory";
import type { ClientProjectDetails } from "../../types/project.types";
import { useSkills } from "@/hooks/useSkill";
import { useForm, type SubmitHandler } from "react-hook-form";
import EditDetailsForm from "./EditDetailsForm";
import {
  updateProjectSchema,
  type UpdateProjectFormInput,
  type UpdateProjectFormOutput,
} from "../../schema/project.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import EditCategorySkillsForm from "./EditCategorySkillsForm";
import EditProjectScope from "./EditProjectScope";
import { useState } from "react";
import { projectApi } from "@/api/project.api";
import { useNavigate } from "react-router-dom";

interface EditProjectFormProps {
  project: ClientProjectDetails;
}

function EditProjectForm({ project }: EditProjectFormProps) {
  const {
    categories,
    isLoading: isCategoriesLoading,
    error: categoryError,
  } = useCategory();

  const { skills, isLoading: isSkillsLoading, error: skillError } = useSkills();

  const [isEditMode, setIsEditMode] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
  } = useForm<UpdateProjectFormInput, unknown, UpdateProjectFormOutput>({
    defaultValues: {
      title: project.title,
      description: project.description,
      experienceLevel: project.experienceLevel,
      size: project.size,
      duration: project.duration,
      budget: project.budget,
      category_id: project.category.id,
      skills: project.skills.map((skill) => skill.id),
    },
    mode: "onChange",
    resolver: zodResolver(updateProjectSchema),
  });

  const formSkills = watch("skills");

  const handleAddSkill = (skill: number) => {
    if (skills === null) return;

    if (!skills.map((sk) => sk.id).includes(skill)) {
      return;
    }

    if (formSkills.includes(skill)) return;

    setValue("skills", [...formSkills, skill], {
      shouldValidate: true,
      shouldDirty: true,
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
        shouldDirty: true,
      },
    );
  };

  const onSubmit: SubmitHandler<UpdateProjectFormOutput> = async (data) => {
    const payload = Object.fromEntries(
      Object.entries(data).filter(([field]) => field in dirtyFields),
    );

    const result = await projectApi.update(payload, String(project.id));
    if (!result.success) {
      if (result.status === 422 && result.errors) {
        const validationErrors = result.errors;
        Object.entries(validationErrors).forEach(([field, messages]) => {
          setError(field as keyof UpdateProjectFormInput, {
            type: "server",
            message: messages[0],
          });
        });
        setError("root", {
          message: "Some fields are invalid, check them",
        });
      } else {
        setError("root", {
          message: "Something went wrong, try again",
        });
      }
      return;
    }

    navigate(`/client/projects/${project.id}`);

    setIsEditMode(false);
  };

  const onGoBack = () => {
    reset();
    setIsEditMode(false);
  };

  if (isCategoriesLoading || isSkillsLoading) {
    return <div>Load categories and skills</div>;
  }

  if (categoryError !== "") {
    return <div>{categoryError}</div>;
  }

  if (skillError !== "") {
    return <div>{skillError}</div>;
  }

  if (!categories || !skills) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.root && (
        <p className="bg-red-100 text-red-900 mt-3 mb-5 rounded-md py-3 px-4 text-xs">
          {errors.root.message}
        </p>
      )}
      <div className="mt-3 flex justify-between">
        <h1 className="text-xl font-mono">Edit your project</h1>

        {!isEditMode && (
          <button
            type="button"
            className="border border-blue-300 text-blue-400 px-5 py-1 rounded-lg"
            onClick={() => setIsEditMode(true)}
          >
            Edit
          </button>
        )}
      </div>
      <EditDetailsForm
        register={register}
        errors={errors}
        isEditMode={isEditMode}
      />
      <EditCategorySkillsForm
        register={register}
        categories={categories}
        skills={skills}
        formSkills={formSkills}
        handleAddSkill={handleAddSkill}
        handleRemoveSkill={handleRemoveSkill}
        errors={errors}
        isEditMode={isEditMode}
      />
      <EditProjectScope
        register={register}
        errors={errors}
        isEditMode={isEditMode}
      />

      {isEditMode && (
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={onGoBack}
            className="text-gray-500 underline hover:text-gray-700"
          >
            Go back
          </button>
          <button
            type="submit"
            className="border bg-blue-500 hover:bg-blue-600 transition text-white px-5 py-1 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!isDirty || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Save Changes"}
          </button>
        </div>
      )}
    </form>
  );
}

export default EditProjectForm;
