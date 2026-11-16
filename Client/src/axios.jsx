import axios from "axios";

const rawUrl =
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.VITE_API_URL ||
  "https://fragranzianew.vercel.app";

export const BASE_URL = rawUrl.replace(/\/+$/, "");

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});

export default axiosPrivate;
