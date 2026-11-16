import axios from "axios";

const rawUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:7000";
export const BASE_URL = rawUrl.replace(/\/+$/, "");

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});
