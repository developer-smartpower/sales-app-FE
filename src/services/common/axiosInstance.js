import axios from "axios";
import { BASE_URL } from "./env.js";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (req) => {
    const access_token = localStorage.getItem("access_token");

    // const apisToBeExcluded = ["/auth/login", "/auth/register"];

    // const excluded = apisToBeExcluded.includes(req.url);

    // if (!excluded && access_token) {
    //   req.headers["Authorization"] = `Bearer ${access_token}`;
    // }

    req.headers["Authorization"] = `Bearer ${access_token}`;

    console.log("Request :::::::::::::::::: req", req, req.url);
    return req;
  },
  (err) => {
    console.log("Request :::::::::::::::::: error", err);
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    console.log("Response :::::::::::::::::: res", res);
    return res;
  },
  (err) => {
    console.log("Response :::::::::::::::::: error", err);
    return Promise.reject(err);
  }
);

export default axiosInstance;
