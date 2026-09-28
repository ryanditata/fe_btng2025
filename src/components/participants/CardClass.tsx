import React from 'react';
import { X, Check, FileText, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';

interface CardClassProps {
  uuid?: string;
  title: string;
  silabus: string;
  color: string;
  availableMorning: boolean;
  availableAfternoon: boolean;
  openModal?: () => void;
  isClosed?: boolean;
  isJoined?: boolean;
}

const CardClass: React.FC<CardClassProps> = ({
  uuid,
  title,
  silabus,
  color,
  availableMorning,
  availableAfternoon,
  openModal,
  isClosed,
  isJoined = false
}) => {
  const navigate = useNavigate();
  const handleChangePage = () => {
    navigate(`${uuid}`);
  };

  return (
    <div className={`relative p-6 rounded-2xl text-white max-w-lg shadow-lg ${color ? color : "bg-[#D6409F]"}`}>
      {isClosed && (
        <div className="absolute inset-0 bg-white opacity-60">
        </div>
      )}
      {/* Header */}
      <h1 className="text-4xl mb-8 font-family-audiowide">{title}</h1>

      <img src="/images/vector/class-vector.svg" alt="Class" className="absolute top-0 right-0" />

      {/* Quota Section */}
      {!isJoined && (<div className="mb-8 font-family-raleway">
        <h2 className="text-lg font-medium mb-4">Kuota</h2>
        {/* Sesi Pagi */}
        <div className="flex items-center mb-3 gap-2">
          <span className="text-white text-sm">Sesi Pagi</span>
          <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 text-black">
            {
              availableMorning ? (
                <Check className="w-4 h-4 text-[#34C759] " />
              ) : (
                <X className="w-4 h-4 text-[#FF3B30] " />
              )
            }
            <span className="text-xs font-medium">
              {availableMorning ? "Tersedia" : "Tidak Tersedia"}
            </span>
          </div>
        </div>

        {/* Sesi Siang */}
        <div className="flex items-center mb-3 gap-2">
          <span className="text-white text-sm">Sesi Siang</span>
          <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 text-black">
            {
              availableAfternoon ? (
                <Check className="w-4 h-4 text-[#34C759] " />
              ) : (
                <X className="w-4 h-4 text-[#FF3B30] " />
              )
            }
            <span className="text-xs font-medium">
              {availableAfternoon ? "Tersedia" : "Tidak Tersedia"}
            </span>
          </div>
        </div>
      </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>
            <FileText className="w-4 h-4 text-white/80" />
          </span>
          <a href={silabus} target="_blank" className="text-sm text-white/80 underline">Lihat silabus</a>
        </div>

        {
          isJoined ? (
            <button className="border-2 px-6 py-2 rounded-full font-semibold hover:bg-white/10 transition-colors" onClick={handleChangePage}>
              <div className="flex items-center">
                <span>Masuk Kelas</span>
                <span>
                  <ChevronRight className="w-4 h-4 ml-2" />
                </span>
              </div>
            </button>
          ) : (
            <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-white/90 transition-colors" onClick={openModal}>
              Join
            </button>
          )
        }
      </div>
    </div>
  );
};

export default CardClass;