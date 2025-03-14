import axios from "axios";
const BASE_URL = "marquee-gpg3e9h7cmgdephq.westus3-01.azurewebsites.net"; //"http://localhost:8000";// 

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
