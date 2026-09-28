import { useState } from "react";

interface Announcement {
  id: number;
  title: string;
  content: string;
}

export default function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // untuk konfirmasi delete
  const [confirmDelete, setConfirmDelete] = useState<Announcement | null>(null);

  // buka modal create / edit
  const openForm = (announcement: Announcement | null = null) => {
    setEditing(announcement);
    setTitle(announcement ? announcement.title : "");
    setContent(announcement ? announcement.content : "");
    setShowForm(true);
  };

  const closeForm = () => {
    setEditing(null);
    setTitle("");
    setContent("");
    setShowForm(false);
  };

  // CREATE or UPDATE
  const saveAnnouncement = () => {
    if (!title.trim() || !content.trim()) return;

    if (editing) {
      setAnnouncements(
        announcements.map((a) =>
          a.id === editing.id ? { ...a, title, content } : a
        )
      );
    } else {
      const newAnnouncement: Announcement = {
        id: Date.now(),
        title,
        content,
      };
      setAnnouncements([...announcements, newAnnouncement]);
    }
    closeForm();
  };

  // DELETE (langsung tanpa konfirmasi)
  const deleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
    setConfirmDelete(null); // tutup modal konfirmasi
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        📢 Manajemen Pengumuman
      </h1>

      <button
        onClick={() => openForm()}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        + Tambah Pengumuman
      </button>

      {/* Tabel dengan kotak shadow */}
      <div className="overflow-x-auto shadow-lg">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">No</th>
                <th className="border border-gray-300 px-4 py-2">Judul</th>
                <th className="border border-gray-300 px-4 py-2">
                  Isi Pengumuman
                </th>
                <th className="border border-gray-300 px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {announcements.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    Belum ada data
                  </td>
                </tr>
              ) : (
                announcements.map((a, index) => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {a.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {a.content}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => openForm(a)}
                        className="px-3 py-1 bg-yellow-400 rounded-lg hover:bg-yellow-500 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setConfirmDelete(a)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              {editing ? "Edit Pengumuman" : "Tambah Pengumuman"}
            </h2>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Judul pengumuman..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full border px-3 py-2 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Isi pengumuman..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={closeForm}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={saveAnnouncement}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
            <h2 className="text-lg font-semibold mb-4">
              Yakin ingin menghapus pengumuman ini?
            </h2>
            <p className="text-gray-600 mb-6">"{confirmDelete.title}"</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={() => deleteAnnouncement(confirmDelete.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
