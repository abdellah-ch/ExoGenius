import image1 from "/create.png";

import image2 from "/upload.jpg";

interface StepProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setState: React.Dispatch<React.SetStateAction<number>>;
}
const StepOne = (props: StepProps) => {
  return (
    <div className="py-20 p-11">
      <h2 className="text-center text-2xl font-semibold mb-2">
        Choose exam format
      </h2>
      <p className="text-center text-zinc-500 dark:text-zinc-400 mb-6">
        How will this look for the students?
      </p>
      <div className="flex justify-center space-x-4 mb-4">
        <div
          onClick={() => {
            props.setCurrentStep(2);
            props.setState(0);
          }}
          className="cursor-pointer relative p-6 bg-white dark:bg-zinc-900 border lg:h-[250px] h-[200px] border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm w-[40%]"
        >
          <img
            src={image1}
            alt="Use question types"
            className="mx-auto mb-4 lg:h-[150px] h-[110px]"
          />
          <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            Create a document
          </span>
          <p className="text-center text-zinc-700 dark:text-zinc-300">
            Create a document
          </p>
        </div>
        <div
          onClick={() => {
            props.setCurrentStep(1);
            props.setState(1);
          }}
          className=" cursor-pointer relative p-6 bg-white dark:bg-zinc-900 border lg:h-[250px] h-[200px]  border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm w-[40%]"
        >
          <img
            src={image2}
            alt="Upload or create a document"
            className="mx-auto mb-4 lg:h-[150px] h-[110px]"
          />
          <div className="absolute top-2 right-2 flex space-x-1">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              PDF
            </span>
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              T
            </span>
          </div>
          <p className="text-center text-zinc-700 dark:text-zinc-300">
            Upload a document
          </p>
        </div>
      </div>
      <p className="text-center text-zinc-500 dark:text-zinc-400 cursor-pointer">
        Neither, skip digital questions ➡️
      </p>
    </div>
  );
};

export default StepOne;
