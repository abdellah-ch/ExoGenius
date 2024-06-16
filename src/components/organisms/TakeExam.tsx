{
  /*make a request to get exam info (questions , type(math,programming) ,duration ,islocked,isstarted,isended)
                render the exam depending on the information 
*/
}
import { FaClock, FaPenNib } from "react-icons/fa";
import { FaRocketchat } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";
import Split from "react-split";
import ReactCodeMirror from "@uiw/react-codemirror";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { Document, Page } from "react-pdf";
import Editor from "quill-editor-math";
import "quill-editor-math/dist/index.css";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useNavigate } from "react-router-dom";
const TakeExam = ({
  studentId,
  studentName,
  State,
  Subject,
}: {
  studentId: string;
  studentName: string;
  State: string;
  Subject: string;
}) => {
  const [time, setTime] = useState({
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newHour = now.getHours();
      const newMinute = now.getMinutes();

      setTime((prevTime) => {
        if (prevTime.hour !== newHour || prevTime.minute !== newMinute) {
          return {
            hour: newHour,
            minute: newMinute,
          };
        }
        return prevTime;
      });
    }, 1000); // Check every second for better accuracy

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timeUnit: any) =>
    timeUnit < 10 ? `0${timeUnit}` : timeUnit;
  const navigate = useNavigate();
  const [IsLoading, SetIsLoading] = useState<boolean>(true);
  const [ExamText, setExamText] = useState<string>();
  const [pdf, setPdf] = useState<string>();
  const pathname = location.pathname;
  const ExamKey = pathname.split("/")[2];
  const [studentAnswers, SetStudentAnswers] = useState<string>("");
  const [IsModel, SetIsModel] = useState<boolean>(false);
  const handelsumbit = () => {
    SetIsLoading(true);
    const info = {
      ExamKey: ExamKey,
      StudentId: studentId,
      Value: studentAnswers,
    };
    fetch("http://localhost/SubmitStudentAnswer", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      body: JSON.stringify(info),
    }).then((response) => {
      console.log(response);
      SetIsLoading(false);
    });
    localStorage.removeItem("StudentName");
    localStorage.removeItem("StudentId");
    // Update the status to Submited and submited websocket to node js server
    navigate("/");
  };
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch("http://localhost/GetExamPdf", {
          method: "POST",
          mode: "cors", // no-cors, *cors, same-origin
          body: JSON.stringify({ ExamKey: ExamKey }),
          headers: {
            "Content-Type": "application/pdf",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdf(url);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    if (State === "1") {
      SetIsLoading(true);
      fetchPdf();

      console.log(pdf);
      SetIsLoading(false);
    } else {
      const fetchText = async () => {
        try {
          console.log(ExamKey);
          const response = await fetch("http://localhost/GetExamText", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ ExamKey: ExamKey }),
          });
          console.log(response);

          const data = await response.json();
          console.log(data);
          setExamText(data.Value);
        } catch (error) {}
      };

      fetchText();

      SetIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (IsLoading === true) {
    return <Loading />;
  }

  if (IsLoading === false) {
    return (
      <div className="flex w-full h-full">
        {/* Model */}
        {IsModel ? (
          <AlertDialog open>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. your exam will Submited
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    SetIsModel(false);
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handelsumbit}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : null}
        {/* Model */}
        {/* SildeBar */}
        <div className="hidden sm:block text-white  xl:w-[15%] lg:w-[25%] md:w-[25%]  h-full bg-[#1d3461]">
          <div className="flex flex-col items-center justify-center text-2xl font-bold bg-[#829cbc] text-black">
            <p>{studentId}</p>
            <p>{studentName}</p>
          </div>
          <div className="w-full  p-2 mt-4 cursor-pointer bg-[#6290c8]">
            <p className="flex items-center  gap-2 text-xl">
              {" "}
              <FaPenNib /> Show Exam
            </p>
          </div>
          <div className="w-full  p-2  cursor-pointer hover:bg-gray-400">
            <p className="flex items-center  gap-2 text-xl">
              {" "}
              <FaRocketchat /> Chat
            </p>
          </div>
          <div className="w-[80%] rounded-xl border  mx-auto mt-3  p-2  cursor-pointer hover:bg-gray-400">
            <p
              onClick={() => {
                SetIsModel(true);
              }}
              className="flex items-center  gap-2 text-xl"
            >
              {" "}
              <FaRegCalendarCheck /> Submit Exam
            </p>
          </div>

          {/* Exam Time remaining */}
          <div className="xl:w-[15%] lg:w-[25%] md:w-[25%] p-4 absolute bottom-0  text-center">
            <p className="flex justify-center items-center gap-2 text-xl">
              <FaClock />
              {formatTime(time.hour)}:{formatTime(time.minute)}
            </p>
          </div>
        </div>
        <div className="w-[85%] sm:w-[95%] lg:w-[95%] xl:w-[95%] h-screen">
          <Split className="flex">
            <div className="cursor-pointer border-2 border-black  h-screen">
              {State === "1" ? (
                // <Document file={pdf}>
                //   <Page pageNumber={1} />
                // </Document>

                <iframe src={pdf} height="100%" width="100%" />
              ) : (
                <div
                  className="p-4"
                  dangerouslySetInnerHTML={{ __html: ExamText }}
                >
                  {}
                </div>
              )}
            </div>
            <div className="border-2 border-black bg-blue-100 h-[100vh] overflow-auto">
              {Subject === "Programming" ? (
                <ReactCodeMirror
                  className="h-full"
                  value={"//Code Here \n const"}
                  height="100%"
                  width="100%"
                  onChange={(value) => {
                    SetStudentAnswers(value);
                  }}
                  extensions={[loadLanguage("javascript")!]}
                />
              ) : (
                <Editor
                  initialValue=""
                  onChange={(value) => {
                    SetStudentAnswers(value);
                  }}
                />
              )}
            </div>
          </Split>
        </div>
      </div>
    );
  }
};

export default TakeExam;
