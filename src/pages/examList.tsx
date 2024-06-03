// import { useState } from "react";
import { IoDocumentAttach } from "react-icons/io5";
import { FaEye, FaPlus } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStateTeacher from "../hooks/useAuth";
// import Loading from "../components/organisms/Loading";
import { Button } from "../components/ui/button";
import { FaDotCircle } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaShield } from "react-icons/fa6";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

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
  const navigate = useNavigate();
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
    return <div></div>;
  }
  if (examList.length > 0) {
    return (
      <div className="flex  justify-center md:h-auto bg-zinc-100 dark:bg-zinc-900 ">
        <div className="w-full max-w-4xl flex justify-center flex-col items-center  bg-white rounded-lg shadow-md dark:bg-zinc-800">
          <div className="bg-zinc-800 text-white  rounded-t-lg w-full p-6">
            <h1 className="text-center text-xl font-semibold">My Exams</h1>
          </div>
          {/* Header */}
          <Table className="text-ce">
            <TableCaption>A list of your exams.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center ">Exam Key</TableHead>
                <TableHead className="text-center ">Exam Name</TableHead>
                <TableHead className="text-center ">Status</TableHead>
                <TableHead className="text-center ">Access</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {examList.map((exam) =>
                exam.ExamKey.length === 7 ? (
                  <TableRow key={exam.ExamKey} className=" ">
                    <TableCell className="font-medium text-center">
                      {exam.ExamKey}
                    </TableCell>
                    <TableCell className="text-center">{exam.Title}</TableCell>
                    <TableCell className="text-center">
                      <FaShield className="text-xl m-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      {/* {exam.IsLocked === "0" ? "Open" : "Closed"} */}
                      <Select onValueChange={(val) => {}}>
                        <SelectTrigger className=" text-left w-[50%] m-auto">
                          <SelectValue
                            placeholder={
                              exam.IsLocked === "0" ? " Open" : "Closed"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Open">
                            <div className="flex gap-2 items-center  justify-start p-2 pl-0">
                              <FaDotCircle className="text-green-500 " />
                              Open
                            </div>
                          </SelectItem>
                          <SelectItem value="Closed">
                            <div className="flex gap-2 items-center  justify-start p-2 pl-0">
                              <FaDotCircle className="text-red-700" />
                              Closed
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-4">
                        <div className="p-2 border  rounded-xl cursor-pointer">
                          <FaPencilAlt className="text-xl" />
                        </div>

                        <div
                          className=" p-2 border  rounded-xl cursor-pointer"
                          onClick={() => {
                            navigate(`/dashboard/exams/${exam.ExamKey}`);
                          }}
                        >
                          <FaEye className="text-xl" />
                        </div>

                        <div className=" p-2 border  rounded-xl cursor-pointer">
                          <RiDeleteBin5Fill className="text-xl" />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : null
              )}
            </TableBody>
          </Table>

          <Button
            className="mt-10 mb-6 rounded-full"
            onClick={() => {
              navigate("/dashboard/NewExam");
            }}
          >
            {" "}
            Add new Exam{" "}
          </Button>
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
