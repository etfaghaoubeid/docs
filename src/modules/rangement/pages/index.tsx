import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/header";
import filter from "../../../assets/images/filtre.png";
import scanIcon from "../../../assets/images/scan.png";
import { getAllCDA, getCdaById } from "../api/cda";
import { CDAListResponseData } from "../types/cda";
import { useInView } from "react-intersection-observer";
import { Scanner } from "./scanner";

export const Rangement = () => {
  const [errorMessage, seterrorMessage] = React.useState("");

  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const [cda, setCda] = React.useState<CDAListResponseData>();
  const [camera, setCamera] = React.useState(false);
  const [result, setResult] = React.useState<string>("");
  const onDetected = (result: string) => {
    if (result) {
      setResult(result);
      setCamera(false);
    }
  };

  React.useEffect(() => {
    (async () => {
      if (result && !camera) {
        const res = await getCdaById(result);
        if (res.success) {
          navigate(`/reception-product-list/${result}`);
        } else {
          console.log(res, "RES CDA SACA");
          seterrorMessage(res.response.data.message);
        }
      }
    })();
  }, [result]);
  return (
    <div className="  bg-neutral-50">
      <Header />
      {camera && <Scanner onDetected={onDetected} />}
      <div className="p-2">
        <div className="flex justify-between items-center my-2">
          <div>
            <span>Réception CDA EMM </span>
          </div>
          <img className="w-5" src={filter} />
        </div>
        <div className=" bg-white flex justify-between items-center border-solid border-2 border-gray-300 w-full p-1 rounded-md ">
          <input
            value={result}
            onChange={(e) => setResult(e.target.value)}
            // onClick={() => setCamera(true)}
            // onClick={() => navigate("/reception-product-list")}
            className=" w-full p-2 rounded-md   
            outline-grey-50   outline-none "
            placeholder="Scanner une CDA ..."
          />
          <img
            className=" h-8 w-8"
            src={scanIcon}
            onClick={() => setCamera(true)}
          />
        </div>
      </div>
    </div>
  );
};
