import api from "@/libs/api";
import { ApiResponse } from "@/types/api";
import { Class } from "@/types/class";



export const classesService = {
    getClassById: (id: string) => api.get<ApiResponse<Class>>(`/administrator/classes/${id}/participants`),
    updateClass: (id: string, data: Omit<Class, "id">) => api.put<ApiResponse<Class>>(`/administrator/classes/${id}`, data),
    deleteClass: (id: string) => api.delete<ApiResponse<null>>(`/administrator/classes/${id}`),
}