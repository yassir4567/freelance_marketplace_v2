import { formsAsideData } from "../utils/data";

interface PublishProjectAsideProps {
  step: number;
}

function PublishProjectAside({ step }: PublishProjectAsideProps) {
  let currentAsideData = formsAsideData.find((d) => d.step === step);

  return (
    <div className="bg-gray-50 rounded-xl py-3 px-4 flex flex-col items-center justify-center text-center">
      <h1 className="text-xl font-medium mb-3">
        {currentAsideData ? currentAsideData.title : "No Title"}
      </h1>
      <p className="text-sm text-gray-600 break-all">
        {currentAsideData ? currentAsideData.description : "No Description"}
      </p>
    </div>
  );
}

export default PublishProjectAside;
