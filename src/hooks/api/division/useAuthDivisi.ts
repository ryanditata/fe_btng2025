// hooks/api/useAuth.ts
import { userDivisionService } from "@/services/division/userDivisionService";
import { User } from "@/types/user";
import useSWR from "swr";


export const useAuthDivision = () => {
  const { data, isLoading, mutate } = useSWR<User>(
    "auth-user-division",
    async () => {
      const res = await userDivisionService.getUserDivision();
      return res.data;
    },
    {
      dedupingInterval: 60000, 
      revalidateOnFocus: false, 
      shouldRetryOnError: false, 
      onError: (err) => {
        if (err?.response?.status === 401) {
          localStorage.removeItem("token");
        }
      },
    }
  );

  return {
    user: data ?? null,
    loading: isLoading,
    isAuthenticated: !!data && data?.role === "admin_divisi",
    mutateUser: mutate,
  };
};
