//import { Suspense} from "react"
//import LoadingSpinner from "../atoms/LoadingSpiner";
import { Outlet } from "react-router-dom";
const ExamLayout = () => {

    return (
        <main className="h-screen">
            <Outlet />
        </main>
    )
}
export default ExamLayout;
