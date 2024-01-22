import React from "react";
import { Header } from "../../../components/header";
import filter from "../../../assets/images/filtre.png";
import right from "../../../assets/images/right.png";
import phone from "../../../assets/images/phone.jpg";
import { Link, useNavigate } from "react-router-dom";
import { ProductDetails } from "../../reception/components/ProductDetails";
import { Product } from "../components/Product";
import { Modal } from "../../../components/modal";
export const RangementList = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <Header />

      <div className="p-5">
        <div className="flex justify-start gap-5">
          <img
            onClick={() => {
              navigate("/rangement");
            }}
            className="w-5 cursor-pointer"
            src={right}
          />
          <span>Rangement article CDA</span>
        </div>

        <div className="justify-center flex">
          <h4 className="block text-sm text-emerald-300">0/25</h4>
        </div>
        <div className="">
          <input
            onClick={() => {
              console.log("clicked");
              navigate("/rangement-produit");
            }}
            className="border-black border-2 w-full p-2  bg-white  rounded-md  "
            placeholder="scan"
          />
        </div>
      </div>

      <div className="p-5">
        <div>
          {[1, 3, 5, 6].map((item) => {
            return (
              <Link
                to="/"
                className="flex justify-between items-start border-solid shadow-gray-500 shadow-sm px-2 py-2 mt-4 rounded-md"
              >
                <div className="flex flex-row  justify-center ">
                  <img className="h-20" src={phone} />
                  <div>
                    <span className="block text-sm text-emerald-300">
                      Xiaomi Redmi A2 6.52" 32 Go Noir
                    </span>
                    <span className="block text-sm">CDA : 1700083030</span>
                    <span className="block text-sm">
                      Emplacement : A-01-001{" "}
                    </span>
                  </div>
                </div>
                <button className="bg-emerald-300 rounded-sm px-2 text-white">
                  Rangé
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
