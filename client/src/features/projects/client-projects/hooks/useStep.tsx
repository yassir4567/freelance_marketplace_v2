import { useState } from "react";

export const useStep = () => {
  const [step, setStep] = useState(1);

  const onNext = () => {
    if (step == 3) return;
    setStep((prev) => prev + 1);
  };
  const onPrev = () => {
    if (step == 1) return;
    setStep((prev) => prev - 1);
  };

  return { step, onNext, onPrev };
};
