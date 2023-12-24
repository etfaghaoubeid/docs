import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../../components/header";
import filter from "../../../assets/images/filtre.png";
import fichier from "../../../assets/images/fichier.png";
export const Rangement = () => {
  const navigator = useNavigate;
  return (
    <>
      <Header />
      <div className="p-5">
        <div className="flex justify-between items-center my-2">
          <div>
            <span>Rangement CDA</span>
          </div>
          <img className="w-5" src={filter} />
        </div>
        <div className="">
          <input
            onClick={() => navigator("/")}
            className="w-full p-2  bg-white border-red-50 rounded-md border-x-slate-400"
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
                  <img className="h-20" src={fichier} />
                  <div>
                    <span className="block text-sm">CDA : 1700083030</span>
                    <span className="block text-sm text-emerald-300">
                      Origine : Hub Casa - Californie
                    </span>
                    <span className="block text-sm">Vendeur : Kimoshop</span>
                    <span className="block text-sm">Articles : 56 </span>
                  </div>
                </div>
                <button className="bg-emerald-300 rounded-sm px-2 text-white">
                  Reçu Dropoff
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
