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
// import Editor from "quill-editor-math";
// import "quill-editor-math/dist/index.css";
import { useCallback, useEffect, useState } from "react";
import Loading from "./Loading";
import Draggable from "react-draggable";

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
import { IoClose } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
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

  const [showChat, setShowChat] = useState<boolean>(false);

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
  const [teacherSubmited, setTeacherSubmited] = useState<boolean>(false);

  const checkTeacherSubmited = async () => {
    const info = {
      ExamKey: ExamKey,
      StudentId: studentId,
    };
    const res = await fetch("/api/CheckTeacherSubmited", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(info),
    });

    const data = await res.json();

    if (data.TeacherSubmitted) {
      setTeacherSubmited(true);
    }
  };
  useEffect(() => {
    checkTeacherSubmited(); // Initial fetch
    const interval = setInterval(checkTeacherSubmited, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [ExamKey, studentId]);

  const handelsumbit = () => {
    SetIsLoading(true);
    const info = {
      ExamKey: ExamKey,
      StudentId: studentId,
      Value: studentAnswers,
    };
    fetch("/api/SubmitStudentAnswer", {
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
    if (teacherSubmited) {
      handelsumbit();
    }
  }, [teacherSubmited, handelsumbit]);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch("/api/GetExamPdf", {
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
          const response = await fetch("/api/GetExamText", {
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
  const eventLogger = useCallback((e: any, data: any) => {
    console.log("Event: ", e);
    console.log("Data: ", data);
  }, []);

  const handleStart = useCallback(eventLogger, []);
  const handleDrag = useCallback(eventLogger, []);
  const handleStop = useCallback(eventLogger, []);
  if (IsLoading === true) {
    return <Loading />;
  }

  if (IsLoading === false) {
    return (
      <div className="flex w-full h-full" id="exam">
        {showChat && (
          <Draggable
            axis="both"
            handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
            grid={[25, 25]}
            scale={1}
            onStart={handleStart}
            onDrag={handleDrag}
            onStop={handleStop}
          >
            <div className="absolute bottom-0 right-0 z-999999">
              <div className="handle cursor-move">Drag from here</div>
              {/* past  */}
              <div className="max-w-sm mx-auto border rounded-lg shadow-lg">
                <div className="bg-orange-500 text-white flex items-center justify-between p-2 rounded-t-lg">
                  <div className="flex items-center">
                    <MdMessage />

                    <span>Teacher chat</span>
                  </div>
                  <button
                    className="text-white"
                    onClick={() => {
                      setShowChat(false);
                    }}
                  >
                    <IoClose />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-muted-foreground">
                    Note that messages only reach the receiver if they are
                    currently in the exam view.
                  </p>
                </div>
                <div className="border-t p-2">
                  <input
                    type="text"
                    placeholder="Type here"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>
          </Draggable>
        )}
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
          <div
            className="w-full  p-2  cursor-pointer hover:bg-gray-400"
            onClick={() => setShowChat((pre) => !pre)}
          >
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
                <></>
                // <Editor
                //   initialValue=""
                //   onChange={(value) => {
                //     SetStudentAnswers(value);
                //   }}
                // />
              )}
            </div>
          </Split>
        </div>
      </div>
    );
  }
};

export default TakeExam;
