import useSWR, { mutate } from "swr";
import { divisionService } from "@/services/participant/divisionService";
import { Division } from "@/types/division";

export const useDivisions = () => {
  const { data, error, isLoading } = useSWR<Division[]>(
    "divisions",
    async () => {
      const res = await divisionService.getAllDivision();
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
    divisionData: data ?? null,
    loading: isLoading,
    error,
    mutateDivisions: () => mutate("divisions"),
  };
};
