import { useState, useEffect } from "react";

import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";

const useAuthStateTeacher = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teacherId, setTeacherId] = useState(undefined);
  const [data, setData] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      setIsLoading(false);
      navigate("/");
    } else {
      fetch("http://localhost/TestToken", {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        body: JSON.stringify({ jwt: `${token}` }),
      }).then((res) => {
        if (res.status == 200) {
          res.json().then((data) => {
            setTeacherId(data.data.id);
            setData(data.data);
          });

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
    data,
  };
};

export default useAuthStateTeacher;
