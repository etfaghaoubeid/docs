import { Link } from "react-router-dom";
import fichier from "../../../assets/images/filtre.png";
export const ProductDetails = () => {
  return (
    <Link
      to="/"
      className="flex justify-between items-start border-solid shadow-gray-500 shadow-sm px-2 py-2 mt-4 rounded-md"
    >
      <div className="flex flex-row  justify-center ">
        <img className="h-20" src={fichier} />
        <div>
          <span className="block text-sm">
            Soundpeats Air3 Deluxe HS NOIR Hi-Res Audio Codec LDAC, Gaming Mode
          </span>
          <span className="block text-sm text-emerald-300">
            Vendeur : Kimoshop
          </span>
          <span className="block text-sm">Quantité : 8 </span>
          <span className="block text-sm">Litiges : 3 </span>
        </div>
      </div>
      <button className="bg-emerald-300 rounded-sm px-2 text-white">
        Reçu Dropoff
      </button>
    </Link>
  );
};
