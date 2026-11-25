import { useCategory } from "@/hooks/useCategory";
import PublishProjectAside from "../components/publish-project/PublishProjectAside";
import PublishProjectForm from "../components/publish-project/PublishProjectForm";
import { useStep } from "../hooks/useStep";
import { useSkills } from "@/hooks/useSkill";
import PublishProjectSkeleton from "../components/publish-project/PublishProjectSkeleton";
import PublishErrorState from "../components/publish-project/PublishErrorState";
import { useRequiredAuth } from "@/context/AuthContext";
import CompleteProfileAlert from "@/components/shared/CompleteProfileAlert";

function PublishProjectPage() {
  const { step, onNext, onPrev } = useStep();

  const { profileCompelation } = useRequiredAuth();

  const {
    categories,
    isLoading: isCategoriesLoading,
    error: categoryError,
    retry: onRetryCategories,
  } = useCategory();

  const {
    skills,
    isLoading: isSkillsLoading,
    error: skillError,
    retry: onRetrySkills,
  } = useSkills();

  const onRetry = () => {
    if (categoryError || categories === null) void onRetryCategories();
    if (skillError || skills === null) void onRetrySkills();
  };

  return (
    <>
      {profileCompelation.isProfileCompleted ? (
        <div className="mx-20 mt-10">
          {isCategoriesLoading || isSkillsLoading ? (
            <PublishProjectSkeleton />
          ) : categoryError ||
            skillError ||
            categories === null ||
            skills === null ? (
            <PublishErrorState onRetry={onRetry} />
          ) : (
            <section
              className={`${step < 5 ? "grid grid-cols-[400px_1fr] gap-8" : ""}`}
            >
              {step < 5 && <PublishProjectAside step={step} />}
              <PublishProjectForm
                step={step}
                onNext={onNext}
                onPrev={onPrev}
                categories={categories}
                skills={skills}
              />
            </section>
          )}
        </div>
      ) : (
        <CompleteProfileAlert />
      )}
    </>
  );
}

export default PublishProjectPage;
