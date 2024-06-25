import { IoChevronBack } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import { FaPrint } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
const Submited = (props: any) => {
  const [subject, setSubject] = useState<string>("");
  const [answear, setAnswear] = useState<string>("");
  const answerRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => answerRef.current,
  });

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.text(subject, 10, 10);
    if (subject != "Programming") {
      doc.html(answear, {
        callback: function (doc) {
          doc.save("student_answer.pdf");
        },
        x: 10,
        y: 20,
      });
    } else {
      doc.text(answear, 10, 20);
      doc.save("student_answer.pdf");
    }
  };
  const fetchAnswear = async () => {
    const info = {
      ExamKey: props.selectedStudent.ExamKey,
      StudentId: props.selectedStudent.StudentId,
    };
    const res = await fetch("http://localhost/GetExamAnswear", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      body: JSON.stringify(info),
    });
    const data = await res.json();
    setSubject(data.Subject);
    setAnswear(data.Answer);
    console.log(data);
  };
  console.log(props);
  useEffect(() => {
    fetchAnswear();
  }, [props.selectedStudent.StudentId]);

  return (
    <div className="bg-white w-full p-6 rounded-lg flex flex-col gap-7">
      <div>
        <p className="flex  items-center hover:underline cursor-pointer text-blue-500">
          <IoChevronBack className="mt-1" />
          Back to overview
        </p>
      </div>
      <div>
        <p className="font-bold text-xl">{props.selectedStudent.FullName}</p>
      </div>
      <div>
        <div className="grid grid-cols-4 gap-4">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center justify-center space-x-2 border border-zinc-300 rounded-full px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 w-full"
          >
            <FaDownload />

            <span>Download</span>
            <span>▼</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center space-x-2 border border-zinc-300 rounded-full px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 w-full"
          >
            <FaPrint />

            <span>Print</span>
          </button>
          <button className="flex items-center justify-center space-x-2 border border-zinc-300 rounded-full px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 w-full">
            <FaMessage />

            <span>Send</span>
            <span>▼</span>
          </button>
        </div>
      </div>
      {/* Student Answear */}
      <div className="mt-5">
        <p className="font-semibold">Student answear</p>
      </div>
      <div ref={answerRef} className="min-h-[300px] mt-2">
        {subject === "Programming" ? (
          <pre style={{ whiteSpace: "pre-wrap" }}>{answear}</pre>
        ) : (
          <div className="p-4" dangerouslySetInnerHTML={{ __html: answear }}>
            {}
          </div>
        )}
      </div>
    </div>
  );
};

export default Submited;
