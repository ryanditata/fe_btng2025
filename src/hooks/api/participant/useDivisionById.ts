import useSWR from "swr";
import { divisionService } from "@/services/participant/divisionService";
import { Division } from "@/types/division";

export const useDivisionById = (id: string | null) => {
   const { data, error, isLoading } = useSWR<Division>(
    id ? ["division", id] : null, // ⬅ only fetch if id exists
    async () => {
      const res = await divisionService.getDivisionById(id as string);
      return res.data.data;
    },
    {
      revalidateOnFocus: false,
    }
  );

  return {
    division: data ?? null,
    loading: isLoading,
    error,
  };
};
