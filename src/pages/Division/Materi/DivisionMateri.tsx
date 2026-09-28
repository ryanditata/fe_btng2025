import { Link2, Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const DivisionMateri: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Daftar Materi</h1>
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
                  placeholder="Cari Materi..."
                />
              </div>
            </form>

          </div>

          {/* Tombol tambah materi */}
          <Link
            to="tambah"
            className="lg:w-fit flex p-3 gap-1 font-medium justify-center items-center rounded-lg text-white bg-blue-700 text-sm"
          >
            <Plus className="w-5 h-5" />
            <span>Tambah Materi</span>
          </Link>
        </div>

        {/* Tabel */}
        <div className="md:p-4">
          <h2 className="text-xl font-bold mb-4">Daftar Materi</h2>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 md:p-5 md:text-left">
                  Judul
                </th>
                <th className="border border-gray-300 p-2 md:p-5 md:text-left hidden md:table-cell">
                  Tanggal Upload
                </th>
                <th className="border border-gray-300 p-2 md:p-5 md:text-left hidden md:table-cell">
                  Link Materi
                </th>
                <th className="border border-gray-300 p-2 md:p-5 text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2 md:p-5">
                  Materi Pengenalan React
                </td>
                <td className="border border-gray-300 p-2 md:p-5 hidden md:table-cell">
                  10 Oktober 2023
                </td>
                <td className="border border-gray-300 p-2 md:p-5 hidden md:table-cell">
                  <a
                    href="https://example.com/materi-react"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1 justify-center md:justify-start"
                  >
                    <Link2 className="w-4 h-4" />
                    https://example.com/materi-react
                  </a>
                </td>
                <td className="border border-gray-300 p-2 md:p-5 text-center">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <span className="mx-2">|</span>
                  <button className="text-red-600 hover:underline">
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Pagination */}
        </div>
      </div>
    </div>
  );
};

export default DivisionMateri;
