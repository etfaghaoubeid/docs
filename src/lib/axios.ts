import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const SERVER_API_URL = "";
type Signal = {
  signal?: AbortSignal;
};
const axiosInstance = axios.create({
  baseURL: SERVER_API_URL,
});

const OnRequest = async (
  config: AxiosRequestConfig & Signal
): Promise<AxiosRequestConfig & Signal> => {
  return config;
};

const onFulfilled = async (response: AxiosResponse) => {
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    error: null,
  };
};
const onRejected = (error: AxiosError) => {
  // console.log(Object.keys(error.request));
  console.log("ONREJECT", {
    isAxiosError: error.isAxiosError,
    code: error.code,
    message: error.message,
    name: error.name,
    customError: error,
    request: error.request._url,
  });

  const configError = {
    data: null,
    status: error.response?.status,
    statusText: error.message,
    error: error.message,
    endPointUrl: error,
  };
  return Promise.reject(configError);
};
axiosInstance.interceptors.request.use(OnRequest);
axiosInstance.interceptors.response.use(onFulfilled, onRejected);
export default axiosInstance;
