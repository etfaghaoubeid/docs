import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/header";
import rightArrow from "../../../assets/images/right.png";
import React, { useState } from "react";
import { Product } from "../components/product";
import { aproveCda, checkPropductQuantity, getCdaById } from "../api/cda";
import { useQuery } from "@tanstack/react-query";
import Scanner from "./scanner";
import scanIcon from "../../../assets/images/scan.png";
import { Modal } from "../../../components/modal";
import { ProductType } from "../types/cda";
import { Gard } from "../../../components/gard";
export const EntrepotProductList = () => {
  const [product, setproduct] = React.useState<ProductType | null>(null);
  const [productQuantity, setproductQuantity] = React.useState(0);
  const { cdaId } = useParams();
  console.log(cdaId, "iii");
  const [isOpen, setIsOpen] = React.useState(false);
  const [errorMessage, seterrorMessage] = React.useState("");
  const [camera, setCamera] = React.useState(false);
  const [result, setResult] = React.useState<string>("");

  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["cda"],
    queryFn: () => getCdaById(cdaId as string),
  });

  React.useEffect(() => {
    (async () => {
      if (result && !camera) {
        const product = data?.data?.items?.find((p) => p.ean === result);
        if (product) {
          setproduct(product);
          setIsOpen(true);
          setproductQuantity(product.qteLivreur);
          console.log("Product Atihg", product);
          return;
        } else {
          seterrorMessage("product does not exist");
        }
      }
    })();
  }, [camera, result]);

  const handleProductQuantityCheck = async () => {
    try {
      console.log("CDID", cdaId);
      const res = await checkPropductQuantity({
        numCda: cdaId as string,
        lineId: product.id as number,
        qte: productQuantity,
      });
      if (res.success) {
        setIsOpen(false);
        navigate(-1);
        //navigate(`/traitement-litige/${product.id}`);
        return;
      }
    } catch (error) {
      console.log("errror", error.response.data?.message);
      setIsOpen(false);
      // seterrorMessage(error.response.data?.message);
      navigate(`/entrepot-traitement-litige/${product.id}/${productQuantity}`);
      //n
    }
  };
  const onDetected = (result: string) => {
    if (result) {
      setResult(result);
      setCamera(false);
    }
  };
  const calculateProductStatus = () => {
    if (data?.data?.items) {
      const r = data?.data?.items?.reduce((acc, prod) => {
        if (prod.isTraiter) {
          acc = acc + 1;
        }
        return acc;
      }, 0);
      return r;
    }
    return 0;
  };

  return (
    <Gard>
      <Header />

      {camera && <Scanner onDetected={onDetected} />}
      <div className="p-5">
        <div className="flex justify-between items-center my-2">
          <div className="flex justify-center gap-2 items-center mb-4">
            <img
              onClick={() => {
                navigate(-1);
              }}
              className=" h-5"
              src={rightArrow}
            />
            <span> Réception CDA</span>
          </div>
        </div>
        <div className=" bg-white flex justify-between items-center border-solid border-2 border-gray-300 w-full p-1 rounded-md ">
          <input
            value={result}
            className=" w-full p-2 rounded-md   
            outline-grey-50   outline-none "
            placeholder="Scanner un article en litige ..."
          />
          <img
            className=" h-8 w-8"
            src={scanIcon}
            onClick={() => setCamera(true)}
          />
        </div>
      </div>
      <div className="p-5">
        <div>
          {data?.data?.items?.map((product) => {
            return (
              <Product
                numbCda={result}
                sellerName={data.data.sellerName}
                key={product.id}
                product={product}
                status={data?.data?.statutName}
              />
            );
          })}
        </div>
      </div>
      <Modal isOpen={errorMessage}>
        <div className="bg-white rounded-md py-10 flex justify-center  items-center flex-col">
          <div className="flex justify-center items-center p-3">
            <span>{errorMessage} </span>
          </div>
          <div>
            <button
              className=" bg-emerald-400 rounded-md py-1 px-4 text-white"
              onClick={() => seterrorMessage("")}
            >
              Fermer
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isOpen}>
        <div className=" bg-slate-50 rounded-2xl  mx-3  py-10 px-5 shadow-md  w-11/12">
          <div className="mb-5">
            <span className="text-md font-semibold ">{product?.title}</span>
          </div>
          <div className=" flex justify-center items-center mb-5">
            <img className="  w-52 mb-2" src={product?.img} />
          </div>
          <div className="  flex justify-center  rounded-2xl">
            <div className=" w-fit flex justify-center gap-2  rounded-2xl bg-gray-200 py-1 mb-2">
              <button
                onClick={() => {
                  if (productQuantity > 0) {
                    setproductQuantity(productQuantity - 1);
                  }
                }}
                className="  text-xl px-2 bg-gray-200 rounded-2xl "
              >
                -
              </button>
              <button className=" rounded-md bg-white px-3  text-xl text-center">
                {productQuantity}{" "}
              </button>
              <button
                onClick={() => {
                  if (product?.qte > productQuantity) {
                    setproductQuantity(productQuantity + 1);
                  }
                }}
                disabled={product?.qte === productQuantity}
                className="  text-xl px-2 bg-gray-200 rounded-2xl "
              >
                +
              </button>
            </div>
          </div>
          <div className=" flex justify-between   items-center">
            <button
              className=" bg-white   border-2 rounded-2xl px-7 py-1.5  text-black"
              onClick={() => setIsOpen(false)}
            >
              Annuler{" "}
            </button>
            <button
              className="bg-teal-400  rounded-2xl text-white  px-7 py-1.5"
              onClick={handleProductQuantityCheck}
            >
              Confirmer
            </button>
          </div>
        </div>
      </Modal>

      <div className="  drop-shadow-4xl shadow  p-3   bg-white w-full fixed bottom-0 flex justify-center">
        <button
          className=" text-white bg-teal-400  rounded-3xl py-2.5 px-5"
          onClick={async () => {
            const res = await aproveCda(cdaId as string);
            console.log("DDDDDDD", res, "RESDDDDD");
            if (res.data.success) {
              navigate(`/entrepot`);
            } else {
              seterrorMessage(res?.data?.message);
            }
          }}
        >
          <span className=" mr-2">
            {calculateProductStatus()}/{data?.data?.items?.length}
          </span>
          Valider la réception CDA
        </button>
      </div>
    </Gard>
  );
};
