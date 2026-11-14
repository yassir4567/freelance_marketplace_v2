import type React from "react";

interface ErrorStateProps {
  children: React.ReactNode;
}

export default function ErrorState({ children }: ErrorStateProps) {
  return (
    <div className="bg-white border border-gray-300 flex flex-col items-center px-4 py-7 rounded-xl">
      {children}
    </div>
  );
}
