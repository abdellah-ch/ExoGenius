import { Outlet } from "react-router-dom";
import NavBar from "../molecules/NavBar";
import { Toaster } from "../ui/toaster";
import useAuthStateLanding from "../../hooks/useAuthLanding";
import Loading from "../organisms/Loading";

const LandingLayout = () => {
  const { isLoading } = useAuthStateLanding();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="bg-white overflow-hidden flex flex-col h-[100%] ">
      <NavBar />
      <main className="grow">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

export default LandingLayout;
