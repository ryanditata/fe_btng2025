import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router";
import { ChevronRight } from "lucide-react";
import api from "@/libs/api";
import { imageUrl } from "@/services/imageURL";

interface Participant {
  id: string;
  nama: string;
  nim: string;
  programStudi: string;
  noTelp: string;
  link_twibbon: string;
  link_instagram: string;
  link_tiktok: string;
}

interface DivisionDetail {
  id: string;
  name: string;
  description: string;
  max_participants: number;
  silabus: string | null;
  amount_weeks: number;
}

export default function AppListParticipant() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { namaDivisi } = (location.state as { namaDivisi?: string }) || {};

  const [divisionDetail, setDivisionDetail] = useState<DivisionDetail | null>(
    null
  );
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // pagination backend
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Fetch data dari API
  const fetchDivisionWithParticipants = async (page = 1) => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await api.get(
        `/shared/divisions-with-participants/${id}?page=${page}`
      );

      const data = response.data.data;
      setDivisionDetail(data.division);

      // mapping peserta dari API
      const pesertaAPI: Participant[] = data.participants.result.map(
        (p: any) => ({
          id: p.id,
          nama: p.user?.name || "-",
          nim: p.user?.nim || "-",
          programStudi: p.user?.prodi || "-",
          noTelp: p.user?.phone || "-",
          link_twibbon: p.user?.link_twibon || "-",
          link_instagram: p.user?.link_instagram || "-",
          link_tiktok: p.user?.link_tiktok || "-",
        })
      );
      setParticipants(pesertaAPI);

      // pagination backend
      setCurrentPage(data.participants.Pagination.current_page);
      setLastPage(data.participants.Pagination.last_page);
      setTotal(data.participants.Pagination.total);
    } catch (err) {
      console.error(err);
      setError("Gagal mengambil data peserta");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDivisionWithParticipants(currentPage);
  }, [id, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= lastPage) {
      setCurrentPage(page);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <head>
        <title>
          Daftar Peserta
        </title>
      </head>
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-row items-center gap-1">
          <Link to={`/administrator/division`} className="flex flex-row gap-2">
            Daftar Divisi
            <ChevronRight className="w-5 text-black" />
          </Link>
          <p className="text-blue-700">Daftar Peserta</p>
        </div>

        <div className="md:p-4">
          <h2 className="text-xl font-bold mb-4">
            Daftar Peserta Divisi{" "}
            {namaDivisi || divisionDetail?.name || `ID ${id}`}
          </h2>
          <p className="text-sm text-black mb-4">Total Peserta: {total}</p>
          {participants.length === 0 ? (
            <p className="text-gray-500 italic">
              Belum ada peserta terdaftar untuk divisi ini.
            </p>
          ) : (
            <>
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 md:p-3 text-left">
                      No
                    </th>
                    <th className="border border-gray-300 p-2 md:p-3 text-left">
                      Nama
                    </th>
                    <th className="border border-gray-300 p-2 md:p-3 text-left">
                      NIM
                    </th>
                    <th className="border border-gray-300 p-2 md:p-3 text-left">
                      Program Studi
                    </th>
                    <th className="border border-gray-300 p-2 md:p-3 text-left">
                      No Telp
                    </th>
                    <th className="border hidden md:table-cell border-gray-300 p-2 md:p-3 text-left">
                      Link Twibbon
                    </th>
                    <th className="border hidden md:table-cell border-gray-300 p-2 md:p-3 text-left">
                      Link Instagram
                    </th>
                    <th className="border hidden md:table-cell border-gray-300 p-2 md:p-3 text-left">
                      Link TikTok
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((p, index) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2 md:p-3">
                        {(currentPage - 1) * 10 + index + 1}
                      </td>
                      <td className="border border-gray-300 p-2 md:p-3">
                        {p.nama}
                      </td>
                      <td className="border border-gray-300 p-2 md:p-3">
                        {p.nim}
                      </td>
                      <td className="border border-gray-300 p-2 md:p-3">
                        {p.programStudi}
                      </td>
                      <td className="border border-gray-300 p-2 md:p-3">
                        {p.noTelp}
                      </td>
                      <td className="border hidden md:table-cell border-gray-300 p-2 md:p-3">
                        <a
                          href={p.link_twibbon}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Twibbon
                        </a>
                      </td>
                      <td className="border hidden md:table-cell border-gray-300 p-2 md:p-3">
                        <a
                          href={imageUrl(p.link_instagram)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-600 underline"
                        >
                          Instagram
                        </a>
                      </td>
                      <td className="border hidden md:table-cell border-gray-300 p-2 md:p-3">
                        <a
                          href={imageUrl(p.link_tiktok)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-800 underline"
                        >
                          TikTok
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-center items-center mt-4 gap-2">
                {/* Prev */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded border ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  Prev
                </button>

                {/* Pages */}
                {Array.from({ length: lastPage }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 rounded border ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                {/* Next */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === lastPage}
                  className={`px-3 py-1 rounded border ${
                    currentPage === lastPage
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
