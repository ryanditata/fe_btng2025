import { useEffect, useState } from "react";
import { Eye, EyeOff, ChevronRight } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import { getAdminDivisionAdministratorService } from "@/services/administrator/getAdminDivisionAdministratorService";
import { updateAdminDivisionAdministratorService } from "@/services/administrator/updateAdminDivisionAdministratorService";
import Swal from "sweetalert2";

export default function AppUpdateAdminDivisionAdministrator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [divisions, setDivisions] = useState<{ id: string; name: string }[]>(
    []
  );
  const [originalEmail, setOriginalEmail] = useState("");
  const togglePassword = () => setShowPassword((prev) => !prev);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    division: "",
  });

  const fetchDivisions = async () => {
    try {
      const res = await getAdminDivisionAdministratorService.getDivisions();
      setDivisions(res || []);
    } catch (error) {
      console.error("Error fetch divisions:", error);
    }
  };

  const fetchAdmin = async () => {
    if (!id) return;
    try {
      const data = await getAdminDivisionAdministratorService.getById(id);
      setFormData({
        name: data.name || "",
        email: data.email || "",
        password: "",
        confirmPassword: "",
        division: data.id_divisi_managed || "",
      });
      setOriginalEmail(data.email || "");
    } catch (error) {
      console.error("Error fetch admin:", error);
    }
  };

  useEffect(() => {
    fetchDivisions();
    fetchAdmin();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleUpdate = async () => {
    if (!id) return;
    const payload: any = {
      name: formData.name,
      id_divisi_managed: formData.division || null,
    };

    if (formData.email && formData.email !== originalEmail) {
      payload.email = formData.email;
    }

    if (formData.password) {
      payload.password = formData.password;
      payload.password_confirmation = formData.confirmPassword;
    }

    try {
      await updateAdminDivisionAdministratorService.update(id, payload);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Admin Divisi berhasil diperbarui",
        confirmButtonColor: "#2563eb",
      });

      navigate("/administrator/admin-division");
    } catch (error: any) {
      let errorMsg =
        error?.message || "Terjadi kesalahan saat memperbarui admin divisi.";

      if (error?.message?.includes("Email sudah terdaftar")) {
        if (formData.email === originalEmail) {
          errorMsg =
            "Email tidak berubah, tidak bisa menggunakan email yang sama.";
        } else {
          errorMsg = "Email sudah digunakan oleh pengguna lain.";
        }
      }

      if (error?.errors) {
        const fieldErrors = Object.values(error.errors).flat().join("\n");
        errorMsg = fieldErrors;
      }

      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: errorMsg,
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <>
      <PageMeta
        title="Update Admin Divisi"
        description="Perbarui data Admin Divisi BTNG 2025"
      />
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-row items-center gap-1">
          <Link
            to={`/administrator/admin-division`}
            className="flex flex-row gap-2"
          >
            Daftar Admin Divisi
            <ChevronRight className="w-5 text-black" />
          </Link>
          <p className="text-blue-700">Update Admin Divisi</p>
        </div>

        <div className="md:px-12 md:py-8 w-full flex flex-col bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
          <h2 className="text-xl font-bold my-4 text-center">
            Update Admin Divisi
          </h2>
          <form className="mx-auto w-full" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              />
            </div>

            {/* Password */}
            <div className="mb-5 relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password baru (opsional)"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Konfirmasi Password */}
            <div className="mb-5 relative">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium"
              >
                Konfirmasi Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Ulangi password baru"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              />
            </div>

            {/* Pilih Divisi */}
            <div className="mb-5">
              <label
                htmlFor="division"
                className="block mb-2 text-sm font-medium"
              >
                Pilih Divisi
              </label>
              <select
                id="division"
                value={formData.division}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option value="">Pilih Divisi</option>
                {divisions.map((div) => (
                  <option key={div.id} value={div.id}>
                    {div.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full px-5 py-2.5"
            >
              Update
            </button>
          </form>

          {/* Dialog Konfirmasi */}
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-60 backdrop-blur">
              <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
                <h3 className="text-lg font-bold mb-2">Konfirmasi</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Apakah Anda yakin ingin memperbarui data ini?
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-gray-200 rounded-lg font-medium"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}