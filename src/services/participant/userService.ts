import { ResponseLogin, User } from "@/types/user";
import api from "@/libs/api";
import { ApiResponse } from "@/types/api";


export const userService = {
    getUserWithClassDivisionAnnouncements: () => api.get<ApiResponse<User>>('/participant/user/pengumuman/class/division'),
    updateUser: async (data: FormData): Promise<ApiResponse<User>> => {
        try {
            const { data: responseData, status } = await api.post<ApiResponse<User>>(`/participant/user/update`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (status !== 200) {
                throw new Error(responseData?.message || "Internal Server Error");
            }

            return responseData;
        } catch (err: any) {
            if (err.response) {
                throw new Error(err.response.data?.message || "Internal Server Error");
            }
            throw err;
        }
    },

    registerClass: async (division_id: string, class_id: string): Promise<ApiResponse<User>> => {
        try {
            const { data: responseData, status } = await api.post<ApiResponse<User>>(`/participant/division/register`, {
                'division': division_id,
                'class': class_id
            });
            if (status !== 201) {
                throw new Error(responseData?.message || "Internal Server Error");
            }

            return responseData;
        } catch (err: any) {
            if (err.response) {
                throw new Error(err.response.data?.message || "Internal Server Error");
            }
            throw err;
        }
    }

}

export const authService = {
    login: async (email: string, password: string): Promise<ApiResponse<ResponseLogin>> => {
        try {
            const { data, status } = await api.post<ApiResponse<ResponseLogin>>(`/participant/login`, { email, password });

            if (status !== 200) {
                throw new Error(data?.message || "Internal Server Error");
            }

            return data;
        } catch (err: any) {
            if (err.response) {
                // Ambil pesan dari backend kalau ada
                throw new Error(err.response.data?.message || "Internal Server Error");
            }
            throw err;
        }
    },

    register: async (name: string, email: string, password: string): Promise<ApiResponse<User>> => {
        try {
            const { data, status } = await api.post<ApiResponse<User>>(`/participant/register`, { name, email, password });
            if (status !== 201) {
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

export const getUser = async (): Promise<ApiResponse<User>> => {
    const { data } = await api.get<ApiResponse<User>>(`/participant/user/login`);
    return data;
}