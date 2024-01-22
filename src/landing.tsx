import { Link } from "react-router-dom";
import logo from "./assets/svg/logo.svg";
import { Gard } from "./components/gard";
export const Landing = () => {
  return (
    <Gard>
      <div className="flex justify-center items-center  h-screen">
        <div className="drop-shadow-md bg-white p-6 rounded-md">
          <div className="flex justify-center items-center">
            <img src={logo} alt="logo" className="w-40 h-20" />
          </div>
          {[
            { name: "0 -Enterpo", path: "/entrepot" },
            { name: "1 - Reception Xdock EMM", path: "/reception" },
            { name: "2 - Rangement CDA", path: "/rangement" },
            { name: "3 - Emballage", path: "/emballage" },
            {
              name: "4 - Affectation colis Transporteur",
              path: "/affectation",
            },
          ].map((item) => {
            return (
              <div key={item.name} className="cursor-pointer py-1">
                <Link to={item.path} className="text-xl py-1">
                  {" "}
                  {item.name}
                </Link>
                <div className=" bg-slate-300 border-b-2  w-auto rounded-sm" />
              </div>
            );
          })}
        </div>
      </div>
    </Gard>
  );
};
