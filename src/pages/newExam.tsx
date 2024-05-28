import StepOne from "../components/molecules/StepOne";
import Upload from "../components/molecules/Upload";
import WriteExam from "../components/molecules/WriteExam";
import ExamConfig from "../components/molecules/ExamConfig";
import { FaArrowRight } from "react-icons/fa";
import { TbCircleNumber1 } from "react-icons/tb";
import { TbCircleNumber2 } from "react-icons/tb";
import { TbCircleNumber3 } from "react-icons/tb";
import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";

const NewExam = () => {
  // const result = await uploadFile(fileData, {
  //   publicKey: "YOUR_PUBLIC_KEY",
  //   store: "auto",
  //   metadata: {
  //     subsystem: "uploader",
  //     pet: "cat",
  //   },
  // });
  // console.log(`URL: ${file.cdnUrl}`);

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [uploadedFile, setUploadedFile] = useState<String | null>(null);

  const steps = [
    <StepOne currentStep={currentStep} setCurrentStep={setCurrentStep} />,
    <Upload
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      setUploadedFile={setUploadedFile}
      uploadedFile={uploadedFile}
    />,
    <WriteExam />,
    <ExamConfig />,
  ];

  // const handleNext = () => {
  //   setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
  // };

  // // Function to go to the previous component
  // const handlePrev = () => {
  //   setCurrentStep((prevStep) => (prevStep - 1 + steps.length) % steps.length);
  // };

  return (
    <div className=" bg-zinc-100  md:flex flex-col items-center p-4 w-[100%] mx-auto hidden">
      <div className="w-full  bg-white dark:bg-zinc-900   rounded-lg shadow-md">
        <div className="w-full flex justify-between items-center mb-4 py-3 px-2 border-b-[1px] bg-gray">
          <input
            type="text"
            placeholder="Enter the exam name"
            className="border border-zinc-300  rounded-lg p-2 lg:w-[60%] w-[40%] "
          />
          <div className="flex  items-center justify-center space-x-2 gap-6">
            <div className="flex items-center space-x-1">
              {currentStep > 0 ? (
                <FaCircleCheck className="text-4xl text-blue-500" />
              ) : (
                <TbCircleNumber1 className="text-4xl text-blue-500" />
              )}
              <span className="text-blue-500 dark:text-zinc-500 font-bold text-2xl">
                —
              </span>
              {currentStep > 1 ? (
                <FaCircleCheck className="text-4xl text-blue-500" />
              ) : (
                <TbCircleNumber2 className="text-4xl" />
              )}
              <span className="text-zinc-400 dark:text-zinc-500 font-bold text-2xl">
                —
              </span>
              <TbCircleNumber3 className="text-4xl" />
            </div>
            {currentStep === 3 ? (
              <button
                onClick={() => {}}
                className="bg-zinc-400 dark:bg-zinc-600 text-white px-8 font-bold py-2 rounded-full flex items-center"
              >
                Save
                <FaSave className="ml-2 text-xl text-black" />
              </button>
            ) : (
              <button
                onClick={() => {}}
                className="bg-zinc-400 dark:bg-zinc-600 text-white px-8 font-bold py-2 rounded-full flex items-center"
              >
                Next
                <FaArrowRight className="ml-2 mt-1 text-xl" />
              </button>
            )}
          </div>
        </div>
        {steps[currentStep]}
      </div>
    </div>
  );
};
export default NewExam;
