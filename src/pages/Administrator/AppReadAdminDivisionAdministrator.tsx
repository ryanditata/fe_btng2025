import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getAdminDivisionAdministratorService } from "@/services/administrator/getAdminDivisionAdministratorService";

interface Admin {
  id: string;
  name: string;
  email: string;
  division_id?: string;
  division_name?: string;
}

export default function AppAddDivisionAdministrator() {
  const { id } = useParams<{ id: string }>();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        if (!id) return;

        // 1. Ambil detail admin
        const adminData = await getAdminDivisionAdministratorService.getById(
          id
        );

        // 2. Ambil semua divisi
        const divisions =
          await getAdminDivisionAdministratorService.getDivisions();

        // 3. Cari nama divisi sesuai id_divisi_managed
        const divisionName =
          divisions.find((d: any) => d.id === adminData.id_divisi_managed)
            ?.name || "Belum Ditugaskan";

        // 4. Set state admin
        setAdmin({
          id: adminData.id,
          name: adminData.name,
          email: adminData.email,
          division_id: adminData.id_divisi_managed,
          division_name: divisionName,
        });
      } catch (error) {
        console.error("Gagal mengambil detail admin divisi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [id]);

  if (loading) return <p className="text-center py-10">Memuat data...</p>;
  if (!admin)
    return (
      <p className="text-center py-10 text-red-500">
        Admin Divisi tidak ditemukan.
      </p>
    );

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-row items-center gap-1">
        <Link
          to={`/administrator/admin-division`}
          className="flex flex-row gap-2"
        >
          Daftar Admin Divisi
          <ChevronRight className="w-5 text-black" />
        </Link>
        <p className="text-blue-700">Detail Admin Divisi</p>
      </div>

      <div className="md:px-12 md:py-8 w-full flex flex-col bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
        <h2 className="text-xl font-bold mb-4 text-center">
          Detail Admin Divisi
        </h2>
        <div className="mx-auto w-full">
          <div className="mb-5">
            <h1 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nama
            </h1>
            <p className="text-gray-900 text-sm dark:text-white">
              {admin.name}
            </p>
          </div>
          <div className="mb-5">
            <h1 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Divisi
            </h1>
            <p className="text-gray-900 text-sm dark:text-white">
              {admin.division_name || "Belum Ditugaskan"}
            </p>
          </div>
          <div className="mb-5">
            <h1 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </h1>
            <p className="text-gray-900 text-sm dark:text-white">
              {admin.email}
            </p>
          </div>
          <Link
            to={`/administrator/admin-division`}
            className="flex justify-center text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Kembali
          </Link>
        </div>
      </div>
    </div>
  );
}
