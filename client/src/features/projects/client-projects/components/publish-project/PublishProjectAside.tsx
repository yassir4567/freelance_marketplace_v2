import { formsAsideData } from "../../utils/data";

interface PublishProjectAsideProps {
  step: number;
}

function PublishProjectAside({ step }: PublishProjectAsideProps) {
  let currentAsideData = formsAsideData.find((d) => d.step === step);

  return (
    <div className="">
      <p className="text-xs text-gray-600 mb-3">{step}/4</p>
      <h1 className="text-xl font-medium mb-3">
        {currentAsideData ? currentAsideData.title : "No Title"}
      </h1>
      <p className="text-xs text-gray-600">
        {currentAsideData ? currentAsideData.description : "No Description"}
      </p>
    </div>
  );
}

export default PublishProjectAside;
