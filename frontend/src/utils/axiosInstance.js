import axios from "axios";
import { BASE_URL } from "./apiPaths";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers:{
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem("expTracker");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    });

axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    window.location.href = "/login";
                    break;
                case 403:
                    toast.error("You don't have permission to perform this action");
                    break;
                case 404:
                    toast.error("Resource not found");
                    break;
                case 500:
                    toast.error("Internal server error. Please try again later");
                    break;
                default:
                    toast.error("An error occurred. Please try again");
            }
            if(error.code === "ECONNABORTED"){
                toast.error("Request timeout. Please try again.");
            }
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;