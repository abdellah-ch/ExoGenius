import { IoChevronBack } from "react-icons/io5";
import { FaPen, FaSignOutAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import { useLocation } from "react-router-dom";

const Taking = (props: any) => {
  const { pathname } = useLocation();

  const SubmiteExamforStudent = async () => {
    const info = {
      ExamKey: pathname.split("/")[3],
      StudentId: props.selectedStudent.StudentId,
    };
    const res = await fetch(
      "https://exob.onrender.com/SubmitStudentExamByTeacher",
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(info),
      }
    );
  };

  return (
    <div className="bg-white w-full p-6 rounded-lg flex flex-col gap-7">
      <div className="flex justify-between">
        <p className="flex  items-center hover:underline cursor-pointer text-blue-500">
          <IoChevronBack className="mt-1" />
          Back to overview
        </p>
      </div>
      <div className="flex w-full justify-end">
        <div className=" w-[80%] px-4 py-2  text-white flex justify-center bg-green-700 gap-3 items-center rounded-lg">
          <FaPen className="text-white" />
          The student is writing and has connection to the exam
        </div>
      </div>
      <div>
        <p className="font-bold text-xl">{props.selectedStudent.FullName}</p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Button
            onClick={SubmiteExamforStudent}
            className="w-[300px] rounded-full px-8 flex justify-center  items-center gap-4"
          >
            <FaSignOutAlt className="text-lg" />
            End the Exam for this student
          </Button>
        </div>
        <div className="flex justify-end">
          <Button className=" w-[300px] border-2 bg-white text-black hover:text-white rounded-full px-8 flex justify-center  items-center gap-4">
            <MdDelete className="text-lg" />
            Delete Student
          </Button>
        </div>
      </div>
      {/* Student Answear */}
    </div>
  );
};

export default Taking;
