// hooks/api/administrator.ts/useAddDivisionAdministratorActions.ts
import { useState } from "react";
import { addDivisionAdministratorService } from "@/services/administrator/addDivisionAdministratorService";

export const useAddDivisionAdministratorActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const createDivision = async (formData: {
    name: string;
    description: string;
    silabus: string;
    max_participants: number;
    amount_weeks: number;
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await addDivisionAdministratorService.createDivision(formData);
      setSuccess(res.message || "Divisi berhasil ditambahkan");
      return res;
      
      console.log("Division created:", res.data); 
    } catch (err: any) {
      setError(err?.response?.data?.message || "Terjadi kesalahan");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createDivision, loading, error, success };
};
