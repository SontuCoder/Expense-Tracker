export const BASE_URL = "http://localhost:8000/api/v1";

export const API_PATHS = {
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        GET_USER_INFO: "/auth/getUser"
    },
    DASHBOARD:{
        GET_DATA:"/dashboard"
    },
    EXPENSE: {
        ADD: "/expense/add",
        GET_ALL: "/expense/get",
        DELETE: (id)=>`/expense/delete/${id}`,
        DOWNLOAD_EXCEL:(month)=> `/expense/downloadexcle/${month}`
    },
    INCOME:{
        ADD: "/income/add",
        GET_ALL: "/income/get",
        DELETE: (id)=> `/income/delete/${id}`,
        DOWNLOAD_EXCEL:(month)=> `/income/downloadexcle/${month}`
    },
    IMAGE:{
        UPLOAD_IMAGE: "/auth/upload-image"
    }
}