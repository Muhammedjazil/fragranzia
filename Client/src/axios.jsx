import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:7000";

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});
