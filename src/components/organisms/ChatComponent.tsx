import { MdOutlineMessage } from "react-icons/md";
import { Input } from "../ui/Input";
import { IoIosSend } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import useAuthStateTeacher from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../atoms/LoadingSpiner";

const ChatComponent = (props: any) => {
  const { pathname } = useLocation();
  // Chat Logic
  const [messages, setMessages] = useState<any[]>([]);

  const [inputValue, setInputValue] = useState("");

  const ws = useRef<WebSocket | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  // const ws = new WebSocket("ws://exogeniusnode.onrender.com");

  // const sendMessage = () => {
  //   const message = {
  //     type: "chat",
  //     examKey: pathname.split("/")[3], // Include the ExamKey
  //     senderType: "Teacher", // or 'Teacher', depending on the sender
  //     senderId: teacherId, // Include the SenderId
  //     receiverType: "Student", // or 'Student', depending on the receiver
  //     receiverId: selectedStudent.StudentId, // Receiver's ID
  //     messageText: inputValue,
  //   };
  //   ws.send(JSON.stringify(message));
  //   setInputValue("");
  // };
  const sendMessage = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        type: "chat",
        ExamKey: pathname.split("/")[3], // Include the ExamKey
        SenderType: "Teacher", // or 'Teacher', depending on the sender
        SenderId: props.teacherId, // Include the SenderId
        ReceiverType: "Student", // or 'Student', depending on the receiver
        ReceiverId: props.selectedStudent.StudentId, // Receiver's ID
        MessageText: inputValue,
      };
      ws.current.send(JSON.stringify(message));
      setInputValue("");
    }
  };
  // console.log(selectedStudent);
  const fetchMessages = async () => {
    try {
      console.log(props.selectedStudent);

      const response = await fetch(
        "https://exogeniusnode.onrender.com/api/getMessages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({
            teacherId: props.teacherId, // replace with actual teacherId
            studentId: props.selectedStudent.StudentId, // replace with actual studentId
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
  useEffect(() => {
    console.log(props);
    fetchMessages();

    // Initialize WebSocket connection
    ws.current = new WebSocket("ws://exogeniusnode.onrender.com");

    // Handle incoming messages
    ws.current.onmessage = (event: any) => {
      const message = JSON.parse(event.data);
      console.log(message);
      if (
        (message.SenderId == props.teacherId &&
          message.ReceiverId == props.selectedStudent.StudentId) ||
        (message.SenderId == props.selectedStudent.StudentId &&
          message.ReceiverId == props.teacherId)
      ) {
        console.log(props.selectedStudent.StudentId);

        setMessages((prevMessages: any[]) => {
          const updatedMessages = [...prevMessages, message];
          console.log("updated messages : ", updatedMessages);
          return updatedMessages;
        });
      }
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
  }, [props.selectedStudent.StudentId, props.componetState]);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Chat Logic

  return (
    <>
      {props.componetState != "overview" && (
        <div className="w-[20%]">
          {/* Chat with student  */}
          <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-orange-500 p-4 flex items-center justify-center gap-3">
              <MdOutlineMessage className="text-white text-xl mt-1" />

              <span className="text-white font-semibold">
                {props.selectedStudent?.FullName}
              </span>
            </div>
            <div className="p-4 text-center">
              {props.selectedStudent.Status === "submitted" ? (
                <p className="p-8 text-gray-600">
                  the student has submitted their exam
                </p>
              ) : messages.length === 0 ? (
                <p className="text-zinc-700 mb-4">
                  Note that messages only reach the receiver if they are
                  currently in the exam view
                </p>
              ) : (
                <div
                  ref={chatContainerRef}
                  className="w-full max-h-[300px] overflow-y-scroll flex flex-col gap-2 mb-4 "
                >
                  {messages.map((msg, index) => (
                    <div
                      className={
                        msg.SenderType === "Teacher"
                          ? "flex justify-end"
                          : "flex justify-start"
                      }
                    >
                      <div
                        className="relative w-[70%]  text-xs bg-blue-500 text-white font-mono py-2 px-1 shadow rounded-xl right-0"
                        key={index}
                      >
                        {msg.MessageText}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex  items-center justify-center bg-gray">
                <Input
                  className="bg-transparent ring-0"
                  placeholder="write your message"
                  value={
                    props.selectedStudent.Status === "submitted"
                      ? ""
                      : inputValue
                  }
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={
                    props.selectedStudent.Status === "submitted" ? true : false
                  }
                />
                <IoIosSend
                  onClick={sendMessage}
                  className="text-2xl cursor-pointer mr-1"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatComponent;
