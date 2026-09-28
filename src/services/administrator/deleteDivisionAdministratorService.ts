// src/services/administrator/deleteDivisionAdministratorService.ts
import api from "@/libs/api";

export async function deleteDivisionAdministratorService(id: string) {
  try {
    const response = await api.delete(`/administrator/divisions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting division:", error);
    throw error;
  }
}
