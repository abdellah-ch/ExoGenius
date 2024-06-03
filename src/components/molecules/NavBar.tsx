import { NavLink, useNavigate } from "react-router-dom";
import logo from "/logo.png";
import { useRef } from "react";
const NavBar = () => {
  const InputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  return (
    <div className="w-full z-30 bg-[#007aff] ">
      <div className="max-w-[72rem] px-[1.5rem] m-auto h-[5rem]">
        <div className="flex justify-between items-center h-full">
          <div className="shrink ">
            <NavLink to="/">
              <img src={logo} alt="" className="h-[3rem]" />
            </NavLink>
          </div>
          <div>
            <div className="relative flex h-8 w-full min-w-[100px] max-w-[200px]">
              <button
                className="!absolute right-1 top-[1.5px] z-10 select-none rounded-full bg-[#0063cc] py-1.5 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md  transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                type="button"
                data-ripple-light="true"
                onClick={() => {
                  navigate(`/exam/${InputRef.current?.value}`);
                }}
              >
                Next
              </button>
              <input
                ref={InputRef}
                type="text"
                className="placeholder:text-black h-full w-full rounded-full  bg-[#cce4ff] px-3 py-1.5 pr-20 font-sans text-sm font-normal text-blue-gray-700   transition-all focus:border-black focus:outline-none text-black"
                placeholder="Exam Key"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
