import image from "/banner.png";

const Banner = (props: {
  openModel: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModelRegister: boolean;
  setOpenModelRegister: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="relative">
      {/* background */}
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-tr from-[#007aff] to-[#007aff] rounded-bl-[100px] mb-[2rem]  "></div>

      <div className="max-w-[72rem] m-auto px-[1.5rem]">
        <div className="pt-[6rem] pb-[3rem] md:pt-[4rem] md:pb-[6rem]">
          <div className="relative text-center md:text-left max-w-[36rem] m-auto md:max-w-none">
            <div className="md:w-[600px] block">
              <h1 className="text-white mb-[1.5rem] text-4xl md:text-5xl leading-none tracking-tighter font-bold">
                Welcome to ExoGenius Your Platform for Math and Programming
                Exams
              </h1>

              {/* Buttons */}
              <div className="max-w-[20rem] m-auto mb-[3rem] text-center md:justify-start md:mb-0 md:max-w-none flex flex-col md:flex-row gap-2">
                <div>
                  <button
                    className=" w-[100%] text-white flex items-center justify-center gap-2 px-6 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20 bg-[#1E293B]/70"
                    onClick={() => props.setOpenModal(true)}
                  >
                    Log In
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="text-center">
                  <button
                    className="w-[100%] text-white flex items-center justify-center gap-2 px-6 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20 bg-[#0063cc]/70"
                    onClick={() => props.setOpenModelRegister(true)}
                  >
                    Get started
                  </button>
                </div>
              </div>
            </div>
            {/* Image */}
            <div className="md:max-w-none max-w-[24rem] m-auto  md:mt[-3rem] md:absolute md:top-0 md:left-[600px]  ">
              <div className="mr-[-6rem] relative md:mx-0     max-w-none min-w-none">
                <img
                  src={image}
                  width="600"
                  alt="banner"
                  className="  overflow-clip opacity-1 transform-none min-w-[400px] "
                />
              </div>
            </div>
            {/* Image */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
