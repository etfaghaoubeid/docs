import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { BASE_URL } from "../config/env";

type Signal = {
  signal?: AbortSignal;
};
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const OnRequest = async (
  config: AxiosRequestConfig & Signal
): Promise<AxiosRequestConfig & Signal> => {
  const userData = JSON.parse(localStorage.getItem("userData") as string);
  if (userData) {
    const Authorization = "Authorization";
    config = {
      ...config,
      headers: {
        [Authorization]: "Bearer " + userData.jwtToken,
      },
    };
  }
  return config;
};

const onFulfilled = async (response: AxiosResponse) => {
  if (
    !response.data.success &&
    response.data.message === "Identifiant ou mot de passe incorrect"
  ) {
    localStorage.removeItem("userData");
  }
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    error: null,
  };
};
const onRejected = (
  error: AxiosError
): Promise<InternalAxiosRequestConfig<AxiosError>> => {
  // console.log(Object.keys(error.request));
  if (error.status === 401) {
    localStorage.removeItem("userData");
  }
  console.log("ERRRRR", error);
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
    ...error,
  };
  return Promise.reject(configError) as Promise<
    InternalAxiosRequestConfig<AxiosError>
  >;
};
axiosInstance.interceptors.request.use(OnRequest);
axiosInstance.interceptors.response.use(onFulfilled, onRejected);
export default axiosInstance;
