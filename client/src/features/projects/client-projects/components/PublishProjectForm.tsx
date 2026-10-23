import { formsHeaderData } from "../utils/data";
import { MdOutlineNavigateNext } from "react-icons/md";
import ProjectDetailsForm from "./ProjectDetailsForm";
import ProjectScopeForm from "./ProjectScopeForm";
import ProjectBudgetDuration from "./ProjectBudgetDuration";
import { usePublishProjectForm } from "../hooks/usePublishProjectForm";

interface PublishProjectFormProps {
  step: number;
  onNext: () => void;
  onPrev: () => void;
}

function PublishProjectForm({ step, onNext, onPrev }: PublishProjectFormProps) {
  const currentFormHeader = formsHeaderData.find((f) => f.step === step);
  const {
    form,
    errors,
    handleInputChange,
    validateProjectDetails,
    validateProjectScope,
    validateProjectBudgetAndDuration,
    handleSubmit,
    handleAddSkill,
    handleRemoveSkill
  } = usePublishProjectForm();

  const handleNext = () => {
    let isValid = false;
    if (step === 1) {
      isValid = validateProjectDetails(form.title, form.description);
    } else if (step === 2) {
      isValid = validateProjectScope(
        form.experienceLevel,
        form.size,
        form.category_id,
        form.skills,
      );
    } else if (step === 3) {
      isValid = validateProjectBudgetAndDuration(form.budget, form.duration);
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
      <form className="mt-10">
        {step === 1 && (
          <ProjectDetailsForm
            form={form}
            onChange={handleInputChange}
            errors={errors}
          />
        )}
        {step === 2 && (
          <ProjectScopeForm
            form={form}
            onChange={handleInputChange}
            errors={errors}
          />
        )}
        {step === 3 && (
          <ProjectBudgetDuration
            form={form}
            onChange={handleInputChange}
            errors={errors}
          />
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
              onClick={handleNext}
            >
              <span>Next</span> <MdOutlineNavigateNext />
            </button>
          )}
          {step == 3 && (
            <button
              type="button"
              className="bg-blue-500 text-white hover:bg-blue-600 transition w-30 h-8 rounded-md flex items-center justify-center gap-2 ml-auto"
              onClick={onNext}
            >
              <span>Submit</span> <MdOutlineNavigateNext />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default PublishProjectForm;
