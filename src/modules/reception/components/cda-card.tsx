import fichier from "../../../assets/images/fichier.png";
import { useNavigate } from "react-router-dom";
import { CDA } from "../types/cda";
type CdaCardProps = {
  cda: CDA;
  ref: any;
};
export const CdaCard = ({ cda, ref }: CdaCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      // ref={ref}
      key={cda.numCda}
      onClick={() => navigate(`/reception-product-list/${cda.numCda}`)}
      className="flex justify-between items-start border-solid shadow  shadow-grey-100   px-2 py-4 mt-4 rounded-md  shadow:blur-sm"
    >
      <div className="flex flex-row  justify-center items-center ">
        <img className=" h-16" src={fichier} />
        <div>
          <span className="block text-xs ">CDA : {cda.numCda}</span>
          <span className="block text-xs font-normal   font-sans text-emerald-300">
            Origine :{cda.originalHub}
          </span>
          <span className="block  font-sans font-normal  text-xs">
            Vendeur : {cda.sellerName}
          </span>
          <span className="block font-normalfont-sans text-xs">
            Articles : {cda.countProducts}{" "}
          </span>
        </div>
      </div>
      <button className="bg-emerald-400 text-xs font-normal font-sans  rounded-sm p-1 text-white">
        {cda.statutName}
      </button>
    </div>
  );
};
