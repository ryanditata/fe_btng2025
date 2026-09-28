import React from "react";
import StatCard from "../../../components/dashboard/StatCard";
import PesertaChart from "../../../components/dashboard/PesertaChart";
import JadwalTerdekat from "../../../components/dashboard/JadwalTerdekat";

import { Users, BookOpen, UploadCloud, CalendarCheck } from "lucide-react";

const DivisionDashboard: React.FC = () => {
  return (
    <>
      {/* --- Bagian Kartu Statistik --- */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <StatCard title="Total Peserta" value="73" Icon={Users} />
        <StatCard title="Total Kelas" value="6" Icon={BookOpen} />
        <StatCard title="Materi Diunggah" value="12" Icon={UploadCloud} />
        <StatCard title="Tugas Aktif" value="4" Icon={CalendarCheck} />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* --- Bagian Grafik --- */}
        <div className="col-span-12 xl:col-span-8">
          <PesertaChart />
        </div>

        {/* --- Bagian Ringkasan Cepat --- */}
        <div className="col-span-12 xl:col-span-4">
          <div className="space-y-4">
            <JadwalTerdekat />
            {/* <TugasTerbaru /> */}
            {/* <PengumumanTerbaru /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DivisionDashboard;