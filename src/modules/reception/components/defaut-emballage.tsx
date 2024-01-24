import React from "react";
import { ProductType } from "../types/cda";
import { Modal } from "../../../components/modal";
import { saveLitigeData } from "../api/cda";
import { useNavigate } from "react-router-dom";
type DefautEmballagePropsType = {
  product: ProductType;
  quantity: {
    qteNotReceived: null | number;
    qteDefautEmbalage: null | number;
    qteEndomage: null | number;
  };
  setQuantity: (q: number | string) => void;

  attachements: any;
  setAttachements: (e: any) => void;
  images: any;
  setImages: (e: any) => void;
};
export const DefautEmballage = ({
  product,
  quantity,
  setQuantity,
  attachements,
  setAttachements,
  images,
  setImages,
}: DefautEmballagePropsType) => {
  const [image, setImage] = React.useState([]);
  const navigate = useNavigate();
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
        attachementsEndomageFiles: attachements.attachementsEndomageFiles.length
          ? attachements.attachementsEndomageFiles
          : null,
        attachementsDefautEmbalageFiles: attachements
          .attachementsDefautEmbalageFiles.length
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
    setImages((prev) => ({
      ...prev,
      attachementsDefautEmbalageFiles: [
        ...prev.attachementsDefautEmbalageFiles,
        {
          fileName: e.target.files[0].name,
          img: URL.createObjectURL(e.target.files[0]),
        },
      ],
    }));
    setfile((prev) => [...prev, , URL.createObjectURL(e.target.files[0])]);
    setAttachements((prev) => {
      return {
        ...prev,
        attachementsDefautEmbalageFiles: [
          ...prev.attachementsDefautEmbalageFiles,
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
  const extractImageUrl = (key: number) => {
    if (attachements?.attachementsDefautEmbalageFiles) {
      const exist = attachements?.attachementsDefautEmbalageFiles[key];
      if (exist && images.attachementsDefautEmbalageFiles[key]) {
        return images.attachementsDefautEmbalageFiles[key]["img"];
      }
    }
  };

  const removeImage = (key) => {
    const existImage = images.attachementsDefautEmbalageFiles[key];
    const existAttachement = attachements.attachementsDefautEmbalageFiles[key];

    if (existImage && existAttachement) {
      const filtedAta = attachements.attachementsDefautEmbalageFiles.filter(
        (ite) => ite.fileName !== existAttachement.fileName
      );
      const filtredImages = images.attachementsEndomageFiles.filter(
        (ite) => ite.fileName !== existAttachement.fileName
      );
      console.log(
        "filtredImages",
        filtredImages,
        "filtedAta",
        filtedAta,
        "qunatity",
        quantity.qteEndomage
      );
      setImages((prev) => {
        return {
          ...prev,
          attachementsDefautEmbalageFiles: filtredImages,
        };
      });
      setAttachements((prev) => {
        return {
          ...prev,
          attachementsDefautEmbalageFiles: filtedAta,
        };
      });
    }

    setQuantity((prev) => ({
      ...prev,
      qteDefautEmbalage: quantity.qteDefautEmbalage - 1,
    }));
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
              className="  w-1/3 bg-gray-50 rounded-md px-2 py-2  focus:border-gray-500  border-gray-200 border-2 focus:border-gray-2000  outline-gray-300"
              value={quantity.qteDefautEmbalage}
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if (e.target.value === "" || re.test(e.target.value)) {
                  setQuantity((prev) => ({
                    ...prev,
                    qteDefautEmbalage: e.target.value as any,
                  }));
                }
              }}
              placeholder="Nombre d'articles en litige ... "
              type="text"
            />
          </div>
        </div>
      </div>

      {quantity.qteDefautEmbalage ? (
        <div className=" flex  justify-start gap-1 items-center">
          {Array(parseInt(quantity.qteDefautEmbalage))
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
                      <button
                        className=" bg-teal-500 rounded-md px-1 text-white"
                        onClick={() => removeImage(key)}
                      >
                        x
                      </button>
                      {attachements.attachementsDefautEmbalageFiles.length ? (
                        <img
                          src={`${extractImageUrl(key)}`}
                          className="h-20 w-20"
                          alt="dd"
                        />
                      ) : (
                        <div className="h-20 w-20"></div>
                      )}
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
