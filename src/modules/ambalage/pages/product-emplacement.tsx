import React from "react";
import { Header } from "../../../components/header";
import { useNavigate } from "react-router-dom";
import emb1 from "../../../assets/images/emb1.png";
import emb2 from "../../../assets/images/emb2.png";
import emb3 from "../../../assets/images/emb3.png";
import produit from "../../../assets/images/produit.jpg";
import { Modal } from "../../../components/modal";
export const ProductEmplacement = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="p-5">
        <div>
          <span className="block text-xl">
            Traitement Emplacement : A-001-001
          </span>
          <h2 className="block text-emerald-400">Commande : 00001230</h2>
        </div>
        <div className="my-5">
          <span className="block  text-md">1. Scanner un emballage</span>
          <input
            onClick={() => {
              console.log("clicked");
              navigate("/product-emplacement");
            }}
            className="border-black border-2  p-2 bg-white  rounded-md  w-72"
            placeholder="Scanner un emballage ..."
          />
        </div>
        <div className=" flex justify-start gap-2 mt-2">
          <div className="w-40 h-40 border-gray-300 border-2 p-5 rounded-md">
            <img src={emb1} />
          </div>
          <div className="w-40 h-40  border-gray-300 border-2 p-5 rounded-md">
            <img className=" " src={emb2} />
          </div>
          <div className=" w-40 h-40 border-gray-300 border-2 p-5 rounded-md">
            <img src={emb3} />
          </div>
        </div>
        <div className="my-5">
          <span className="block text-md">1. Scanner un emballage</span>
          <input
            onClick={() => {
              console.log("clicked");
              navigate("/product-emplacement");
            }}
            className="border-black border-2  p-2 bg-white  rounded-md  w-72"
            placeholder="Scanner un article"
          />
        </div>
        <div>
          {[1, 3].map((item) => {
            return (
              <div className="p-5 border-b-2 border-gray-300 flex justify-start gap-4 items-center ">
                <input type="radio" />
                <img className="w-20 h-20" src={produit} />
                <span className="block">
                  Pack Hyaluron Expert - Gel Nettoyant 200mL & Crème contour des
                  yeux à l'acide
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-5">
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className=" bg-emerald-400 rounded-2xl px-4 py-2 text-white"
          >
            {" "}
            0/2 Confirmer l'emballage{" "}
          </button>
        </div>
        <Modal isOpen={isOpen}>
          <div className="bg-gray-50 p-6 rounded-2xl">
            <div className="flex flex-col justify-center">
              <h1>
                Confirmer-vous l'emballage d'un seul article de la commande ?
              </h1>
              <img className="w-40 " src={emb1} />
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
    </div>
  );
};
