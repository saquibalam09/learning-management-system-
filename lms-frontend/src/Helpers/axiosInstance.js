import axios from "axios";

// const BASE_URL = "http://localhost:5167/api/v1";
const BASE_URL = "https://backend-lms-flj5.onrender.com/api/v1";

// const api = axios.create({
//   baseURL: BASE_URL,
// });

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

// export const googleAuth = (code) =>
//   axiosInstance.get(`/user/google?code=${code}`);

export default axiosInstance;
