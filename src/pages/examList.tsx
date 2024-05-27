// import { useState } from "react";
import { IoDocumentAttach } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

function ExamList() {
  return (
    <div className="flex items-center justify-center h-[100%] bg-zinc-100 dark:bg-zinc-900 ">
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
          <button className="bg-zinc-800 text-white px-4 py-2 rounded-full flex items-center hover:bg-yellow-300 duration-200 ">
            <FaPlus className="mr-2" />
            New exam
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamList;
