import React from "react";
import { Header } from "../../../components/header";
import { Endommage } from "../components/endommage";
import { DefautEmballage } from "../components/defaut-emballage";
import { NonRecus } from "../components/non-recus";
import { useParams } from "react-router-dom";
import { queryClient } from "../../../lib/queryClient";
import { ProductType } from "../types/cda";
import { Gard } from "../../../components/gard";
enum Tab {
  ENDOMMAGE = "endommage",
  NON_RECU = "nonRecu",
  DEFAULT_EMBALAGE = "defaultEmballage",
}
const activeTabClass = " border-b-4   border-emerald-400 font-bold";
export const TraitementLitige = () => {
  const [attachements, setAttachements] = React.useState<{
    attachementsEndomageFiles: null | [];
    attachementsDefautEmbalageFiles: null | [];
  }>({
    attachementsEndomageFiles: [],
    attachementsDefautEmbalageFiles: [],
  });
  const { data } = queryClient.getQueryData(["cda"]);
  const [attachementsDefautEmbalageFiles, setAttachementsDefautEmbalageFiles] =
    React.useState([]);
  const [attachementsEndomageFiles, setAttachementsEndomageFiles] =
    React.useState([]);
  const [quantity, setQuantity] = React.useState({
    qteNotReceived: 0,
    qteDefautEmbalage: 0,
    qteEndomage: 0,
  });
  // const product = {};
  const [currentTab, setcurrentTab] = React.useState<Tab>(Tab.ENDOMMAGE);
  const { productId, toAddQuantity } = useParams();
  const product: ProductType = data.items.find((item) => item.id == productId);
  console.log("toAddQuantity", toAddQuantity);
  console.log(
    "ddd",

    product.qte - product.qteLivreur
  );
  console.log("Product", product);
  return (
    <Gard>
      <>
        <Header />

        <div className=" p-5">
          <div>
            <span className=" font-semibold text-sm">
              You need to declare{" "}
              <span>{product.qte - product.qteLivreur} </span>
              litige{" "}
            </span>
          </div>
          <div className="flex justify-between items-center w-full mb-4 py-4 ">
            <div
              className=" text-sm cursor-pointer"
              onClick={() => setcurrentTab(Tab.ENDOMMAGE)}
            >
              {" "}
              <span
                className={currentTab === Tab.ENDOMMAGE ? activeTabClass : ""}
              >
                {" "}
                Endommage{" "}
              </span>
            </div>
            <div
              className=" text-sm cursor-pointer"
              onClick={() => setcurrentTab(Tab.DEFAULT_EMBALAGE)}
            >
              {" "}
              <span
                className={
                  currentTab === Tab.DEFAULT_EMBALAGE ? activeTabClass : ""
                }
              >
                Default embalage{" "}
              </span>
            </div>
            <div
              className=" text-sm justify-center flex w-1/3 "
              onClick={() => setcurrentTab(Tab.NON_RECU)}
            >
              {" "}
              <span
                className={currentTab === Tab.NON_RECU ? activeTabClass : ""}
              >
                {" "}
                Non Reçu{" "}
              </span>
            </div>
          </div>
          <div>
            {currentTab === Tab.ENDOMMAGE ? (
              <Endommage
                product={product}
                setQuantity={setQuantity}
                quantity={quantity}
                litigeQuantity={toAddQuantity}
                attachementsEndomageFiles={attachementsEndomageFiles}
                setAttachementsEndomageFiles={setAttachementsEndomageFiles}
                attachements={attachements}
                setAttachements={setAttachements}
              />
            ) : currentTab === Tab.DEFAULT_EMBALAGE ? (
              <DefautEmballage
                product={product}
                setQuantity={setQuantity}
                quantity={quantity}
                litigeQuantity={toAddQuantity}
                attachementsDefautEmbalageFiles={
                  attachementsDefautEmbalageFiles
                }
                setAttachementsDefautEmbalageFiles={
                  setAttachementsDefautEmbalageFiles
                }
                attachements={attachements}
                setAttachements={setAttachements}
              />
            ) : (
              <NonRecus
                product={product}
                setQuantity={setQuantity}
                quantity={quantity}
                litigeQuantity={toAddQuantity}
              />
            )}
          </div>
        </div>
      </>
    </Gard>
  );
};
