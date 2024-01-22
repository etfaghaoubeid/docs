import React from "react";
import { Header } from "../../../components/header";
import { useNavigate } from "react-router-dom";

export const Chariot = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="p-5 flex justify-between w-full">
        <h1 className=" text-2xl"> Traitement Chariot A</h1>
        <div>
          <input
            onClick={() => {
              console.log("clicked");
              navigate("/product-emplacement");
            }}
            className="border-black border-2  p-2 bg-white  rounded-md  w-72"
            placeholder="Scanner un chariot ..."
          />
        </div>
      </div>
      <div className="p-5">
        <table className="table-auto w-full">
          <thead>
            <tr className="border-b-2 border-grey-200">
              <th>Emplacement</th>
              <th>Commande</th>
              <th>Articles</th>
              <th>Détails</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((item) => {
              return (
                <tr>
                  <td>The Sliding Mr. B s</td>
                  <td>Malcolm Lockyer</td>
                  <td>1961</td>
                  <td>1961</td>
                  <td>
                    <button className="bg-green-400 px-1 rouded-md text-white">
                      {" "}
                      stuatus
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
