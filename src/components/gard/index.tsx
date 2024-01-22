import React from "react";
import { useNavigate } from "react-router-dom";

export const Gard = ({ children }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const loginUserData = JSON.parse(
      window.localStorage.getItem("userData") as string
    );
    if (!loginUserData) {
      navigate("/login");
    }
  }, [navigate]);
  return <>{children} </>;
};
