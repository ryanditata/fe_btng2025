import React from "react";
import { Link, useParams } from "react-router";
import BackButton from "../../../components/kelas/BackButton";
import KelasCard from "../../../components/kelas/kelasCard";
import PesertaTable from "../../../components/kelas/PesertaTable";
import { useClassById } from "@/hooks/api/administrator.ts/useClassById";

const DetailKelas: React.FC = () => {
  const { id_kelas } = useParams<{ id_kelas: string }>();

  const { data, loading } = useClassById(id_kelas || "");

  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
    </div>;
  }

  if (!data) {
    return <div>Kelas tidak ditemukan.</div>;
  }

  return (
    <>
      <BackButton to="/divisi/kelas" text="Daftar Kelas" />

      <div className="mb-6">
        <KelasCard kelas={data} showButton={false} />
      </div>

      <div className="rounded-xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold mb-4 text-black">
            Daftar Peserta
          </h3>
          <Link to={`absensi`} className="bg-btng-blue px-4 py-2 rounded text-white">
            Absensi Peserta
          </Link>
        </div>
        <PesertaTable participants={data.participants ?? []} />
      </div>
    </>
  );
};

export default DetailKelas;