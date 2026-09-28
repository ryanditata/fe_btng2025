import { mutate } from "swr";
import { useState } from "react";
import { useNavigate } from "react-router";
import { authAdministratorService } from "@/services/administrator/authAdministratorService";

export const useUserAdministratorActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const clearAfterDelay = () => {
    setTimeout(() => setSuccess(false), 3000);
    setTimeout(() => setError(null), 3000);
  };

  const logOut = async () => {
    mutate("auth-user-administrator");
    localStorage.removeItem("token");
    navigate("/login/administrator");
  };

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }
    setLoading(true);
    try {
      const { data, success } = await authAdministratorService.login(
        email,
        password
      );
      if (success) {
        localStorage.setItem("token", data.token || "");
        mutate("auth-user-administrator", data.user);
        navigate("/administrator");
        console.log(data);
      }
    } catch (err: any) {
      setError(err.message || "Gagal masuk");
      clearAfterDelay();
    } finally {
      setLoading(false);
    }
  };

  return { logOut, login, loading, error, success };
};