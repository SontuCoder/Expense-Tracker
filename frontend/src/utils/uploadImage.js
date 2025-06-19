import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageUrl)=>{
    const formData = new FormData();
    formData.append('image', imageUrl);
    try{
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers:{
                "Content-Type": 'multipart/form-data'
            }
        });
        return response.data;

    } catch (error) {
        throw error;
    }
};

export default uploadImage;