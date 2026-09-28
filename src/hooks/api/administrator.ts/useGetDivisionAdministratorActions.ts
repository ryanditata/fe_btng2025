// hooks/api/administrator.ts/useGetDivisionAdministratorActions.ts
import { useEffect, useState } from "react";
import api from "@/libs/api";

export function useGetDivisionAdministratorActions() {
  const [divisions, setDivisions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDivisions = async () => {
    try {
      setLoading(true);
      const response = await api.get("/administrator/divisions");
      setDivisions(response.data.data.result);
    } catch (err) {
      setError("Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDivisions();
  }, []);

  return { divisions, loading, error, fetchDivisions };
}
