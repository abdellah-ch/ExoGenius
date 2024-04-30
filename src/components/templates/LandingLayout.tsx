import { Outlet } from "react-router-dom";
import NavBar from "../molecules/NavBar";


const LandingLayout = () => {
    return (
        <div className="bg-white overflow-hidden flex flex-col h-[100%] ">
            <NavBar />
            <main className="grow">
                <Outlet />
            </main>
        </div>
    )
}

export default LandingLayout