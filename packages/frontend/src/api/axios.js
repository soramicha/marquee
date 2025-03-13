import axios from "axios";
const BASE_URL = "marquee-backend2-e7bvfrbcbne9b0h5.westus3-01.azurewebsites.net"; //"http://localhost:8000";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default axiosInstance;
