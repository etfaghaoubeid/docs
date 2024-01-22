import { AxiosRequestConfig } from "axios";
import axiosInstance from "../lib/axios";
import React from "react";
type HttpVerbe = "post" | "get" | "put" | "delete";
type Signal = { signal?: AbortSignal };
type Option<T> = {
  url: string;
  body?: T;
  config?: AxiosRequestConfig & Signal;
  method: HttpVerbe;
};
export type HttpResponse<TData> = {
  data: TData;
};
export const api = <TData, T = void>(
  option: Option<T>
): Promise<HttpResponse<TData>> => {
  const { url, method, body, config } = option;
  try {
    switch (method) {
      case "put":
        return axiosInstance.put(`${url}`, body, config);
      case "post":
        return axiosInstance.post(`${url}`, body, config);
      case "get":
        return axiosInstance.get(`${url}`, config);
      default:
        return axiosInstance.get(`${url}`, config);
    }
  } catch (error) {
    // HANDLE Your error

    return error as Promise<HttpResponse<TData>>;
  }
};

export function useFetch<TData, TParams>(parmas: Option<TParams>) {
  const callBackRef = React.useRef<() => void>();
  const [response, setResponse] = React.useState<{
    data: null | TData;
    error: null | string;
    loading: boolean;
  }>({
    data: null,
    loading: true,
    error: null,
  });
  const controller = new AbortController();
  const { url, method, body, config } = parmas;
  const newConfig = {
    ...config,
    signal: controller.signal,
  };
  const callBack = React.useCallback(async () => {
    const res: HttpResponse<TData> = await api<TData>({
      url: url,
      method: method,
      body: body as any,
      config: newConfig,
    });
    setResponse({
      data: res.data,
      error: res.error,
      loading: false,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  callBackRef.current = callBack;
  React.useEffect(() => {
    callBack();
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callBackRef, callBack]);
  return response;
}
