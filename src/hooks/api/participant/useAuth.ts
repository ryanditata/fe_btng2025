// hooks/api/useAuth.ts
import useSWR from "swr";
import { getUser } from "@/services/participant/userService";
import { User } from "@/types/user";

export const useAuth = () => {
  const { data, isLoading, mutate } = useSWR<User>(
    "auth-user",
    async () => {
      const res = await getUser();
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
    isAuthenticated: !!data && data.role === "peserta",
    mutateUser: mutate,
  };
};
