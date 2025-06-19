import { useContext, useEffect } from "react"
import { UserContext } from "../Context/userContext.jsx"
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths.js";
import toast from "react-hot-toast";
import axiosIntance from "../utils/axiosInstance.js";

export const useUserAuth = ()=>{
    const { user, updateUser, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(user) return;

        let isMounted = true;
        const fetchUserInfo = async () =>{
            try{
                const response = await axiosIntance.get(API_PATHS.AUTH.GET_USER_INFO);

                if(isMounted && response.data){
                    updateUser(response.data);
                } 
            } catch (error) {
                toast.error("Failed to fetch user info");
                if(isMounted){
                    clearUser();
                    navigate("/login");
                }
            }
        }
        fetchUserInfo();

        return ()=>{
            isMounted = false;
        }
    },[updateUser, clearUser, navigate])
}