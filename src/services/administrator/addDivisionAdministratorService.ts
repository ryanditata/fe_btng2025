// services/administrator/addDivisionAdministratorService.ts
import api from "@/libs/api";

export interface CreateDivisionPayload {
  name: string;
  description: string;
  silabus: string;
  max_participants: number;
  amount_weeks: number;
}

export const addDivisionAdministratorService = {
  createDivision: async (payload: CreateDivisionPayload) => {
    try {
      const response = await api.post("/administrator/divisions", {
        name: payload.name,
        description: payload.description,
        silabus: payload.silabus,
        max_participants: payload.max_participants,
        amount_weeks: payload.amount_weeks,
      });

      if (response.status !== 200 && response.status !== 201) {
      throw response;
    }

      return response.data;
    } catch (error: any) {
      console.error("Error adding division:", error.response?.data || error);
      throw error;
    }
  },
};
