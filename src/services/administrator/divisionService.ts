import api from "@/libs/api";
import { ApiResponse } from "@/types/api";
import { Division } from "@/types/division";


export const divisionService = {
    getAllDivisionWithClass: () => api.get<ApiResponse<Division[]>>('/administrator/divisions-classes'),
}