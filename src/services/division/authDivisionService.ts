import api from "@/libs/api";
import { ApiResponse } from "@/types/api";
import { ResponseLogin } from "@/types/user";

export const authDivisionService = {
    login: async (email: string, password: string): Promise<ApiResponse<ResponseLogin>> => {
        try {
            const { data, status } = await api.post<ApiResponse<ResponseLogin>>(`/division/login`, { email, password });

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