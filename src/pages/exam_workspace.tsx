import Loading from "../components/organisms/Loading.tsx";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ExamNotFound from "../components/organisms/ExamNotFound.tsx";
import ExamSpaceComponent from "../components/organisms/ExamSpaceComponent.tsx";

function ExamWorkspace() {
  const [IsLoading, SetIsLoading] = useState<boolean>(true);
  const [IsExamKeyCorrect, SetIsExamKeyCorrect] = useState<boolean>(false);
  const location = useLocation();
  const pathname = location.pathname;
  const ExamKey = pathname.split("/")[2];
  const [state, setState] = useState<string>("");
  console.log(state);

  //   console.log(ExamKey);

  useEffect(() => {
    const CheckExam = async () => {
      SetIsLoading(true);
      const res = await fetch("http://localhost/CheckExam", {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        body: JSON.stringify({ ExamKey: `${ExamKey}` }),
      });

      //   const data = await res.json();
      //   console.log(data);

      if (res.status != 200) {
        SetIsLoading(false);
        SetIsExamKeyCorrect(false);
      }
      if (res.status == 200) {
        SetIsExamKeyCorrect(true);
        const data = await res.json();
        console.log(data);

        setState(data.State);

        SetIsLoading(false);
      }
    };
    CheckExam();
  }, [location, ExamKey]);

  if (IsLoading) {
    return <Loading />;
  } else if (!IsLoading && !IsExamKeyCorrect) {
    return <ExamNotFound />;
  } else if (!IsLoading && IsExamKeyCorrect) {
    return <ExamSpaceComponent State={state} />;
  }
}

export default ExamWorkspace;

//Loading component DONE while fetching the exam if not found
//create Exam Not found component if the exam exists log in
//store the userId in a table called takingExam with the ExamKey
//Check if the user is already started taking this exam
//fetch the exam questions and resources and render the exam workspace depending on the result
//and then start taking the exam
