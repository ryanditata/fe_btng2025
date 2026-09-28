import { useState, useEffect } from "react";
import {
  createAdminDivisionAdministratorService,
  NewAdminDivisionData,
} from "@/services/administrator/createAdminDivisionAdministratorService";

export function useCreateAdminDivisionAdministratorActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [divisions, setDivisions] = useState<any[]>([]);
  const [loadingDivisions, setLoadingDivisions] = useState(false);

  const createAdmin = async (data: NewAdminDivisionData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await createAdminDivisionAdministratorService.create(data);

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Gagal membuat admin divisi baru.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDivisions = async () => {
    try {
      setLoadingDivisions(true);
      const result =
        await createAdminDivisionAdministratorService.getDivisions();
      setDivisions(Array.isArray(result) ? result : []); // pastikan array
    } catch (err: any) {
      console.error("Gagal load divisions:", err);
      setDivisions([]);
    } finally {
      setLoadingDivisions(false);
    }
  };

  useEffect(() => {
    fetchDivisions();
  }, []);

  return { createAdmin, loading, error, success, divisions, loadingDivisions };
}
