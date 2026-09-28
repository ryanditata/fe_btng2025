import api from "@/libs/api";

export const deleteAdminDivisionAdministratorService = async (id: string) => {
  try {
    const response = await api.delete(`/users/divisions/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error);
    throw error.response?.data || error;
  }
};
