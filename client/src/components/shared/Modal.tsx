import React from "react";

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-1000">
      {children}
    </div>
  );
}
