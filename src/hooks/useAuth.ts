import { useState, useEffect } from "react";

import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";

const useAuthStateTeacher = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teacherId, setTeacherId] = useState(null);

  const [cookies, setCookie] = useCookies(["token"]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      setIsLoading(false);
      navigate("/");
    } else {
      fetch("http://localhost/TestToken", {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        body: JSON.stringify({ jwt: `${cookies.token}` }),
      }).then((res) => {
        if (res.status == 200) {
          setIsLoading(false);
        } else {
          navigate("/");
          setIsLoading(false);
        }
      });
    }
  }, []);

  return {
    isLoading,
    teacherId,
  };
};

export default useAuthStateTeacher;
