import { mutate } from "swr";
import { useState } from "react";
import { Class } from "@/types/class";
import { classesService } from "@/services/administrator/classesService";

export const useClassActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const clearAfterDelay = () => {
    setTimeout(() => setSuccess(false), 3000);
    setTimeout(() => setError(null), 3000);
  };

  const updateClass = async (id: string, data: Omit<Class, "id">) => {
    setLoading(true);
    try {
      const response = await classesService.updateClass(id, data);
      if (response.data.success) {
        mutate("classes-administrator");
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || "Gagal memperbarui kelas");
      clearAfterDelay();
    } finally {
      setLoading(false);
    }
  };

  const deleteClass = async (id: string) => {
    setLoading(true);
    try {
      const response = await classesService.deleteClass(id);   
        if (response.data.success) {
            mutate("classes-administrator");
            setSuccess(true);
        }
    } catch (err: any) {
        setError(err.message || "Gagal menghapus kelas");
        clearAfterDelay();
    } finally {
        setLoading(false);
    }
    };

  return {
    updateClass,
    deleteClass,
    loading, error, success };
};
