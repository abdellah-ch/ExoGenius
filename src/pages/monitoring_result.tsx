import { FaHome } from "react-icons/fa";
import { Input } from "../components/ui/Input";
import { useEffect, useState } from "react";

import { NavLink, useLocation } from "react-router-dom";
import Overview from "../components/organisms/Overview";
import Taking from "../components/organisms/Taking";
import Submited from "../components/organisms/Submited";

const Monitoring_result = () => {
  const { pathname } = useLocation();
  // console.log(pathname.split("/")[3]);
  const [TakingList, setTakingList] = useState<any>([]);
  const [submitedList, setSubmitedList] = useState<any>([]);
  const [componetState, setComponetState] = useState<string>("overview");
  const [selectedSubmitStudent, setSelectedSubmitStudent] = useState<any>();
  const [examInfo, setExamInfo] = useState<any>();
  const fetchExamInfo = async () => {
    const info = {
      ExamKey: pathname.split("/")[3],
    };
    const res = await fetch("http://localhost/CheckExam", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      body: JSON.stringify(info),
    });

    const data = await res.json();
    // console.log(data);
    setExamInfo(data);
  };
  const fetchTakingStudent = async () => {
    const info = {
      ExamKey: pathname.split("/")[3],
    };
    const res = await fetch("http://localhost/GetTakingStudentList", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      body: JSON.stringify(info),
    });

    const data = await res.json();
    // console.log(data);
    setTakingList(data);
  };
  const fetchSubmittedStudent = async () => {
    const info = {
      ExamKey: pathname.split("/")[3],
    };
    const res = await fetch("http://localhost/GetSubmittedStudentList", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      body: JSON.stringify(info),
    });

    const data = await res.json();
    // console.log(data);
    setSubmitedList(data);
  };

  const fetchInfo = () => {
    fetchTakingStudent();
    fetchSubmittedStudent();
  };

  useEffect(() => {
    fetchInfo();
    fetchExamInfo();
    const interval = setInterval(fetchInfo, 5000);

    return () => clearInterval(interval);
  }, [pathname]);

  return (
    <div className=" flex min-w-[90%] m-auto gap-5">
      <div className="w-[20%] flex flex-col gap-3">
        <div
          className="flex gap-2 justify-left items-center hover:bg-red-400 cursor-pointer "
          onClick={() => setComponetState("overview")}
        >
          <FaHome />
          <p>Overview</p>
        </div>

        <div>
          <Input type="text" placeholder="Search Name" />
        </div>

        <div>
          <p className="font-semibold">Taking the exam({TakingList.length})</p>
        </div>

        {/* loop on the taking exam students */}
        <div className="border-t-[1px]  border-b-[1px] border-gray-300 flex flex-col gap-2">
          {TakingList.map((item: any, index: any) => (
            <div
              className="cursor-pointer hover:bg-white rounded-lg"
              key={index}
              onClick={() => setComponetState("taking")}
            >
              <p>{item.FullName}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="font-semibold">Submited({submitedList.length})</p>
        </div>
        <div className="border-t-[1px]  border-b-[1px] border-gray-300 flex flex-col gap-2">
          {submitedList.map((item: any, index: any) => (
            <div
              className="cursor-pointer hover:bg-white rounded-lg"
              key={index}
              onClick={() => {
                setSelectedSubmitStudent(item);
                setComponetState("submited");
              }}
            >
              <p>{item.FullName}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[55%]">
        {componetState === "overview" ? (
          <Overview
            ExamInfo={examInfo}
            studentsCount={TakingList.length + submitedList.length}
            TakingCount={TakingList.length}
            SubmitCount={submitedList.length}
          />
        ) : componetState === "taking" ? (
          <Taking />
        ) : (
          <Submited selectedStudent={selectedSubmitStudent} />
        )}
        {/* state to hold the component to show then if else it Xd mad ? */}
      </div>
      <div className="w-[20%]">{/* Chat with student  */} Chat</div>
    </div>
  );
};

export default Monitoring_result;
