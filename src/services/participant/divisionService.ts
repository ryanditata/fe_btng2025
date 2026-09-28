import api from "@/libs/api";
import { ApiResponse } from "@/types/api";
import { Division } from "@/types/division";


export const divisionService = {
    getAllDivision: () => api.get<ApiResponse<Division[]>>('/participant/divisions'),
    getDivisionById: (id: string) => api.get<ApiResponse<Division>>(`/participant/divisions/${id}`),
}