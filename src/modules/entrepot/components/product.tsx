import { Link, useNavigate } from "react-router-dom";
import { ProductType } from "../types/cda";
import React from "react";
import { Modal } from "../../../components/modal";
import interdit from "../../../assets/images/interdit.png";
import { useClickOutside } from "../../../hooks/use-outside-click";
import { checkPropductQuantity, saveLitigeData } from "../api/cda";
type ProductProps = {
  product: ProductType;
  status: string;
  sellerName: string;
  numbCda: string;
};
export const Product = ({
  product,
  status,
  sellerName,
  numbCda,
}: ProductProps) => {
  const [camera, setCamera] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [errorMessage, seterrorMessage] = React.useState("");
  console.log("Product ", product);

  console.log(isOpen, "isopen");
  const [productQuantity, setproductQuantity] = React.useState(
    product.qteLivreur
  );
  const ref = React.useRef<HTMLElement>();
  //   useClickOutside(ref, () => setIsOpen(false));
  const navigate = useNavigate();
  const handleProductQuantityCheck = async (e) => {
    try {
      const res = await checkPropductQuantity({
        numCda: numbCda,
        lineId: product.id,
        qte: productQuantity,
      });
      if (res.success) {
        navigate(`/traitement-litige/${product.id}`);
        return;
      }
      navigate(`/traitement-litige/${product.id}/${productQuantity}`);
      console.log("apiCAll", res);
    } catch (error) {
      console.log("errror", error.response.data?.message);
      // setIsOpen(false);
      // seterrorMessage(error.response.data?.message);
      //for testing
      navigate(`/traitement-litige/${product.id}/${productQuantity}`);
    }
  };

  React.useEffect(() => {
    (async () => {
      if (result && !camera) {
        // const { response } = await getCdaById(result);
        // if (response.data.success) {
        //   navigate(`/reception-product-list/${result}`);
        // }
        // seterrorMessage(response.data.message);
      }
    })();
  }, [result]);
  return (
    <>
      <div
        onClick={() => {
          setIsOpen(true);
          if (product.isNeedLitige) {
            navigate(`/traitement-litige/${product.id}/${productQuantity}`);
          }
        }}
        className=" border-gray-900 border-solid bottom-3  shadow-slate-300 shadow-sm drop-shadow-xs flex justify-between items-start gap-1   px-2 py-2 mt-2 rounded-md"
      >
        <div className="flex gap-1 flex-row  justify-start  ">
          <div className="flex   justify-start items-center">
            <input
              type="radio"
              checked={product.isTraiter}
              className="w-4 h-4 border rounded bg-gray-50  border-teal-400"
            />
          </div>
          <img className="h-20" src={product.img} />
          <div className=" ">
            <span className="block  text-xs font-semibold">
              {product?.title}
            </span>
            <span className="block text-xs text-emerald-300">
              Vendeur : {sellerName}
            </span>
            <span className="block text-xs">
              Quantité :{" "}
              {!product.qteLivreur ? product.qte : product.qteLivreur}{" "}
            </span>
            {/* <span className="block text-sm">Litiges : 3 </span> */}
          </div>
        </div>
        <div className=" h-20 flex flex-col justify-between items-center ">
          <button className="bg-teal-400 text-sm rounded-md px-1 text-white">
            {product.isTraiter ? "Traité" : "En cours"}
          </button>
          {product.isNeedLitige ? (
            <div>
              <img className="h-7" src={interdit} alt="alt" />
            </div>
          ) : null}
        </div>
      </div>

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
          <div>
            <button>Anuller</button>
            <button>Anuller</button>
          </div>
        </div>
      </Modal>
    </>
  );
};
