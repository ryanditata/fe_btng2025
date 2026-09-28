import KelasCard from "@/components/kelas/kelasCard";
import { useDataDivision } from "@/context/GlobalDataDivisionContext";
import React from "react";

const DivisionKelas: React.FC = () => {
  const { division } = useDataDivision();

  if (division.loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
    </div>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Daftar Kelas - {division.division?.name}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {division.division?.classes?.length === 0 && (
          <p className="text-gray-500">Belum ada kelas yang dibuat.</p>
        )}
        {division.division?.classes?.map((kelas) => (
          <KelasCard key={kelas.id} kelas={kelas} />
        ))}
      </div>
    </>
  );
};

export default DivisionKelas;