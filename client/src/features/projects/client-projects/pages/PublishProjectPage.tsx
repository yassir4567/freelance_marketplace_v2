import PublishProjectAside from "../components/publish-project/PublishProjectAside";
import PublishProjectForm from "../components/publish-project/PublishProjectForm";
import { useStep } from "../hooks/useStep";

function PublishProjectPage() {
  const { step, onNext, onPrev } = useStep();

  return (
    <div className="mx-20 mt-10">
      <section className={`${step < 5 && "grid grid-cols-[400px_1fr] gap-8"}`}>
        {step < 5 && <PublishProjectAside step={step} />}
        <PublishProjectForm step={step} onNext={onNext} onPrev={onPrev} />
      </section>
    </div>
  );
}

export default PublishProjectPage;
