import useSWR from "swr";
import { Division } from "@/types/division";
import { dataDivisionService } from "@/services/division/dataDivision";

export const useDataDivisi = (id: string | null) => {
   const { data, error, isLoading } = useSWR<Division>(
    id ? ["division-classes", id] : null,
    async () => {
      const res = await dataDivisionService.getDivisionByIdWithClasses(id as string);
      return res.data.data;
    },
    {
      dedupingInterval: 60000,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    division: data ?? null,
    loading: isLoading,
    error,
  };
};
