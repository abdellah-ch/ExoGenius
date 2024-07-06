import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const ExamNotFound = () => {
  const [ExamKey, SetExamKey] = useState<String>("");
  const handeleChange = (e) => {
    SetExamKey(e.target.value);
  };
  const navigate = useNavigate();
  const handeleSubmit = (e) => {
    e.preventDefault();
    navigate(`/Exam/${ExamKey}`);
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col w-[100%] md:w-[40%] h-[200px] gap-4">
        <form
          onSubmit={handeleSubmit}
          className="flex  justify-between m-4 md:m-0"
        >
          <input
            className="w-[65%] rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-                         sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all"
            placeholder="Exam Key"
            onChange={handeleChange}
          />
          <NavLink
            className="w-[30%] middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs
                font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all 
                hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none 
                active:opacity-[0.85] active:shadow-none disabled:pointer-events-none 
                disabled:opacity-50 disabled:shadow-none"
            to={`/Exam/${ExamKey}`}
          >
            Next
          </NavLink>
        </form>
        <p className="m-4 text-red-500 md:m-0">
          Exam was not found or the Exam is Closed please Contact the teacher{" "}
        </p>
      </div>
    </div>
  );
};

export default ExamNotFound;
