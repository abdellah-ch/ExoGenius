// import { useState } from "react";
import { useToast } from "../components/ui/use-toast";
import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";
const useProviderAuth = () => {
  //   const [token, setToken] = useState(null);
  //   const [errors, setErrors] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const { toast } = useToast();
  const url = "http://localhost/Login";

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
          setCookie("token", data.jwt);
          //   console.log(data.jwt);

          navigate("/dashboard/ExamList");
        });
      }
    });
  };

  const logout = () => {
    removeCookie("token");
    navigate("/");
  };
  return {
    Login,
    logout,
  };
};

export default useProviderAuth;
