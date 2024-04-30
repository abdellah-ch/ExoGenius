import React from "react";
import logo from "/logo.svg";
const Loading = () =>{
  return (<div className="h-screen w-screen flex justify-center items-center bg-[#219EBC]">
            <img src={logo} alt="logo" width={250} className="animate-[spin_4s]"/> 
          </div>);
}

export default Loading;
