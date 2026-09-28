import api from "@/libs/api";

interface GetAllParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const getAdminDivisionAdministratorService = {
  getAll: async ({
    page = 1,
    limit = 10,
    sortBy = "created_at",
    sortOrder = "desc",
  }: GetAllParams = {}) => {
    try {
      const queryString = `?page=${page}&per_page=${limit}&sort_by=${sortBy}&sort_order=${sortOrder}`;
      const response = await api.get(`/users/divisions${queryString}`);
      return response.data.data;
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error);
      throw error.response?.data || error;
    }
  },

  getDivisions: async () => {
    try {
      const response = await api.get("/administrator/divisions");
      return response.data.data.result;
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error);
      throw error.response?.data || error;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/users/divisions/${id}`);
      return response.data.data;
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error);
      throw error.response?.data || error;
    }
  },
};
