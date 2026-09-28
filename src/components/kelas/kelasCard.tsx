import { Link } from "react-router";
import { Class } from "@/types/class";

interface KelasCardProps {
  kelas: Class | null;
  showButton?: boolean;
}

const KelasCard = ({ kelas, showButton = true }: KelasCardProps) => {
  const schedule = `${kelas?.time_start} - ${kelas?.time_end}`;

  if (!kelas) {
    return (
      <div className="rounded-xl border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark flex flex-col">
        <div className="flex-grow">
          <h4 className="text-xl font-semibold uppercase text-black">Kelas tidak ditemukan</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark flex flex-col">
      <div className="flex-grow">
        <h4 className="text-xl font-semibold uppercase text-black">{kelas.name}</h4>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Lokasi: {kelas.location}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm font-medium">
            Peserta: {kelas.participants_count ?? 0}/{kelas.quota}
          </span>
          <span className="inline-flex rounded-full bg-brand-100 py-1 px-3 text-sm font-medium text-brand-500">
            {schedule}
          </span>
        </div>
      </div>

      {showButton && (
        <div className="mt-5">
          <Link
            to={`/divisi/kelas/${kelas.id}`}
            className="inline-flex w-full items-center justify-center rounded-full bg-brand-500 py-2 px-4 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
          >
            Detail
          </Link>
        </div>
      )}
    </div>
  );
};

export default KelasCard;
