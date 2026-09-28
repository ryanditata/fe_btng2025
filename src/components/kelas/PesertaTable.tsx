import { Participant } from "@/types/participant";

type PesertaTableProps = {
  participants: Participant[];
};

export default function PesertaTable({ participants }: PesertaTableProps) {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full text-sm border rounded-lg shadow-sm">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="px-4 py-3 border">No</th>
            <th className="px-4 py-3 border">NIM</th>
            <th className="px-4 py-3 border">Nama</th>
            <th className="px-4 py-3 border">Prodi</th>
            <th className="px-4 py-3 border">Semester</th>
            <th className="px-4 py-3 border">Email</th>
            <th className="px-4 py-3 border">Nomor HP</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p, i) => (
            <tr
              key={p.user.id}
              className="text-left dark:border-gray-700 hover:bg-gray-50"
            >
              <td className="border px-4 py-2">{i + 1}</td>
              <td className="border px-4 py-2">{p.user.nim}</td>
              <td className="border px-4 py-2">{p.user.name}</td>
              <td className="border px-4 py-2">{p.user.prodi}</td>
              <td className="border px-4 py-2 text-center">{p.user.semester}</td>
              <td className="border px-4 py-2">{p.user.email}</td>
              <td className="border px-4 py-2">{p.user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}