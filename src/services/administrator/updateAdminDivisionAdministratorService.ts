import api from "@/libs/api";

interface UpdateAdminPayload {
  name: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  id_divisi_managed: string | null;
}

export const updateAdminDivisionAdministratorService = {
  update: async (
    id: string,
    payload: UpdateAdminPayload,
    oldEmail?: string
  ) => {
    try {
      const body: any = { ...payload };

      if (oldEmail && payload.email === oldEmail) {
        delete body.email;
      }

      if (!body.password) {
        delete body.password;
        delete body.password_confirmation;
      }

      const response = await api.put(`/users/divisions/${id}`, body);
      return response.data;
    } catch (error: any) {
      const apiError = error.response?.data || error;
      console.error("API Error (update):", apiError);

      if (
        apiError?.message?.includes("Email sudah terdaftar") &&
        oldEmail &&
        payload.email === oldEmail
      ) {
        apiError.message =
          "Email tidak berubah, tidak bisa menggunakan email yang sama.";
      }

      throw apiError;
    }
  },
};