import { useState } from "react";
import { Link } from "react-router-dom";
import ClassFormModal from "./classes/ClassFormModal";
import DeleteConfirmModal from "./classes/DeleteConfirmModal";
import { useDataAdministrator } from "@/context/GlobalDataAdministratorContext";
import { Class } from "@/types/class";
import { useClassActions } from "@/hooks/api/administrator.ts/useClassActions";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import Alert from "@/components/ui/alert/Alert";

export default function ClassList() {
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Class | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [toDelete, setToDelete] = useState<Class | null>(null);
  const { classes } = useDataAdministrator();
  const { updateClass, deleteClass, loading, error, success } = useClassActions();
  const { closeModal } = useModal();



  const handleUpdate = (payload: Omit<Class, "id">, id?: string) => {
    updateClass(
      id ?? "",
      payload,
    )
    setOpenForm(false)
    setEditing(null)
  };

  const handleDelete = () => {
    if(!toDelete?.id) return;
    deleteClass(
      toDelete?.id
    ) 
    setOpenDelete(false)
    setToDelete(null)
  };

  if (classes.loading) {
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
    </div>
  }

  return (
    <>
      <head>
        <title>Class Participants</title>
      </head>
      <div className="p-6 max-w-6xl mx-auto">
        {
          error && <Alert
            variant="error"
            title="Gagal Memperbarui Profil"
            message={error?.toString() || ""}
          />
        }

        {
          success && <Alert
            variant="success"
            title="Berhasil"
            message="Anda telah menghapus/memperbarui kelas"
          />
        }
        <div className="flex flex-col gap-12 mt-8">
          {
            classes.data?.map((division) => (
              <div className="" key={division.id}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Daftar Kelas {division.name}</h2>
                </div>


                {/* Grid List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Jika belum ada kelas */}
                  {division.classes?.length === 0 && (
                    <div className="col-span-full text-center text-gray-500 py-10">
                      Belum ada kelas. Klik “Tambah Kelas” untuk membuat.
                    </div>
                  )}

                  {division.classes?.map((cls) => {
                    return (
                      <div
                        key={cls.id}
                        className="rounded-2xl border border-gray-200 p-6 shadow-md bg-white hover:shadow-lg transition"
                      >
                        <h2 className="text-xl font-bold mb-3 uppercase">{cls.name}</h2>
                        <p className="text-sm text-gray-500 mb-2">
                          Lokasi: {cls.location}
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                          Peserta: {cls.participants_count}/{cls.quota}
                        </p>

                        <div className="mb-6">
                          <span className="inline-block rounded-full bg-blue-100 text-blue-700 px-4 py-1 text-sm font-medium">
                            {cls.time_start} - {cls.time_end}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <Link
                            to={`/classes/${cls.id}/participants`}
                            className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                          >
                            Detail
                          </Link>
                          <div className="space-x-2">
                            <button
                              onClick={() => {
                                setEditing(cls);
                                setOpenForm(true);
                              }}
                              className="px-4 py-2 rounded-xl border hover:bg-gray-50"
                              title="Edit"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => {
                                setToDelete(cls);
                                setOpenDelete(true);
                              }}
                              className="px-4 py-2 rounded-xl border hover:bg-red-50 text-red-600"
                              title="Hapus"
                            >
                              🗑
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}


                </div>
              </div>
            ))
          }
        </div>

        {/* Modals */}
        <ClassFormModal
          open={openForm}
          onClose={() => setOpenForm(false)}
          initial={editing}
          onSubmit={handleUpdate}
        />
        <DeleteConfirmModal
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          onConfirm={handleDelete}
          message={
            toDelete
              ? `Apakah Anda yakin ingin menghapus kelas "${toDelete.name}"?`
              : ""
          }
        />
        <Modal isOpen={loading} onClose={closeModal} className="max-w-sm">
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
      </div>
    </>
  );
}
