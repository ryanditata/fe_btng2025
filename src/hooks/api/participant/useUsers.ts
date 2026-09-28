// hooks/api/useUsers.ts
import useSWR, { mutate } from "swr";
import { userService } from "@/services/participant/userService";
import { User } from "@/types/user";

export const useUsers = () => {
  const { data, error, isLoading } = useSWR<User>(
    "useData",
    async () => {
      const res = await userService.getUserWithClassDivisionAnnouncements();
      return res.data.data;
    },
    {
      dedupingInterval: 60000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      shouldRetryOnError: false,
    }
  );

  return {
    userData: data ?? null,
    loading: isLoading,
    error,
    mutateUsers: () => mutate("useData"),
  };
};
