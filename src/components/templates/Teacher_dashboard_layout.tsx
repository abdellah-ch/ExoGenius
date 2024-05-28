import { Outlet } from "react-router-dom";
import Sidebar from "../organisms/Menu";
import Header from "../molecules/Header";
import { useState } from "react";
import Loading from "../organisms/Loading";
import useAuthStateTeacher from "../../hooks/useAuth";

//
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const { isLoading, teacherId } = useAuthStateTeacher();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="bg-zinc-100">
          <div className="mx-auto w-[80vw] -2xl p-4  2xl:p-10 min-h-[90vh] h-[100%] bg-zinc-100">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
