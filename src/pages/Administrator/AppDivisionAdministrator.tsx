import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Eye,
  Edit,
  Trash2,
  Users,
} from "lucide-react";
import { Link } from "react-router";
import { useGetDivisionAdministratorActions } from "@/hooks/api/administrator.ts/useGetDivisionAdministratorActions";
import { deleteDivisionAdministratorService } from "@/services/administrator/deleteDivisionAdministratorService";
import Swal from "sweetalert2";

export default function AppDivisionAdministrator() {
  const { divisions, loading, error, fetchDivisions } =
    useGetDivisionAdministratorActions();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLimit, setSelectedLimit] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder] = useState<"asc" | "desc">("asc");

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const limits = [10, 25, 50, 75, 100, 150, 200];

  const handleSelect = (value: number) => {
    setSelectedLimit(value);
    setIsDropdownOpen(false);
  };

  const filteredDivisions = divisions
    .filter((divisi) =>
      divisi.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortOrder) return 0;
      if (sortOrder === "asc") {
        return (a.participant_count || 0) - (b.participant_count || 0);
      } else {
        return (b.participant_count || 0) - (a.participant_count || 0);
      }
    })
    .slice(0, selectedLimit);

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data divisi yang dihapus tidak bisa dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDivisionAdministratorService(id);
          fetchDivisions();

          Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: "Divisi berhasil dihapus 🚀",
            confirmButtonColor: "#2563eb",
          });

          console.log(id)
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text:
              error?.response?.data?.message ||
              "Terjadi kesalahan saat menghapus divisi.",
            confirmButtonColor: "#dc2626",
          });
        }
      }
    });
  };

  return (
    <>
      <head>
        <title>
          Daftar Divisi
        </title>
      </head>
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col lg:flex-row w-full lg:justify-between">
          <div className="flex mb-4 flex-col w-full lg:w-[50%] md:flex-row gap-4 items-center lg:mb-0">
            {/* Search */}
            <form className="w-full">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="dark:bg-dark-900 rounded-lg border border-gray-300 bg-transparent text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 block w-full p-4 ps-10 text-sm"
                  placeholder="Cari Divisi"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>

            {/* Sort By Jumlah Participant */}
            <div className="w-full lg:w-[50%] relative inline-block text-left">
              <button
                type="button"
                onClick={toggleDropdown}
                className="inline-flex p-2 items-center h-13 w-full justify-between lg:p-4 text-sm font-medium text-gray-700 
                border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 
                dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                Tampilkan {selectedLimit} Data
                {isDropdownOpen ? (
                  <ChevronUp className="w-4 h-4 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-2" />
                )}
              </button>

              {isDropdownOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white border 
                  border-gray-200 rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <ul className="py-1 text-sm text-gray-700 dark:text-white">
                    {limits.map((limit) => (
                      <li key={limit}>
                        <button
                          className={`block w-full text-left px-4 py-2 hover:bg-gray-100 
                          dark:hover:bg-gray-600 ${
                            selectedLimit === limit
                              ? "font-semibold bg-gray-100"
                              : ""
                          }`}
                          onClick={() => handleSelect(limit)}
                        >
                          {limit}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <Link
            to="/administrator/division/add-division"
            className="lg:w-fit flex p-3 gap-1 font-medium justify-center items-center rounded-lg text-white bg-blue-700 text-sm"
          >
            <Plus className="w-5 h-5" />
            <span>Tambah Divisi</span>
          </Link>
        </div>
        <div className="md:p-4">
          <h2 className="text-xl font-bold mb-4">Daftar Divisi</h2>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 md:p-5 md:text-left">
                  Nama Divisi
                </th>
                <th className="border border-gray-300 p-2 md:p-5 md:text-left hidden md:table-cell">
                  Jumlah Peserta
                </th>
                <th className="border border-gray-300 p-2 md:p-5 md:text-left hidden md:table-cell">
                  Kuota Peserta
                </th>
                <th className="border border-gray-300 p-2 md:p-5 text-center">
                  Detail Peserta
                </th>
                <th className="border border-gray-300 p-2 md:p-5 text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={5} className="text-center text-red-500 p-4">
                    {error}
                  </td>
                </tr>
              )}
              {!loading && !error && filteredDivisions.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 p-4">
                    Divisi tidak ditemukan.
                  </td>
                </tr>
              )}
              {!loading && !error && filteredDivisions.map((divisi) => (
                <tr key={divisi.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3 md:p-5 text-center md:text-left">
                    {divisi.name}
                    </td>
                    <td className="border border-gray-300 p-3 md:p-5 text-center md:text-left hidden md:table-cell">
                      {divisi.participant_count ?? "0"}
                    </td>
                    <td className="border border-gray-300 p-3 md:p-5 text-center md:text-left hidden md:table-cell">
                      {divisi.max_participants}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <Link
                        to={`/administrator/division/participant/${divisi.id}`}
                        state={{ namaDivisi: divisi.name }}
                        className="inline-flex items-center gap-1 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                      >
                        <Users className="w-4 h-4" />
                        Lihat Peserta
                      </Link>
                    </td>
                    <td className="border border-gray-300 p-5 text-center">
                      <Link
                        to={`/administrator/division/read-division/${divisi.id}`}
                        state={{ namaDivisi: divisi.name }}
                        className="inline-flex items-center justify-center p-1 text-blue-500 hover:text-blue-700"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link
                        to={`/administrator/division/update-division/${divisi.id}`}
                        className="inline-flex items-center justify-center p-1 text-yellow-500 hover:text-yellow-700"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(divisi.id)}
                        className="inline-flex items-center justify-center p-1 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
