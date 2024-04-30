import { useState } from "react"

const TeachLogin = () => {
    const [state, setState] = useState<string>("login");
    const loginButtonClass = "w-[50%] border-r-2  flex justify-center items-center rounded-lg"
    const registerButtonClass = "w-[50%] flex justify-center items-center rounded-lg"
    return (
        <div className="h-screen flex  justify-center items-center bg-auth bg-cover ">
            <div className=" lg:h-[40%] w-[90%] md:w-[50%] lg:w-[35%] xl:w-[30%] h-[40%]  bg-white rounded-lg">
                <div className="flex h-[20%]  border-b-2  cursor-pointer " >
                    <div className={state === "login" ? loginButtonClass + " bg-[#FB8500] " : loginButtonClass} onClick={() => setState("login")}>
                        <p className="text-2xl font-bold " >Login</p>
                    </div>
                    <div className={state === "register" ? registerButtonClass + " bg-[#FB8500] z-20" : registerButtonClass} onClick={() => setState("register")}>
                        <p className="text-2xl font-bold">Register</p>
                    </div>
                </div>
                {/* conditional render login and register */}
                <div className="h-[80%] flex flex-col gap-4 items-center p-4 justify-between">
                    <div className="flex items-center h-[20%] w-[90%]">
                        <svg className="absolute ml-2" width="24" viewBox="0 0 24 24">
                            <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
                        </svg>
                        <input type="text" id="username" className="border-gray-600 border-[1px] rounded-xl h-full pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Email" />
                    </div>
                    <div className="flex  items-center h-[20%] w-[90%]">
                        <svg className="absolute ml-2" viewBox="0 0 24 24" width="24">
                            <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                        </svg>
                        <input type="password" id="password" className="border-gray-600 border-[1px] rounded-xl h-full  pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Password" />
                    </div>
                    <button type="submit" className="bg-[#FB8500] rounded-xl items-center  p-1 font-bold  uppercase w-[90%] h-[20%] text-xl">{state === "login" ? "login" : "create account"} </button>
                </div>
            </div>
        </div>
    )
}

export default TeachLogin

