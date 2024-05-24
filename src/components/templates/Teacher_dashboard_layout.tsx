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
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
