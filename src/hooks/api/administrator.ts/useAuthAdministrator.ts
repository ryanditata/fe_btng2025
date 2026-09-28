// hooks/api/useAuth.ts
import { userAdministratorService } from "@/services/administrator/userAdministratorService";
import { User } from "@/types/user";
import useSWR from "swr";

export const useAuthAdministrator = () => {
  const { data, isLoading, mutate } = useSWR<User>(
    "auth-user-administrator",
    async () => {
      const res = await userAdministratorService.getUserAdministrator();
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
    isAuthenticated: !!data && data?.role === "administrator",
    mutateUser: mutate,
  };
};
