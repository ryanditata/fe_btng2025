import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetAdminDivisionAdministratorActions } from "@/hooks/api/administrator.ts/useGetAdminDivisionAdministratorActions";
import { deleteAdminDivisionAdministratorService } from "@/services/administrator/deleteAdminDivisionAdministratorService";

interface Admin {
  id: string;
  name: string;
  email: string;
  id_divisi_managed: string | null;
  division_name?: string;
}

export default function AppAdminDivisionAdministrator() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    admin,
    pagination,
    loading,
    error,
    changePage,
    changeLimit,
    fetchAdmin,
  } = useGetAdminDivisionAdministratorActions();

  const totalPages = pagination ? pagination.last_page : 1;
  const currentPage = pagination ? pagination.current_page : 1;

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const limits = [10, 25, 50, 75, 100, 150, 200];

   const handleDelete = async (id: string) => {
     Swal.fire({
       title: "Apakah Anda yakin?",
       text: "Data admin divisi yang dihapus tidak bisa dikembalikan.",
       icon: "warning",
       showCancelButton: true,
       confirmButtonText: "Ya, Hapus",
       cancelButtonText: "Batal",
       confirmButtonColor: "#dc2626",
       cancelButtonColor: "#6b7280",
     }).then(async (result) => {
       if (result.isConfirmed) {
         try {
           await deleteAdminDivisionAdministratorService(id);
           fetchAdmin();

           Swal.fire({
             icon: "success",
             title: "Berhasil!",
             text: "Admin Divisi berhasil dihapus",
             confirmButtonColor: "#2563eb",
           });
         } catch (error: any) {
           Swal.fire({
             icon: "error",
             title: "Gagal!",
             text:
               error?.message ||
               "Terjadi kesalahan saat menghapus admin divisi.",
             confirmButtonColor: "#dc2626",
           });
         }
       }
     });
   };

  const filteredAdmin = admin.filter((item: Admin) => {
    const search = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(search) ||
      item.email.toLowerCase().includes(search) ||
      (item.division_name || "Belum Ditugaskan").toLowerCase().includes(search)
    );
  });

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col lg:flex-row w-full lg:justify-between">
        <div className="flex mb-4 flex-col w-full lg:w-[50%] md:flex-row gap-4 items-center lg:mb-0">
          {/* Search */}
          <form className="w-full">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                placeholder="Cari Admin Divisi"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>

          {/* Dropdown tampilkan N admin */}
          <div className="w-full lg:w-[50%] relative inline-block text-left">
            <button
              type="button"
              onClick={toggleDropdown}
              className="inline-flex p-2 items-center h-13 w-full justify-between lg:p-4 text-sm font-medium text-gray-700 
              border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 
              dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              Tampilkan {pagination ? pagination.per_page : 10} Admin
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
                          pagination && pagination.per_page === limit
                            ? "font-semibold bg-gray-100"
                            : ""
                        }`}
                        onClick={() => {
                          changeLimit(limit);
                          setIsDropdownOpen(false);
                        }}
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

        {/* Tombol tambah */}
        <Link
          to="/administrator/admin-division/add-admin-division"
          className="lg:w-fit flex p-3 gap-1 font-medium justify-center items-center rounded-lg text-white bg-blue-700 text-sm"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Admin Divisi</span>
        </Link>
      </div>

      {/* Tabel */}
      <div className="md:p-4">
        <h2 className="text-xl font-bold mb-4">Daftar Admin Divisi</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 md:p-5 md:text-left">
                Nama
              </th>
              <th className="border border-gray-300 p-2 md:p-5 md:text-left hidden md:table-cell">
                Divisi
              </th>
              <th className="border border-gray-300 p-2 md:p-5 md:text-left hidden md:table-cell">
                Email
              </th>
              <th className="border border-gray-300 p-2 md:p-5 text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center p-5">
                  Memuat data...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="text-center p-5 text-red-500">
                  {error}
                </td>
              </tr>
            ) : filteredAdmin.length > 0 ? (
              filteredAdmin.map((item: Admin) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3 md:p-5 text-center md:text-left">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 p-3 md:p-5 text-center md:text-left hidden md:table-cell">
                    {item.division_name || "Belum Ditugaskan"}
                  </td>
                  <td className="border border-gray-300 p-3 md:p-5 text-center md:text-left hidden md:table-cell">
                    {item.email}
                  </td>
                  <td className="border border-gray-300 p-5 text-center">
                    <Link
                      to={`/administrator/admin-division/read-admin-division/${item.id}`}
                      className="inline-flex items-center justify-center p-1 text-blue-500 hover:text-blue-700"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <Link
                      to={`/administrator/admin-division/update-admin-division/${item.id}`}
                      className="inline-flex items-center justify-center p-1 text-yellow-500 hover:text-yellow-700"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-5">
                  Data tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => changePage(page)}
              className={`px-3 py-1 border rounded ${
                page === currentPage ? "bg-blue-600 text-white" : ""
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}