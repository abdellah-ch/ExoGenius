// import { useState } from "react";
import { IoDocumentAttach } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStateTeacher from "../hooks/useAuth";
// import Loading from "../components/organisms/Loading";

interface ExamType {
  ExamKey: string;
  Title: string;
  Subject: string;
  StartDate: null;
  Duration: string;
  State: string;
  IsLocked: string;
  CreatedBy: string;
}

function ExamList() {
  const [examList, setExamList] = useState<ExamType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log(examList);

  const { teacherId } = useAuthStateTeacher();
  useEffect(() => {
    if (teacherId) {
      fetch("http://localhost/ExamList", {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        body: JSON.stringify({ UserId: teacherId }),
      }).then((response) => {
        response.json().then((data) => {
          setExamList(data);
          setIsLoading(false);
        });
      });
    }
  }, [teacherId]);

  if (isLoading) {
    return <></>;
  }
  if (examList.length > 0) {
    return (
      <div className="flex  justify-center md:h-auto bg-zinc-100 dark:bg-zinc-900 ">
        <div className="w-full max-w-4xl  bg-white rounded-lg shadow-md dark:bg-zinc-800">
          <div className="bg-zinc-800 text-white  rounded-t-lg w-full p-6">
            <h1 className="text-center text-xl font-semibold">My Exams</h1>
          </div>
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2 mb-2 p-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <a className="text-blue-600 dark:text-blue-400">Exam name</a>
            </div>
            <div className="flex items-center space-x-4">
              <span>Exam key</span>

              <span>Status</span>
              <span>Access</span>
            </div>
          </div>
          {/* loop throught ExamList and display them */}
          {examList.map(
            (exam) =>
              exam.ExamKey.length === 7 && (
                <div
                  key={exam.ExamKey}
                  className="flex justify-between items-center border-b p-2 mb-2 space-x-2"
                >
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>{exam.Title}</span>
                  </div>
                  <div className="space-x-4">
                    <span>{exam.ExamKey}</span>
                    <span> true</span>
                    <span>{exam.IsLocked === "0" ? "Closed" : "Open"}</span>
                  </div>
                </div>
              )
          )}
          {/* loop throught ExamList and display them*/}
        </div>
      </div>
    );
  }

  if (examList.length === 0) {
    return (
      <div className="flex  justify-center md:h-[55vh] bg-zinc-100 dark:bg-zinc-900 ">
        <div className="w-full max-w-4xl  bg-white rounded-lg shadow-md dark:bg-zinc-800">
          <div className="bg-zinc-800 text-white  rounded-t-lg w-full p-6">
            <h1 className="text-center text-xl font-semibold">My Exams</h1>
          </div>
          <div className="flex flex-col items-center justify-center p-20 noExam">
            <IoDocumentAttach className="text-4xl" />

            <h2 className="text-zinc-600 dark:text-zinc-300 text-lg font-medium">
              No exams yet
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-center mt-2 mb-6">
              You have not created any exams yet. Once you do,
              <br />
              they will be listed here.
            </p>
            <NavLink
              to="/dashboard/NewExam"
              className="bg-zinc-800 text-white px-4 py-2 rounded-full flex items-center hover:bg-yellow-300 duration-200 "
            >
              <FaPlus className="mr-2" />
              New exam
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default ExamList;
