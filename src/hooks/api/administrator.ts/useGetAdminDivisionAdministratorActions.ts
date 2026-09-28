import { useEffect, useState, useCallback } from "react";
import { getAdminDivisionAdministratorService } from "@/services/administrator/getAdminDivisionAdministratorService";

export function useGetAdminDivisionAdministratorActions() {
  const [admin, setAdmin] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
  });

  const fetchAdmin = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAdminDivisionAdministratorService.getAll({
        page: queryParams.page,
        limit: queryParams.limit,
      });

      const divisiList =
        await getAdminDivisionAdministratorService.getDivisions();

      if (response && response.result) {
        const mappedAdmins = response.result.map((a: any) => {
          const divisi = divisiList.find(
            (d: any) => d.id === a.id_divisi_managed
          );
          return {
            ...a,
            division_name: divisi ? divisi.name : "Belum Ditugaskan",
          };
        });

        setAdmin(mappedAdmins);
        setPagination(response.Pagination);
      } else {
        setAdmin([]);
        setPagination(null);
      }
    } catch (err: any) {
      console.error("API Error:", err);
      setError("Gagal mengambil data.");
      setAdmin([]);
    } finally {
      setLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    fetchAdmin();
  }, [fetchAdmin]);

  const changePage = (newPage: number) => {
    setQueryParams((prev) => ({ ...prev, page: newPage }));
  };

  const changeLimit = (newLimit: number) => {
    setQueryParams({ page: 1, limit: newLimit });
  };

  return {
    admin,
    pagination,
    loading,
    error,
    fetchAdmin,
    changePage,
    changeLimit,
  };
}
