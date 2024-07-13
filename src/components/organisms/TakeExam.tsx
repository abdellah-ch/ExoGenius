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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import Editor from "quill-editor-math";
// import "quill-editor-math/dist/index.css";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

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
  const [teacherId, setTeacherId] = useState<number>(undefined);

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const fetchTeacherId = async () => {
    console.log(ExamKey);
    const info = {
      ExamKey: ExamKey,
    };
    const response = await fetch(
      "https://exogeniusnode.onrender.com/api/GetTeacherId",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(info),
      }
    );
    const data = await response.json();
    const teacherId = data[0]["CreatedBy"];
    setTeacherId(Number(teacherId));
  };
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        "https://exogeniusnode.onrender.com/api/getMessages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({
            teacherId: teacherId, // replace with actual teacherId
            studentId: studentId, // replace with actual studentId
          }),
        }
      );
      console.log(response);

      const data = await response.json();
      console.log(data);

      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const ws = useRef<WebSocket | null>(null);

  const sendMessage = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        type: "chat",
        ExamKey: pathname.split("/")[2], // Include the ExamKey
        SenderType: "Student", // or 'Teacher', depending on the sender
        SenderId: studentId, // Include the SenderId
        ReceiverType: "Teacher", // or 'Student', depending on the receiver
        ReceiverId: teacherId, // Receiver's ID
        MessageText: inputValue,
      };
      ws.current.send(JSON.stringify(message));
      setInputValue("");
    }
  };
  useEffect(() => {
    fetchTeacherId();
    fetchMessages();
    ws.current = new WebSocket("wss://exogeniusnode.onrender.com");

    // Handle incoming messages
    ws.current.onmessage = (event: any) => {
      const message = JSON.parse(event.data);
      console.log(message);
      if (
        (message.ReceiverId === studentId && message.SenderId == teacherId) ||
        (message.ReceiverId == teacherId && message.SenderId == studentId)
      )
        setMessages((prevMessages: any[]) => {
          const updatedMessages = [...prevMessages, message];
          console.log("updated messages : ", updatedMessages);
          return updatedMessages;
        });
    };

    // Handle connection close
    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Cleanup function to close WebSocket connection
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [teacherId]);

  const checkTeacherSubmited = async () => {
    const info = {
      ExamKey: ExamKey,
      StudentId: studentId,
    };
    const res = await fetch("https://exob.onrender.com/CheckTeacherSubmited", {
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
    fetch("https://exob.onrender.com/SubmitStudentAnswer", {
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
  }, [teacherSubmited]);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch("https://exob.onrender.com/GetExamPdf", {
          method: "POST",
          mode: "cors", // no-cors, *cors, same-origin
          body: JSON.stringify({ ExamKey: ExamKey }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // const data = await response.json();

        // console.log(response);

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
          const response = await fetch(
            "https://exob.onrender.com/GetExamText",
            {
              method: "POST",
              mode: "cors",
              body: JSON.stringify({ ExamKey: ExamKey }),
            }
          );
          console.log(response);

          const data = await response.json();
          console.log(data);
          setExamText(data.Value);
        } catch (error) {
          console.log(error);
        }
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

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // Scroll to the bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
                  {messages.length === 0 ? (
                    <p className="text-muted-foreground">
                      Note that messages only reach the receiver if they are
                      currently in the exam view.
                    </p>
                  ) : (
                    <div
                      ref={chatContainerRef}
                      className="w-full max-h-[300px] overflow-y-scroll flex flex-col gap-2 mb-4"
                    >
                      {messages.map((msg, index) => (
                        <div
                          className={
                            msg.SenderType === "Teacher"
                              ? "flex justify-start"
                              : "flex justify-end"
                          }
                        >
                          <div
                            className="relative w-[70%]  text-xs text-center bg-blue-500 text-white font-mono py-2 px-1 shadow rounded-xl "
                            key={index}
                          >
                            {msg.MessageText}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="border-t p-2">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendMessage();
                    }}
                  >
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                      }}
                      placeholder="Type here"
                      className="w-full p-2 border rounded-lg"
                    />
                  </form>
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
        <div className="hidden sm:block text-white  xl:w-[15%] lg:w-[20%] md:w-[20%] w-[10%]  h-full bg-[#1d3461]">
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
              <FaRegCalendarCheck /> Submit
            </p>
          </div>

          {/* Exam Time remaining */}
          <div className="xl:w-[15%] lg:w-[20%] md:w-[20%] w-[10%] flex  justify-center p-2 mx-auto  text-center absolute bottom-0 -left-4 ">
            <p className="flex items-center  gap-2 text-xl">
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
                <ReactQuill
                  modules={modules}
                  theme="snow"
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
