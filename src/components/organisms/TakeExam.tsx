{/*make a request to get exam info (questions , type(math,programming) ,duration ,islocked,isstarted,isended)
                render the exam depending on the information 
*/}
import { FaClock, FaPenNib } from "react-icons/fa";
import { FaRocketchat } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";
import Split from 'react-split'
import ReactCodeMirror from '@uiw/react-codemirror';
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
const TakeExam = ({ studentId, studentName }: { studentId: string, studentName: string }) => {

    return (<div className='flex w-full h-full'>

        {/* SildeBar */}
        <div className='hidden sm:block text-white  xl:w-[15%] lg:w-[25%] md:w-[25%]  h-full bg-[#1d3461]'>
            <div className='flex flex-col items-center justify-center text-2xl font-bold bg-[#829cbc] text-black'>
                <p>{studentId}</p>
                <p>{studentName}</p>
            </div>
            <div className="w-full  p-2 mt-4 cursor-pointer bg-[#6290c8]">
                <p className="flex items-center  gap-2 text-xl"> <FaPenNib /> Show Exam</p>
            </div>
            <div className="w-full  p-2  cursor-pointer hover:bg-gray-400">
                <p className="flex items-center  gap-2 text-xl"> <FaRocketchat /> Chat</p>
            </div>
            <div className="w-full  p-2  cursor-pointer hover:bg-gray-400">
                <p className="flex items-center  gap-2 text-xl"> <FaRegCalendarCheck /> Submit Exam</p>
            </div>


            {/* Exam Time remaining */}
            <div className="xl:w-[15%] lg:w-[25%] md:w-[25%] p-4 absolute bottom-0  text-center ">
                <p className="flex justify-center items-center gap-2 text-xl"> <FaClock /> 00:00</p>
            </div>
        </div >
        <div className="w-[85%] sm:w-[95%] lg:w-[95%] xl:w-[95%] h-screen">
            <Split className="flex">
                <div className="cursor-pointer border-2 border-black  h-screen">
                    <iframe src="https://www.westernsydney.edu.au/__data/assets/pdf_file/0008/1082807/Types_of_exams.pdf" height="100%" width="100%" />
                </div>
                <div className="border-2 border-black bg-blue-500 h-[100vh] overflow-auto">
                    <ReactCodeMirror
                        className="h-full"
                        value={"//Code Here \n const"}
                        height="100%"
                        width="100%"
                        onChange={() => { }}
                        extensions={[loadLanguage('javascript')!]}
                    />
                </div>
            </Split>
        </div>


    </div >);
};

export default TakeExam;

