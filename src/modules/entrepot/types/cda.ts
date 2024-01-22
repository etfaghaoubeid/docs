export interface CDAResponse {
  success: boolean;
  message: string;
  data: Data;
}
export interface CDAListResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  numCda: string;
  originalHub: null;
  sellerName: string;
  statutId: number;
  statutName: string;
  countProducts: number;
  items: ProductType[];
}

export interface ProductType {
  id: number;
  img: string;
  ean: string;
  title: string;
  qte: number;
  qteLivreur: null;
  isTraiter: boolean;
}

export interface Pokedex {
  success: boolean;
  message: string;
  data: Data;
}

export interface CDAListResponseData {
  count_pages: number;
  page_number: number;
  page_size: null;
  statutId: null;
  date_start: null;
  date_end: null;
  data: CDA[];
}

export interface CDA {
  numCda: string;
  originalHub: string;
  sellerName: null | string;
  statutId: number;
  statutName: string;
  countProducts: number;
  createdOn: Date;
  items: ProductType[];
}
