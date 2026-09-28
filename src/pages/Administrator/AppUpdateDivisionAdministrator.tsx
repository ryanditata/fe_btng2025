import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router";
import { updateDivisionAdministratorService } from "@/services/administrator/updateDivisionAdministratorService";
import { getDivisionAdministratorService } from "@/services/administrator/getDivisionAdministratorService";
import Swal from "sweetalert2";

export default function AppUpdateDivisionAdministrator() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    silabus: "",
    max_participants: 0,
    amount_weeks: 8,
  });
  const [initialData, setInitialData] = useState<typeof formData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const data = await getDivisionAdministratorService.getById(id);
        const divisionData = {
          name: data.name,
          description: data.description,
          silabus: data.silabus,
          max_participants: data.max_participants,
          amount_weeks: data.amount_weeks,
        };
        setFormData(divisionData);
        setInitialData(divisionData);
      } catch (err) {
        console.error("Gagal fetch divisi:", err);
        Swal.fire({
          icon: "error",
          title: "Divisi tidak ditemukan",
          text: "Data divisi dengan ID ini tidak tersedia.",
          confirmButtonColor: "#dc2626",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const isSameData = () => {
    if (!initialData) return false;
    return (
      initialData.name === formData.name &&
      initialData.description === formData.description &&
      initialData.silabus === formData.silabus &&
      Number(initialData.max_participants) ===
        Number(formData.max_participants) &&
      Number(initialData.amount_weeks) === Number(formData.amount_weeks)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    // 🔹 Cek kalau data sama persis
    if (isSameData()) {
      Swal.fire({
        icon: "info",
        title: "Data Sama",
        text: "Data yang anda masukkan sama dengan data sebelumnya. Tidak ada perubahan untuk diupdate.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Konfirmasi Update",
      text: "Apakah Anda yakin ingin memperbarui data divisi ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Update",
      cancelButtonText: "Batal",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      await updateDivisionAdministratorService(id, {
        name: formData.name,
        description: formData.description,
        silabus: formData.silabus,
        max_participants: Number(formData.max_participants),
        amount_weeks: Number(formData.amount_weeks),
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Divisi berhasil diperbarui 🚀",
        confirmButtonColor: "#2563eb",
      });
      setInitialData(formData); 
    } catch (err: any) {
      console.error("Update gagal:", err);

      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text:
          err?.response?.data?.message ||
          "Terjadi kesalahan saat memperbarui divisi.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  if (loading) {
    return <p>Loading data divisi...</p>;
  }

  return (
    <>
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-row items-center gap-1">
          <Link to={`/administrator/division`} className="flex flex-row gap-2">
            Daftar Divisi
            <ChevronRight className="w-5 text-black" />
          </Link>
          <p className="text-blue-700">Update Divisi</p>
        </div>
        <div className="md:px-12 md:py-8 w-full flex flex-col bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
          <h2 className="text-xl font-bold my-4 text-center">Update Divisi</h2>
          <form onSubmit={handleSubmit} className="mx-auto w-full">
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                placeholder="Masukkan Deskripsi disini..."
                required
              />
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Masukkan link silabus"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="max_participants"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Jumlah Maksimal Partisipan
              </label>
              <input
                type="number"
                id="max_participants"
                value={formData.max_participants}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Masukkan jumlah minggu"
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
