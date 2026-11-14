import ErrorState from "@/components/shared/ErrorState";

interface PublishErrorStateProps {
  onRetry: () => void;
}

export default function PublishErrorState({ onRetry }: PublishErrorStateProps) {
  return (
    <ErrorState>
      <p className="text-red-500 text-md font-semibold mb-4">
        Unable to load the data needed in the form
      </p>
      <button
        type="button"
        className="text-white bg-red-400 hover:bg-red-500 transition w-30 h-7 rounded-xl"
        onClick={onRetry}
      >
        Try again
      </button>
    </ErrorState>
  );
}
