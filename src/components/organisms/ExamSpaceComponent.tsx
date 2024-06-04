//check if user info are in the localStorage
//if not display a form
//if yes show the exam
import Loading from "./Loading.tsx";
import { useState, useEffect, useRef } from "react";
import TakeExam from "./TakeExam.tsx";
const ExamSpaceComponent = (props: {
  State: string;
  Subject: string;
  ExamKey: string;
}) => {
  const [IsLoading, SetIsLoading] = useState<boolean>(true);
  const [StudentId, SetStudentId] = useState<string | undefined>(undefined);
  const [StudentName, SetStudentName] = useState<string | undefined>(undefined);
  const [IsStudentExist, SetIsStudentExist] = useState<boolean>(false);

  const NameRef = useRef<HTMLInputElement>(null);
  const IdRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    SetIsLoading(true);
    const form = e.currentTarget;
    const name = form.elements.namedItem("name") as HTMLInputElement;
    const id = form.elements.namedItem("id") as HTMLInputElement;
    //check if the id and name are not empty
    if (name.value === "" || id.value === "") {
      return;
    }
    localStorage.setItem("StudentName", name.value);
    localStorage.setItem("StudentId", id.value);
    //push the name and id to the database
    const info = {
      Name: name.value,
      Id: id.value,
      ExamKey: props.ExamKey,
    };
    fetch("http://localhost/TakeExamStudent", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      body: JSON.stringify(info),
    }).then((response) => {
      console.log(response);

      SetIsLoading(false);
    });
  };

  useEffect(() => {
    const StudentId = localStorage.getItem("StudentId");
    const StudentName = localStorage.getItem("StudentName");
    if (StudentName && StudentId) {
      SetStudentName(StudentName);
      SetStudentId(StudentId);
      SetIsStudentExist(true);
    } else {
      SetIsStudentExist(false);
    }
    SetIsLoading(false);
  }, [StudentId, StudentName, IsLoading]);

  if (IsLoading) {
    return <Loading />;
  }
  if (!IsStudentExist && !IsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to the exam workspace
        </h1>
        <h2 className="text-xl text-gray-700 mb-8">
          Please enter your FullName and Studentid
        </h2>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <input
              ref={NameRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              placeholder="FullName"
            />
          </div>
          <div className="mb-6">
            <input
              ref={IdRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="id"
              placeholder="StudentId"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="w-[40%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100  h-[100vh]">
      <TakeExam
        studentId={StudentId!}
        studentName={StudentName!}
        State={props.State}
        Subject={props.Subject}
      />
    </div>
  );
};

export default ExamSpaceComponent;
