import { asxiosInstance } from "./axios";

export async function getStreamToekn(){
    const response = await axiosInstance.get("/chat/token");
    return response.data;
}