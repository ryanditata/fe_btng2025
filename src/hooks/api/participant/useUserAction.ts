import { mutate } from "swr";
import { authService, userService } from "@/services/participant/userService";
import { useState } from "react";
import { useNavigate } from "react-router";

export const useUserActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const clearAfterDelay = () => {
    setTimeout(() => {
    setSuccess(false);
    setError(null);
  }, 3000);
  };

  const logOut = async () => {
  setLoading(true);
  try {
    mutate("auth-user", null, false);
    mutate("useData", null, false);
    localStorage.removeItem("token");
    navigate("/signin/participant", { replace: true });
  } finally {
    setLoading(false);
  }
};

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }
    setLoading(true);
    try {
      const { data, success } = await authService.login(email, password);
      if (success) {
        localStorage.setItem("token", data?.token || "");
        mutate("auth-user", data.user);
        mutate("useData");
        navigate("/participant");
      }
    } catch (err: any) {
      setError(err.message || "Gagal masuk");
      clearAfterDelay();
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      setError("Semua field harus diisi");
      return;
    }
    setLoading(true);
    try {
      const { success } = await authService.register(name, email, password);
      if (success) {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || "Gagal mendaftar");
    } finally {
      clearAfterDelay();
      setLoading(false);
    }
  };

  const updateProfile = async (data: FormData) => {
    setLoading(true);
    try {
      const { success } = await userService.updateUser(data);
      if (success) {
        setSuccess(true);
        mutate("auth-user");
      }
    } catch (err: any) {
      setError(err.message || "Gagal memperbarui profil");
    } finally {
      clearAfterDelay();
      setLoading(false);
    }
  };

  const registerClass = async (divison_id: string, class_id: string) => {
    setLoading(true);
    try {
      const { success } = await userService.registerClass(divison_id, class_id);
      if (success) {
        setSuccess(true);
        mutate("useData");
      }
    } catch (err: any) {
      setError(err.message || "Gagal memperbarui profil");
    } finally {
      clearAfterDelay();
      setLoading(false);
    }
  }

  return { logOut, login, register, registerClass, updateProfile, loading, error, success };
};
