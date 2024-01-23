import React, { FormEvent } from "react";
import { ProductType } from "../types/cda";
import { saveLitigeData } from "../api/cda";
import { Modal } from "../../../components/modal";
import { useNavigate } from "react-router-dom";
type EndommagePropsType = {
  product: ProductType;
  quantity: {
    qteNotReceived: null | number;
    qteDefautEmbalage: null | number;
    qteEndomage: null | number;
  };
  litigeQuantity: number;
  setQuantity: (e: InputEvent) => void;
  attachementsEndomageFiles: any;
  setAttachements: (e: any) => void;
};
export const Endommage = ({
  product,
  quantity,
  setQuantity,
  attachements,
  setAttachements,
  litigeQuantity,
  attachementsEndomageFiles,
  setAttachementsEndomageFiles,
}: EndommagePropsType) => {
  const navigate = useNavigate();
  const [image, setImage] = React.useState([]);
  const [file, setfile] = React.useState([]);
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
        attachementsEndomageFiles: attachements.attachementsEndomageFiles
          ? attachements.attachementsEndomageFiles
          : null,
        attachementsDefautEmbalageFiles:
          attachements.attachementsDefautEmbalageFiles
            ? attachements.attachementsDefautEmbalageFiles
            : null,
      });
      navigate(-1);
      console.log("RSPONSEEEE", res);
    } catch (error) {
      seterrorMessage(error?.response?.data?.message);
      console.log("ERRRR front", error?.response.data.message);
    }
  };
  const handleImageUpload = async (e) => {
    let base64 = await convertBase64(e.target.files[0]);
    base64 = base64.split(",")[1];
    console.log("URL.createObjectURL(e.target.files[0]");
    setImage((p) => [...p, URL.createObjectURL(e.target.files[0])]);
    setfile((prev) => [...prev, , URL.createObjectURL(e.target.files[0])]);
    setAttachements((prev) => {
      console.log(
        "Prev",

        prev
        //prev["attachementsEndomageFiles"]
      );
      return {
        ...prev,
        attachementsEndomageFiles: [
          ...prev.attachementsEndomageFiles,
          { fileName: e.target.files[0].name, fileByte: base64 },
        ],
      };
    });

    // setfile(e.target.files[0]);
  };

  async function convertBase64(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  //  console.log("produt", attachements);
  return (
    <div>
      <div className="mb-4  flex justify-start gap-4 mt-5">
        <img src={product?.img} className=" h-20 w-20" alt="produt" />
        <div>
          <h1>{product.title}</h1>
          <div>
            {" "}
            <input
              className="  w-1/3 bg-gray-50 rounded-md px-2 py-2  focus:border-gray-500  border-gray-200 border-2 focus:border-gray-2000   outline-gray-300"
              value={quantity.qteEndomage}
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if (e.target.value === "" || re.test(e.target.value)) {
                  setQuantity((prev) => ({
                    ...prev,
                    qteEndomage: e.target.value as any,
                  }));
                }
              }}
              placeholder="Nombre d'articles en litige ... "
              type="text"
            />
          </div>
        </div>
      </div>
      {quantity.qteEndomage ? (
        <div className=" flex  justify-start gap-1 items-center">
          {Array(parseInt(quantity.qteEndomage))
            .fill("tes")
            .map((item, key) => {
              return (
                <div
                  key={key}
                  className="flex items-center justify-center  w-20 h-20"
                >
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {/* {image[key] ? (
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                      ) : (
                        <img className="h-8 w-8" src={image[key]} alt="dd" />
                      )} */}
                      <img className="h-20 w-20" src={image[key]} alt="dd" />
                    </div>

                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      // value={file}
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              );
            })}
        </div>
      ) : null}

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
