import { ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getDivisionAdministratorService } from "@/services/administrator/getDivisionAdministratorService";

interface DivisionDetail {
  id: string;
  name: string;
  description: string;
  silabus: string;
  max_participants: number;
  participant_count: number;
  amount_weeks: number;
}

export default function AppReadDivisionAdministrator() {
  const { id } = useParams<{ id: string }>();
  const [division, setDivision] = useState<DivisionDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      try {
        const data = await getDivisionAdministratorService.getById(id);
        setDivision(data);
      } catch (error) {
        console.error("Error loading division detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!division) {
    return <p className="text-center text-red-500">Data tidak ditemukan.</p>;
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-row items-center gap-1">
        <Link to={`/administrator/division`} className="flex flex-row gap-2">
          Daftar Divisi
          <ChevronRight className="w-5 text-black" />
        </Link>
        <p className="text-blue-700">Detail Divisi</p>
      </div>

      <div className="md:px-12 md:py-8 w-full flex flex-col bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
        <h2 className="text-xl font-bold my-4 text-center">Detail Divisi</h2>
        <form className="mx-auto w-full">
          <div className="mb-5">
            <h1 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nama Divisi
            </h1>
            <p className="text-gray-900 text-sm dark:text-white">
              {division.name}
            </p>
          </div>
          <div className="mb-5">
            <h1 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Jumlah Peserta
            </h1>
            <p className="text-gray-900 text-sm dark:text-white">
              {division.participant_count}
            </p>
          </div>
          <div className="mb-5">
            <h1 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Kuota Peserta
            </h1>
            <p className="text-gray-900 text-sm dark:text-white">
              {division.max_participants}
            </p>
          </div>
          <div className="mb-5">
            <h1 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Deskripsi
            </h1>
            <p className="text-gray-900 text-justify text-sm dark:text-white">
              {division.description}
            </p>
          </div>
          <div className="mb-5">
            <h1 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Link Silabus
            </h1>
            <a
              href={division.silabus}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {division.silabus}
            </a>
          </div>
          <div className="mb-5">
            <h1 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Jumlah Minggu
            </h1>
            <p className="text-gray-900 text-sm dark:text-white">
              {division.amount_weeks}
            </p>
          </div>

          <Link
            to={`/administrator/division`}
            className="flex justify-center text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Kembali
          </Link>
        </form>
      </div>
    </div>
  );
}
