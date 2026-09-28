import { mutate } from "swr";
import { useState } from "react";
import { useNavigate } from "react-router";
import { authDivisionService } from "@/services/division/authDivisionService";

export const useUserDivisionActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const clearAfterDelay = () => {
    setTimeout(() => setSuccess(false), 3000);
    setTimeout(() => setError(null), 3000);
  };

  const logOut = async () => {
    mutate("auth-user-division");
    localStorage.removeItem("token");
    navigate("/login/divisi");
  };

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }
    setLoading(true);
    try {
      const { data, success } = await authDivisionService.login(email, password);
      if (success) {
        localStorage.setItem("token", data.authorization?.token || "");
        mutate("auth-user-division", data.user);
        navigate("/divisi");
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
