import React from "react";
import { Header } from "../../../components/header";
import filter from "../../../assets/images/filtre.png";
import { useNavigate } from "react-router-dom";
import { ProductDetails } from "../../reception/components/ProductDetails";
import { Product } from "../components/Product";
import { Modal } from "../../../components/modal";
export const Emplacement = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <Header />

      <div className="p-5">
        <div className="flex justify-between items-center my-2">
          <div>
            <span>Rangement CDA</span>
          </div>
          <img className="w-5" src={filter} />
        </div>
        <Product />

        <div className="">
          <input
            onClick={() => {
              console.log("clicked");
              setIsOpen(true);
              navigate("/emplacement");
            }}
            className="border-black border-2 w-full p-2  bg-white  rounded-md  "
            placeholder="Scan Emplacement"
          />
        </div>
        <Modal isOpen={isOpen}>
          <div className="bg-gray-50 p-6 rounded-2xl">
            <h2>
              Confirmer le rangement de l'article sur l'emplacement A-01-001 ?
            </h2>
            <div className="flex justify-between items-center mt-4">
              <button
                className="px-10 bg-white rounded-md py-2 border-2  border-black"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                cancel
              </button>
              <button className="px-10  bg-emerald-300  rounded-md py-2 order-black text-white">
                contunie
              </button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={isOpen}>
          <div className="bg-gray-50 p-6 rounded-2xl">
            <h2>Libérer le chariot pour l'emballage ?</h2>
            <div className="flex justify-between items-center mt-4">
              <button
                className="px-10 bg-white rounded-md py-2 border-2  border-black"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                cancel
              </button>
              <button className="px-10  bg-emerald-300  rounded-md py-2 order-black text-white">
                contunie
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
