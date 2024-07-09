import { Button } from "../ui/button";
import { FaSignOutAlt } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";

const Overview = (props: {
  ExamInfo: any;
  studentsCount: number;
  TakingCount: number;
  SubmitCount: number;
}) => {
  //     {
  //     "ExamKey": "MPkIF1O",
  //     "Title": "lol",
  //     "Subject": "Programming",
  //     "StartDate": null,
  //     "Duration": "25",
  //     "State": "1",
  //     "IsLocked": "1",
  //     "CreatedBy": "393566"
  // }
  console.log(typeof props.ExamInfo.IsLocked);

  return (
    <div className="bg-white w-full p-6 rounded-lg flex flex-col gap-5">
      <div>
        <p className="font-bold text-xl">{props.ExamInfo?.Title}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-4 justify-center items-center">
          <p>Exam key</p>
          <div className="rounded-full font-semibold  border-2 px-4 py-1 hover:text-yellow-400 hover:border-yellow-400 cursor-pointer">
            {props.ExamInfo?.ExamKey}
          </div>
        </div>
        <div>
          <Button className="rounded-full px-8 flex justify-center  items-center gap-4">
            <FaSignOutAlt className="text-lg" />
            End the Exam for students
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-4 justify-center items-center ">
          <p className=" flex justify-center items-center gap-1">
            Access <FaRegQuestionCircle className="text-gray-400" />
          </p>
          <div className="rounded-full font-semibold  border-2 ml-[19px] px-4 py-1 hover:text-yellow-400 hover:border-yellow-400 cursor-pointer">
            {props.ExamInfo?.IsLocked === "0" ? "Open" : "Closed"}
          </div>
        </div>
        {/* <div>
          <Button className="rounded-full px-8 flex justify-center  items-center gap-4">
            <FaSignOutAlt className="text-lg" />
            End the Exam for students
          </Button>
        </div> */}
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Student status</h2>
        <div className="flex flex-row gap-4">
          <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg shadow-md  text-center mb-4 md:mb-0 w-[25%]">
            <p className="text-2xl font-semibold">
              {props.SubmitCount}/{props.studentsCount}
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm">
              Submitted
            </p>
            <div className="h-1 bg-green-500 dark:bg-green-400 mt-4"></div>
          </div>
          <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg shadow-md  text-center w-[25%]">
            <p className="text-2xl font-semibold">
              {props.TakingCount}/{props.studentsCount}
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm">
              Ongoing
            </p>
            <div className="h-1 bg-blue-500 dark:bg-blue-400 mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
