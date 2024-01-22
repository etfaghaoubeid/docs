import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../../components/header";
import filter from "../../../assets/images/filtre.png";
import fichier from "../../../assets/images/fichier.png";

export const Ambalage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />

      <div className="p-5">
        <div className="flex justify-between items-center my-2">
          <div>
            <span>Scanner un chariot</span>
          </div>
        </div>

        <div className="">
          <input
            onClick={() => {
              console.log("clicked");
              navigate("/chariott");
            }}
            className="border-black border-2 w-full p-2  bg-white  rounded-md  "
            placeholder="Scanner un chariot ..."
          />
        </div>
      </div>
    </div>
  );
};
