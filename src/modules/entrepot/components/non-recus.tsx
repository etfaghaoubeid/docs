import React from "react";
import { ProductType } from "../types/cda";
import { Modal } from "../../../components/modal";
import { useNavigate } from "react-router-dom";
import { saveLitigeData } from "../api/cda";
type NonRecusPropsType = {
  product: ProductType;
  quantity: {
    qteNotReceived: null | number;
    qteDefautEmbalage: null | number;
    qteEndomage: null | number;
  };
  setQuantity: (e: InputEvent) => void;
};
export const NonRecus = ({
  product,
  setQuantity,
  quantity,
}: NonRecusPropsType) => {
  const navigate = useNavigate();
  const [errorMessage, seterrorMessage] = React.useState("");
  const handleSubmitData = async (e: FormEvent) => {
    e.preventDefault();
    console.log(
      "ddd",
      product.qte - product.qteLivreur !==
        quantity.qteDefautEmbalage +
          quantity.qteEndomage +
          quantity.qteNotReceived
    );
    if (
      product.qte - product.qteLivreur !==
      parseInt(quantity.qteDefautEmbalage) +
        parseInt(quantity.qteEndomage) +
        parseInt(quantity.qteNotReceived)
    ) {
      //seterrorMessage("Quantity incrorrect");
      // return;
    }
    try {
      const res = await saveLitigeData({
        lineId: product.id,
        qteNotReceived: parseInt(quantity.qteNotReceived),
        qteEndomage: parseInt(quantity.qteEndomage),
        qteDefautEmbalage: parseInt(quantity.qteDefautEmbalage),
        attachementsEndomageFiles: null,
        attachementsDefautEmbalageFiles: null,
      });
      navigate(-1);
      console.log("RSPONSEEEE", res);
    } catch (error) {
      seterrorMessage(error?.response?.data?.message);
      console.log("ERRRR front", error?.response.data.message);
    }
  };

  return (
    <div>
      <div className="mb-4  flex justify-start gap-4 mt-5">
        <img src={product?.img} className=" h-20 w-20" alt="produt" />
        <div>
          <h1>{product.title}</h1>
          <div>
            {" "}
            <input
              className="  w-1/3 bg-gray-50 rounded-md px-2 py-2  focus:border-gray-500  border-gray-50 border-2 focus:border-gray-2000   w-full  outline-gray-300"
              value={quantity.qteNotReceived as any}
              onChange={(e) =>
                setQuantity((prev) => ({
                  ...prev,
                  qteNotReceived: e.target.value as any,
                }))
              }
              placeholder="Nombre d'articles en litige ... "
              type="text"
            />
          </div>
        </div>
      </div>
      <button
        onClick={(e) => {
          handleSubmitData(e);
        }}
        className=" rounded-lg mt-4 bg-emerald-500 text-white px-4 py-2"
      >
        Confirmer les litiges
      </button>
      <Modal isOpen={errorMessage}>
        <div className="bg-white rounded-md">
          <div className="flex justify-end ">
            <button
              className="bg-slate-300 rounded-md p-2"
              onClick={() => seterrorMessage("")}
            >
              X
            </button>
          </div>
          <div className="flex justify-center items-center p-3">
            <span>{errorMessage} </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};
