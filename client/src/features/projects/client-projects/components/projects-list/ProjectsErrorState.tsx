import ErrorState from "@/components/shared/ErrorState";
import UnauthorizedError from "@/components/shared/UnauthorizedError";

interface ProjectsErrorStateProps {
  error: string;
  statusCode: number | null;
  onRetry: () => void;
}

export default function ProjectsErrorState({
  error,
  statusCode,
  onRetry,
}: ProjectsErrorStateProps) {
  return (
    <>
      {statusCode === 401 ? (
        <UnauthorizedError message={error} />
      ) : (
        <ErrorState>
          <div className="text-red-500 text-md">{error}</div>
          <button type="button" onClick={onRetry}>
            Retry
          </button>
        </ErrorState>
      )}
    </>
  );
}