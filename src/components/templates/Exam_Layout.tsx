//import { Suspense} from "react"
//import LoadingSpinner from "../atoms/LoadingSpiner";
import { Outlet } from "react-router-dom";
const ExamLayout = () => {
  return (
    <>
      <div className="flex justify-center lg:hidden">
        <h1 className="text-emerald-500 font-mono mt-5">
          please connect using your computer
        </h1>
      </div>
      <main className="h-screen hidden lg:block">
        <Outlet />
      </main>
    </>
  );
};
export default ExamLayout;
