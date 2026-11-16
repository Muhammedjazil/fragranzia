// import axios from "axios";

// const rawUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:7000";
// export const BASE_URL = rawUrl.replace(/\/+$/, "");

// export const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
// });
import axios from "axios";

const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default axiosPrivate;