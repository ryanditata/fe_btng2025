import React from "react";

const jadwal = [
  { id: 1, nama: "Kelas Divisi Website", waktu: "Hari ini, 19:00" },
  { id: 2, nama: "Kelas Divisi Mobile", waktu: "Besok, 15:00" },
  { id: 3, nama: "Kelas Divisi Jaringan", waktu: "27 Agu 2025, 07:00" },
];

const JadwalTerdekat: React.FC = () => {
  return (
    <div className="rounded-lg border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h4 className="text-lg font-semibold text-black">
        Jadwal Kelas Terdekat
      </h4>
      <ul className="mt-4 space-y-3">
        {jadwal.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span className="font-medium">{item.nama}</span>
            <span className="text-sm text-gray-500">{item.waktu}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JadwalTerdekat;
