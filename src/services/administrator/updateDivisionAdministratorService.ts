// src/services/administrator/updateDivisionAdministratorService.ts
import api from "@/libs/api";

export async function updateDivisionAdministratorService(
  id: string,
  data: {
    name: string;
    description: string;
    silabus: string;
    max_participants: number;
    amount_weeks: number;
  }
) {
  try {
    const response = await api.patch(`/administrator/divisions/${id}`, data);
    
    if (response.status !== 200 && response.status !== 201) {
      throw response;
    }
    return response.data;
  } catch (error: any) {
    console.error("Error updating division:", error.response?.data || error);
    throw error;
  }
}
