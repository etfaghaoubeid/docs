import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Header } from "../../../components/header";
import filter from "../../../assets/images/filtre.png";
import scanIcon from "../../../assets/images/scan.png";
import React from "react";
import { CDAListResponseData } from "../types/cda";
import { getAllCDA, getCdaById } from "../api/cda";
import { CdaCard } from "../components/cda-card";
import { useInfiniteQuery } from "@tanstack/react-query";
import Scanner from "./scanner";
import { Modal } from "../../../components/modal";
export const Reception = () => {
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
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["cdaList"],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await getAllCDA(pageParam);
        return res.data.data;
      },
      initialPageParam: 1,
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    });
  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  React.useEffect(() => {
    (async () => {
      if (result && !camera) {
        const res = await getCdaById(result);
        if (res.success) {
          navigate(`/reception-product-list/${result}`);
        } else {
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
      <div className="p-2">
        <div>
          {data?.pages?.map((item) => {
            console.log("ITEM ", item);
            return (
              <React.Fragment>
                {item.map((it) => {
                  return <CdaCard ref={ref} cda={it} key={it.id} />;
                })}
              </React.Fragment>
            );
          })}
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
    </div>
  );
};
