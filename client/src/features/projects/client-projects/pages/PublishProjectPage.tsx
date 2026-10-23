import PublishProjectAside from "../components/PublishProjectAside";
import PublishProjectForm from "../components/PublishProjectForm";
import PublishProjectHeader from "../components/PublishProjectHeader";
import { useStep } from "../hooks/useStep";

function PublishProjectPage() {
  const { step, onNext, onPrev } = useStep();

  return (
    <div>
      <PublishProjectHeader />
      <section className="mt-10 grid grid-cols-[400px_1fr] gap-2 h-150 bg-gray-200 p-2 shadow-lg rounded-xl shadow-gray-200">
        <PublishProjectAside step={step} />
        <PublishProjectForm step={step} onNext={onNext} onPrev={onPrev} />
      </section>
    </div>
  );
}

export default PublishProjectPage;
