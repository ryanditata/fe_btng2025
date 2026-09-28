// src/services/administrator/getDivisionAdministratorService.ts
import api from "@/libs/api";

export const getDivisionAdministratorService = {
  getAll: async () => {
    try {
      const response = await api.get("/administrator/divisions");
      return response.data.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },
    getById: async (id: string) => {
    const response = await api.get(`/administrator/divisions/${id}`);
    return response.data.data;
  }, catch (error: any) {
      throw error.response?.data || error;
  }
};
