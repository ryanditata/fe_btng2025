import useSWR from "swr";
import { dataDivisionService } from "@/services/division/dataDivision";
import { Class } from "@/types/class";

export const useClassById = (id: string | null) => {
   const { data, error, isLoading } = useSWR<Class>(
    id ? ["class-divisi", id] : null,
    async () => {
      const res = await dataDivisionService.getClassWithParticipants(id as string);
      return res.data.data;
    },
    {
      revalidateOnFocus: false,
    }
  );

  return {
    data: data ?? null,
    loading: isLoading,
    error,
  };
};
