import { IoMenuSharp } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { AiTwotoneMessage } from "react-icons/ai";
const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-zinc-500 drop-shadow-1">
      <div className="flex flex-grow items-center justify-between px-4 py-2 shadow-2 md:px-6 2xl:px-11 md:justify-end">
        <button
          onClick={() => props.setSidebarOpen(!props.sidebarOpen)}
          className="lg:hidden rounded-sm border border-stroke block"
        >
          <IoMenuSharp className="text-3xl text-black" />
        </button>

        <div>
          <ul className="flex gap-2 items-center">
            <div className="rounded-full bg-gray cursor-pointer p-1">
              <IoIosNotifications className="text-black text-3xl" />
            </div>
            <div className="rounded-full bg-gray p-1 ">
              <AiTwotoneMessage className="text-black cursor-pointer text-3xl" />
            </div>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
