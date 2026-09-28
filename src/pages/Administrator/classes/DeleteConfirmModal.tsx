import Modal from "@/_mock/modal";

export default function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
  message,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Konfirmasi Hapus"
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Ya, Hapus
          </button>
        </>
      }
    >
      <p className="text-gray-700">{message}</p>
    </Modal>
  );
}
