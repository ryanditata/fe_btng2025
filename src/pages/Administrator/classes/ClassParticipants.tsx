import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { downloadCSV } from "@/_mock/csv";
import { useClassById } from "@/hooks/api/administrator.ts/useClassById";
import { imageUrl } from "@/services/imageURL";
import { Participant } from "@/types/participant";

type ParticipantCSV = {
  No: number;
  Nama: string;
  Nim: string;
  Email: string;
  Phone: string;
  Semester: string;
  Prodi: string;
  Link_Twibbon: string;
  Link_Instagram: string;
  Link_Tiktok: string;
  Tanggal_Bergabung: string
};


export default function ClassParticipants() {
  const { id } = useParams<{ id: string }>();
  const { data: cls, loading } = useClassById(id || null);
  const [filteredParticipants, setFilteredParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    if (cls) {
      setFilteredParticipants(cls.participants ?? []);
    }
  }, [cls]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>
    );
  }

  const exportCsv = () => {
    const now = new Date();
    const formattedDate = now
      .toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" })
      .replace(/\//g, "-")
      .replace(/, /g, "_")
      .replace(/:/g, "-");
    if (!cls) return;
    const data: ParticipantCSV[] = cls?.participants?.map((r, i) => ({
      No: i + 1,
      Nama: r.user.name,
      Nim: r.user.nim,
      Email: r.user.email,
      Phone: r.user.phone,
      Semester: r.user.semester,
      Prodi: r.user.prodi,
      Link_Twibbon: typeof r.user.link_twibon === "string"
        ? r.user.link_twibon
        : "-",
      Link_Instagram: imageUrl(String(r.user.link_instagram || "")) || "-",
      Link_Tiktok: imageUrl(String(r.user.link_tiktok || "")) || "-",
      Tanggal_Bergabung: new Date(r.created_at).toLocaleString("id-ID"),
    })) ?? [];


    downloadCSV<ParticipantCSV>(`Report Pesert ${cls?.name} - ${formattedDate}.csv`, data);
  };

  const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (!cls) return;
    const filtered = cls.participants?.filter((r) =>
      r.user.name.toLowerCase().includes(value) ||
      r.user.email.toLowerCase().includes(value) ||
      r.user.nim.toLowerCase().includes(value)
    );
    setFilteredParticipants(filtered ?? []);
  }


  return (
    <>
      <div className="p-6 max-w-6xl mx-auto">
        {/* <div className="mb-5">
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Kelas", to: "/classes" },
            { label: `Peserta Kelas: ${cls.name}` },
          ]}
        />
      </div> */}

        {/* Header Info */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">
                Peserta Kelas: <span className="text-blue-600">{cls?.name}</span>
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Total Peserta: <b>{cls?.participants_count}</b> • Jadwal:{" "}
                {cls?.time_start} – {" "}
                {cls?.time_end}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={exportCsv}
                className="px-4 py-2 rounded-lg border hover:bg-gray-50"
              >
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            placeholder="Cari nama / email / nim"
            className="rounded-lg border border-gray-300 px-3 py-2"
            onChange={onChangeFilter}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="min-w-full bg-white dark:bg-gray-900 text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                <th className="px-4 py-3">No.</th>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Nim</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">No Hp</th>
                <th className="px-4 py-3">Tanggal Bergabung</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.map((r, i) => (
                <tr key={r.id_user} className="border-t border-gray-100 dark:border-gray-800">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3">{r.user.name}</td>
                  <td className="px-4 py-3">{r.user.nim}</td>
                  <td className="px-4 py-3">{r.user.email}</td>
                  <td className="px-4 py-3">{r.user.phone}</td>
                  <td className="px-4 py-3">
                    {new Date(r.created_at).toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
              {filteredParticipants.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                    Tidak ada data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
