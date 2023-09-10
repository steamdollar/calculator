import axios from "axios";

export const axiosConfig = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_SERVER,
        timeout: 10000,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
});
