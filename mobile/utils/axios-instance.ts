import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://192.168.100.122:8000", // local home
  // baseURL: "http://10.133.128.237:8000", // local poco
  baseURL: "http://10.97.78.237:8000", // local poco
  timeout: 0,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { method, baseURL, url, params, data } = error.config || {};

    console.error({
      method: method?.toUpperCase(),
      url: `${baseURL || ""}${url || ""}`,
      status: error.response?.status,
      params,
      requestBody: data,
      response: error.response?.data,
    });

    return Promise.reject(error);
  },
);
export default axiosInstance;
