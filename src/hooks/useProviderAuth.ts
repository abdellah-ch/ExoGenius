// import { useState } from "react";
import { useToast } from "../components/ui/use-toast";

import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";
const useProviderAuth = () => {
  //   const [token, setToken] = useState(null);
  //   const [errors, setErrors] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);

  //const token = Cookies.get("token");

  const { toast } = useToast();
  const url = "https://exob.onrender.com/Login";

  const navigate = useNavigate();
  const Login = (LoginData: { email: string; password: string }) => {
    fetch(url, {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      body: JSON.stringify({
        email: LoginData.email,
        password: LoginData.password,
      }),
    }).then((res) => {
      console.log(res);
      if (res.status != 200) {
        toast({
          title: "kadokh",
        });
      } else {
        res.json().then((data) => {
          toast({
            title: "all good",
          });
          Cookies.set("token", data.jwt);
          //   console.log(data.jwt);

          navigate("/dashboard/ExamList");
        });
      }
    });
  };

  const register = (RegisterData: {
    userName: string;
    email: string;
    password: string;
  }) => {
    fetch("https://exob.onrender.com/Register", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        userName: RegisterData.userName,
        email: RegisterData.email,
        password: RegisterData.password,
      }),
    }).then((res) => {
      if (res.status === 200) {
        toast({
          title: "account created",
        });
      }
    });
  };

  const logout = () => {
    Cookies.remove("token");
    navigate("/");
  };
  return {
    Login,
    register,
    logout,
  };
};

export default useProviderAuth;
