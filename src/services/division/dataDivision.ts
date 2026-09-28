import api from "@/libs/api";
import { ApiResponse } from "@/types/api";
import { Attendance } from "@/types/attendance";
import { Class } from "@/types/class";
import { Division } from "@/types/division";


export const dataDivisionService = {
    getDivisionByIdWithClasses: (id: string) => api.get<ApiResponse<Division>>(`/shared/divisions-with-classes/${id}`),
    getClassWithParticipants: (id: string) => api.get<ApiResponse<Class>>(`/shared/classes-with-participants/${id}`),
    getAttendance: (classId: string, weekNumber: number) => api.get<ApiResponse<Attendance>>(`/division/attendances?id_class=${classId}&week_number=${weekNumber}`),
    createOrUpdateAttendance: (data: Attendance) => api.post<ApiResponse<Attendance>>(`/division/attendances`, data),
}