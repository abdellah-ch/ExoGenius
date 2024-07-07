import StepOne from "../components/molecules/StepOne";
import Upload from "../components/molecules/Upload";
import WriteExam from "../components/molecules/WriteExam";
import ExamConfig from "../components/molecules/ExamConfig";
import { FaArrowRight } from "react-icons/fa";
import { TbCircleNumber1 } from "react-icons/tb";
import { TbCircleNumber2 } from "react-icons/tb";
import { TbCircleNumber3 } from "react-icons/tb";
import { useRef, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import useAuthStateTeacher from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const NewExam = () => {
  const navigate = useNavigate();
  const { teacherId } = useAuthStateTeacher();
  console.log(teacherId);

  const TitleRef = useRef<HTMLInputElement>(null);
  // const result = await uploadFile(fileData, {
  //   publicKey: "YOUR_PUBLIC_KEY",
  //   store: "auto",
  //   metadata: {
  //     subsystem: "uploader",
  //     pet: "cat",
  //   },
  // });
  // console.log(`URL: ${file.cdnUrl}`);
  const [examTitle, setExamTitle] = useState<string | undefined>(undefined);
  //const [examTitle, setExamTitle] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<string | undefined>(undefined);
  const [subject, setSubject] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState<number | undefined>(0);
  // console.log(isLocked?.toString());

  const [state, setState] = useState<number>(0);
  console.log(state);

  const [EditorValue, setEditorValue] = useState<string>("");

  console.log(EditorValue);

  const steps = [
    <StepOne
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      setState={setState}
    />,
    <Upload
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      setUploadedFile={setUploadedFile}
      uploadedFile={uploadedFile}
    />,
    <WriteExam setEditorValue={setEditorValue} />,
    <ExamConfig
      duration={duration}
      setDuration={setDuration}
      subject={subject}
      setSubject={setSubject}
      isLocked={isLocked}
      setIsLocked={setIsLocked}
    />,
  ];

  const handleNext = () => {
    setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
  };

  // // Function to go to the previous component
  // const handlePrev = () => {
  //   setCurrentStep((prevStep) => (prevStep - 1 + steps.length) % steps.length);
  // };
  const handleSaveExam = async () => {
    // console.log({ examTitle, uploadedFile, duration, subject, isLocked });
    if (
      duration &&
      examTitle &&
      subject &&
      teacherId &&
      (uploadedFile || EditorValue)
    ) {
      const info = {
        userId: teacherId,
        duration: duration,
        examTitle: examTitle,
        isLocked: isLocked?.toString(),
        subject: subject,
        state: state,
      };

      // console.log(info);

      const res = await fetch("https://exob.onrender.com/NewExam", {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        body: JSON.stringify(info),
      });
      // console.log(res);

      const data = await res.json();

      console.log(data);

      // console.log(data.examKey);
      if (data.state === 1) {
        const result = await fetch("https://exob.onrender.com/uploadPdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/octet-stream",
            "X-File-Name": data.examKey,
          },
          mode: "cors", // no-cors, *cors, same-origin
          body: uploadedFile,
        });
        if (result.status === 200) {
          navigate("/dashboard/ExamList");
        } else {
          console.log("error", result.status);
        }
      } else if (data.state === 0) {
        //insert the exam value into the database ExamText
        console.log(EditorValue);
        console.log(data);

        const send = {
          ExamKey: data.examKey,
          Text: EditorValue,
        };
        const res = await fetch("https://exob.onrender.com/ExamText", {
          method: "POST",
          mode: "cors", // no-cors, *cors, same-origin
          body: JSON.stringify(send),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const alo = await res.json();
        console.log(alo);
        navigate("/dashboard/ExamList");
      }
    }
  };
  return (
    <div className=" bg-zinc-100  md:flex flex-col items-center p-4 w-[100%] mx-auto hidden">
      <div className="w-full  bg-white dark:bg-zinc-900   rounded-lg shadow-md">
        <div className="w-full flex justify-between items-center mb-4 py-3 px-2 border-b-[1px] bg-gray">
          <input
            ref={TitleRef}
            type="text"
            placeholder="Enter the exam name"
            className="border border-zinc-300  rounded-lg p-2 lg:w-[60%] w-[40%] "
            onChange={() => {
              setExamTitle(TitleRef.current?.value);
            }}
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
                onClick={handleSaveExam}
                className="bg-zinc-400 dark:bg-zinc-600 text-white px-8 font-bold py-2 rounded-full flex items-center"
              >
                Save
                <FaSave className="ml-2 text-xl text-black" />
              </button>
            ) : (
              <button
                onClick={handleNext}
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
