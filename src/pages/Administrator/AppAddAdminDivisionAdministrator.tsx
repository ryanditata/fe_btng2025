import { useState, useEffect } from "react";
import { Eye, EyeOff, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import { useCreateAdminDivisionAdministratorActions } from "@/hooks/api/administrator.ts/useCreateAdminDivisionAdministratorActions";

export default function AppAddAdminDivisionAdministrator() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    createAdmin,
    loading,
    error,
    success,
    divisions,
    loadingDivisions,
  } = useCreateAdminDivisionAdministratorActions();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    id_divisi_managed: "",
  });

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      alert("Konfirmasi password tidak cocok!");
      return;
    }
    await createAdmin(formData);
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/administrator/admin-division");
      }, 1500);
    }
  }, [success, navigate]);

  return (
    <>
      <PageMeta
        title="Daftar Divisi"
        description="Daftar seluruh Divisi yang ada di BTNG 2025"
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
          <p className="text-blue-700">Tambah Admin Divisi</p>
        </div>
        <div className="md:px-12 md:py-8 w-full flex flex-col bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
          <h2 className="text-xl font-bold my-4 text-center">
            Tambah Admin Divisi
          </h2>
          <form className="mx-auto w-full" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Masukkan username anda"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="emailanda@gmail.com"
                required
              />
            </div>
            <div className="mb-5 relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Masukkan password anda"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="mb-5 relative">
              <label
                htmlFor="password_confirmation"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Konfirmasi Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Konfirmasi password anda"
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPassword}
                className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="mb-5">
              <label
                htmlFor="id_divisi_managed"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Pilih Divisi
              </label>
              <select
                id="id_divisi_managed"
                value={formData.id_divisi_managed}
                onChange={handleChange}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">
                  {loadingDivisions
                    ? "Memuat daftar divisi..."
                    : "Pilih salah satu divisi"}
                </option>
                {divisions.map((division) => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))}
              </select>

              
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {success && (
              <p className="text-green-500 text-sm mb-4">
                Admin berhasil ditambahkan! Anda akan dialihkan...
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}