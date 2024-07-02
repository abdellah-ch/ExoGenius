import { useState, useEffect } from "react";

import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";

const useAuthStateLanding = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teacherId, setTeacherId] = useState(null);

  const token = Cookies.get("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetch("http://localhost/TestToken", {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        body: JSON.stringify({ jwt: `${token}` }),
      }).then((res) => {
        if (res.status == 200) {
          navigate("/dashboard/ExamList");
          setIsLoading(false);
        } else {
          navigate("/");
          setIsLoading(false);
        }
      });
      //   setIsLoading(false);
      //   navigate("/dashboard");
    } else {
      navigate("/");
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    teacherId,
  };
};

export default useAuthStateLanding;
