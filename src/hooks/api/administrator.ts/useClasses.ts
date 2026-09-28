import useSWR, { mutate } from "swr";
import { divisionService } from "@/services/administrator/divisionService";
import { Division } from "@/types/division";

export const useClasses = () => {
  const { data, error, isLoading } = useSWR<Division[]>(
    "classes-administrator",
    async () => {
      const res = await divisionService.getAllDivisionWithClass();
      return res.data.data;
    },
    {
      dedupingInterval: 60000,
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    data: data ?? null,
    loading: isLoading,
    error,
    mutateDivisions: () => mutate("classes-administrator"),
  };
};
