import api from "@/libs/api";

export interface NewAdminDivisionData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  id_divisi_managed: string;
}

export const createAdminDivisionAdministratorService = {
  create: async (data: NewAdminDivisionData) => {
    try {
      const response = await api.post("/users/divisions", data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  getDivisions: async () => {
    try {
      const response = await api.get("/administrator/divisions");
      return response.data.data?.result || [];
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },
};
