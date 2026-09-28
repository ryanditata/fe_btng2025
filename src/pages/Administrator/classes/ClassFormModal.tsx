import { useEffect, useState } from "react";
import Modal from "@/_mock/modal";
import { Class } from "@/types/class";

export default function ClassFormModal({
  open,
  onClose,
  onSubmit,
  initial,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit?: (payload: Omit<Class, "id">, id?: string) => void;
  initial?: Class | null;
}) {

  const [name, setName] = useState("");
  const [quota, setQuota] = useState(0);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (initial) {
      setName(initial.name);
      setQuota(initial.quota);
      setStart(initial.time_start);
      setEnd(initial.time_end);
      setLocation(initial.location);
      setType(initial.type);
    } else {
      setName("");
      setQuota(0);
      setStart("");
      setEnd("");
      setLocation("");
      setType("");
    }
  }, [initial, open]);

  const handleSubmit = () => {
    if(!name || !quota || !start || !end || !location || !type) return;

    if (onSubmit) {
      onSubmit(
        {
          id_division: initial?.id_division ?? "",
          name,
          quota,
          time_start: start,
          time_end: end,
          location,
          type,
          created_at: "",
          updated_at: "",
        },
        initial?.id
      );
    }

  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Kelas"
      size="md"
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Simpan
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Nama Kelas</label>
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Frontend Dasar"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Kuota</label>
          <input
            type="number"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="30"
            value={quota}
            onChange={(e) => setQuota(parseInt(e.target.value))}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Waktu Mulai</label>
            <input
              type="time"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Waktu Selesai</label>
            <input
              type="time"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Lokasi</label>
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="Gedung H lantai 2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Tipe</label>
          <select 
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Pilih Tipe</option>
            <option value="pagi">Pagi</option>
            <option value="siang">Siang</option>
          </select>
        </div>
      </div>
    </Modal>
  );
}
