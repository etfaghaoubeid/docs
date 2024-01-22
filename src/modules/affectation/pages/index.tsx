import React from "react";
import { Header } from "../../../components/header";
import filter from "../../../assets/images/filtre.png";

import aramex from "../../../assets/images/aramex.png";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../components/modal";
export const Affectation = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="p-5">
        <div className="flex justify-between items-center my-2">
          <div>
            <span>Affectation colis</span>
          </div>
          <img className="w-5" src={filter} />
        </div>
        <div className="">
          <input
            onClick={() => {
              console.log("clicked");
              setIsOpen(true);

              //   navigate("/emplacement");
            }}
            className="border-black border-2 w-full p-2  bg-white  rounded-md  "
            placeholder="Scanner un Colis ..."
          />
        </div>
        <div className="justify-center flex my-5">
          <h4 className="block text-sm text-emerald-300">0/25</h4>
        </div>
        {[1, 2, 3, 4].map((item) => {
          return (
            <div className=" mb-5 flex justify-between w-full shadow-sm p-5 shadow-gray-400 rounded-md ">
              <div>
                <input type="radio" checked={false} className="mr-4" />
                <span>Colis : 120000293</span>
              </div>
              <button className="bg-green-400 px-3 rounded-md text-white">
                status
              </button>
            </div>
          );
        })}
      </div>
      <Modal isOpen={isOpen}>
        <div className="bg-gray-50 p-6 rounded-2xl">
          <div className="flex flex-col justify-center">
            <h1>Affecter au transporteur</h1>
            <img className="w-40 " src={aramex} />
          </div>
          <input
            onClick={() => {
              console.log("clicked");
              setIsOpen(true);

              //   navigate("/emplacement");
            }}
            className="border-black border-2 w-full p-2  bg-white  rounded-md  "
            placeholder="Scanner palette ..."
          />
          <div className="flex justify-between items-center mt-4">
            <button
              className="px-10 bg-white rounded-md py-2 border-2  border-black"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              cancel
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                //   navigate("/rangementList");
              }}
              className="px-10  bg-emerald-300  rounded-md py-2 order-black text-white"
            >
              contunie
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
