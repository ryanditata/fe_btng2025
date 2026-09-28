import BackButton from "@/components/kelas/BackButton";
import KelasCard from "@/components/kelas/kelasCard";
import Alert from "@/components/ui/alert/Alert";
import { Modal } from "@/components/ui/modal";
import { useAttendance } from "@/hooks/api/division/useAttendance";
import { useAttendanceActions } from "@/hooks/api/division/useAttendanceActions";
import { useModal } from "@/hooks/useModal";
import { Attendance } from "@/types/attendance";
import { useEffect, useState } from "react";
import { useParams } from "react-router";


export default function AbsensiPage() {

  const { id_kelas } = useParams<{ id_kelas: string }>();

  const [numberOfWeeks, setNumberOfWeeks] = useState(1);
  const { data, loading } = useAttendance(id_kelas || null, numberOfWeeks);
  const { createOrUpdateAttendance, loading: loadingSavings, error, success } = useAttendanceActions();
  const { closeModal } = useModal();


  const [attendance, setAttendance] = useState<Attendance>(data || {
    id_class: id_kelas || "",
    week_number: numberOfWeeks,
    attendees: [],
  });

  useEffect(() => {
    if (data) {
      setAttendance(data);
    } else {
      setAttendance({
        id_class: id_kelas || "",
        week_number: numberOfWeeks,
        attendees: [],
      });
    }
  }, [data, id_kelas, numberOfWeeks]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Kelas tidak ditemukan.</p>
      </div>
    );
  }

  const handleStatusChange = (id: string, status: "present" | "absent" | "excused") => {
    setAttendance((prev) => ({
      ...prev,
      attendees: prev.attendees.map((s) =>
        s.id_user === id ? { ...s, status } : s
      ),
    }));
  };

  const handleNoteChange = (id: string, note: string) => {
    setAttendance((prev) => ({
      ...prev,
      attendees: prev.attendees.map((s) =>
        s.id_user === id ? { ...s, note } : s
      ),
    }));
  };


  const handleSave = async () => {
    await createOrUpdateAttendance(attendance);
  };



  return (
    <>
      <div className="mx-auto p-6">
        <BackButton to={`/divisi/kelas/${id_kelas}`} text="Daftar Kelas" />
        {error && (
          <Alert
            variant="error"
            title="Gagal Masuk"
            message={error?.toString() || "Terjadi kesalahan saat menyimpan absensi."}
          />
        )}
        {success && (
          <Alert
            variant="success"
            title="Berhasil"
            message="Absensi berhasil disimpan."
          />
        )}
        <div className="my-6">
          <KelasCard kelas={data.class || null} showButton={false} />
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex gap-4 justify-between items-center p-4 border-b">

            <select
              value={numberOfWeeks}
              onChange={(e) => setNumberOfWeeks(Number(e.target.value))}
              className="border px-3 py-2 rounded-lg"
            >
              <option value={1}>Minggu 1</option>
              <option value={2}>Minggu 2</option>
              <option value={3}>Minggu 3</option>
              <option value={4}>Minggu 4</option>
            </select>
            <button
              onClick={handleSave}
              className="px-5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Simpan Absensi
            </button>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Student ID</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">NIM</th>
                <th className="border px-4 py-2 text-center">Status</th>
                <th className="border px-4 py-2 text-center">Note</th>
              </tr>
            </thead>
            <tbody>
              {
                attendance?.attendees?.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center p-4 text-gray-500">
                      Belum ada siswa di kelas ini.
                    </td>
                  </tr>
                )
              }
              {attendance?.attendees?.map((student, index) => (
                <tr key={student.id_user} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{student.user?.name}</td>
                  <td className="border px-4 py-2">{student.user?.nim}</td>
                  <td className="border px-4 py-2 text-center">
                    <select
                      value={student.status || "absent"}
                      onChange={(e) =>
                        handleStatusChange(student.user?.id || "", e.target.value as "present" | "absent" | "excused")
                      }
                      className="border px-2 py-1 rounded"
                    >
                      <option value="present">Hadir</option>
                      <option value="absent">Tidak Hadir</option>
                      <option value="excused">Izin</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={student.note || ""}
                      onChange={(e) => {
                        handleNoteChange(student.user?.id || "", e.target.value)
                      }}
                      placeholder="Note"
                      className="w-full border px-2 py-1 rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={loadingSavings} onClose={closeModal} className="max-w-sm">
        <div className="flex flex-col items-center justify-center p-6">
          <h2 className="text-lg font-semibold">Tunggu Sebentar</h2>
          <div className="flex items-center justify-center my-10">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          </div>
          <p className="text-center">
            Silakan tunggu sementara kami memproses permintaan Anda.
          </p>
        </div>
      </Modal>
    </>

  );
}
