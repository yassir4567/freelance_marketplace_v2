import ErrorState from "./ErrorState";

interface UnauthorizedErrorProps {
  message: string;
}

export default function UnauthorizedError({ message }: UnauthorizedErrorProps) {
  return (
    <ErrorState>
      <div className="flex flex-col items-center gap-4">
        <h2 className="mb-2">Session Expired</h2>

        <p className="mb-2">{message}</p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="py-1 px-5 text-white bg-blue-500 hover:bg-blue-600 rounded"
        >
          Login
        </button>
      </div>
    </ErrorState>
  );
}
