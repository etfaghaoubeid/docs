import { PAGE_LIMIT } from "../../../constants/pagination";
import { api } from "../../../lib/api";
import { CDAListResponseData, CDAResponse, HttpRespones } from "../types/cda";
type BodyType = {
  page_number: number;
  page_size: number;
  statutId: null;
  date_start: null;
  date_end: null;
};
export async function getAllCDA(
  page: number,
  limit: number = PAGE_LIMIT
): Promise<HttpRespones<CDAListResponseData>> {
  const { data } = await api<HttpRespones<CDAListResponseData>, BodyType>({
    method: "post",
    url: "/cda/history/list",
    body: {
      page_number: page,
      page_size: limit,
      statutId: null,
      date_start: null,
      date_end: null,
    },
  });
  console.log("API", Object.keys(data), data.data.data);

  return data;
}
export async function getCdaById(cdaId: string) {
  try {
    if (cdaId) {
      const { data } = await api<CDAResponse>({
        method: "get",
        url: `/cda/livreur/${cdaId}`,
      });

      return data;
    }
  } catch (error) {
    console.log("ERRROR ", error);
    return error;
  }
}
type ToSaveLitigeDataType = {
  lineId: number;
  qteNotReceived: number | null;
  qteEndomage: number | null;
  attachementsEndomageFiles: [
    {
      fileName: string;
      fileByte: string;
    }
  ];
  qteDefautEmbalage: number | null;
  attachementsDefautEmbalageFiles: null;
};
//cda/livreur/litige/add
export async function saveLitigeData(
  tosaveData: ToSaveLitigeDataType
): Promise<HttpRespones<CDAListResponseData>> {
  const { data } = await api<
    HttpRespones<CDAListResponseData>,
    ToSaveLitigeDataType
  >({
    method: "post",
    url: "/cda/livreur/litige/add",
    body: {
      ...tosaveData,
    },
  });

  return data;
}
export type CheckPropductQuantityBody = {
  numCda: string;
  lineId: number;
  qte: number;
};
export async function checkPropductQuantity(
  tosaveData: CheckPropductQuantityBody
): Promise<HttpRespones<CDAListResponseData>> {
  const { data } = await api<
    HttpRespones<CDAListResponseData>,
    CheckPropductQuantityBody
  >({
    method: "post",
    url: "/cda/livreur/check/quantity",
    body: {
      ...tosaveData,
    },
  });

  return data;
}
export async function validateReception(tosaveData) {
  const { data } = await api<
    HttpRespones<CDAListResponseData>,
    CheckPropductQuantityBody
  >({
    method: "post",
    url: "/cda/livreur/check/quantity",
    body: {
      ...tosaveData,
    },
  });

  return data;
}
//cda/livreur/CDA5LX39O10117002448518/approve

export async function aproveCda(cdaId: string) {
  try {
    const res = await api<HttpRespones<CDAListResponseData>>({
      method: "get",
      url: `/cda/livreur/${cdaId}/approve`,
    });
    console.log("APROVE CDA", res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}
