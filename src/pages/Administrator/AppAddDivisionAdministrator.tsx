import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { useAddDivisionAdministratorActions } from "@/hooks/api/administrator.ts/useAddDivisionAdministratorActions";
import Swal from "sweetalert2";

export default function AppAddDivisionAdministrator() {
  const { createDivision, loading } = useAddDivisionAdministratorActions();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    silabus: "",
    max_participants: 0,
    amount_weeks: 8,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createDivision({
        name: formData.name,
        description: formData.description,
        silabus: formData.silabus,
        max_participants: formData.max_participants,
        amount_weeks: formData.amount_weeks,
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Divisi berhasil ditambahkan 🚀",
        confirmButtonColor: "#2563eb",
      });

      setFormData({
        name: "",
        description: "",
        silabus: "",
        max_participants: 0,
        amount_weeks: 8,
      });
    } catch (error: any) {
      if (error?.response?.status === 422) {
        Swal.fire({
          icon: "warning",
          title: "Nama sudah dipakai!",
          text: "Divisi dengan nama ini sudah ada. Silakan gunakan nama lain.",
          confirmButtonColor: "#f59e0b",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text:
            error?.response?.data?.message ||
            "Terjadi kesalahan saat menambahkan divisi.",
          confirmButtonColor: "#dc2626",
        });
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-row items-center gap-1">
          <Link to={`/administrator/division`} className="flex flex-row gap-2">
            Daftar Divisi
            <ChevronRight className="w-5 text-black" />
          </Link>
          <p className="text-blue-700">Tambah Divisi</p>
        </div>
        <div className="md:px-12 md:py-8 w-full flex flex-col bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
          <h2 className="text-xl font-bold my-4 text-center">Tambah Divisi</h2>
          <form className="mx-auto w-full" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nama Divisi
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Masukkan nama divisi"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Deskripsi
              </label>
              <textarea
                id="description"
                typeof="text"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Masukkan Deskripsi disini..."
                required
              ></textarea>
            </div>
            <div className="mb-5">
              <label
                htmlFor="link"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Link Silabus
              </label>
              <input
                type="url"
                id="silabus"
                value={formData.silabus}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Masukkan link silabus"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="participant"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Jumlah Maksimal Partisipan
              </label>
              <input
                type="number"
                id="max_participants"
                value={formData.max_participants}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Masukkan jumlah partisipan"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="week"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Jumlah Minggu
              </label>
              <input
                type="number"
                id="amount_weeks"
                value={formData.amount_weeks}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Masukkan jumlah minggu"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading ? "Menyimpan..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}