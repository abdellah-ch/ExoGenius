import { useState, useEffect } from "react";

import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";

const useAuthStateLanding = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teacherId, setTeacherId] = useState(null);
  const [cookies, setCookie] = useCookies(["token"]);

  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.token) {
      fetch("http://localhost/TestToken", {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        body: JSON.stringify({ jwt: `${cookies.token}` }),
      }).then((res) => {
        if (res.status == 200) {
          navigate("/dashboard/ExamList");
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      });
      //   setIsLoading(false);
      //   navigate("/dashboard");
    } else {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    teacherId,
  };
};

export default useAuthStateLanding;
