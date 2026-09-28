import api from "@/libs/api";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";

export const userDivisionService = {
    getUserDivision: async (): Promise<ApiResponse<User>> => {
        try {
            const { data, status } = await api.get<ApiResponse<User>>(`/division/me`);
            if (status !== 200) {
                throw new Error(data?.message || "Internal Server Error");
            }
            return data;
        } catch (err: any) {    
            if (err.response) {
                throw new Error(err.response.data?.message || "Internal Server Error");
            }
            throw err;
        }
    },
}