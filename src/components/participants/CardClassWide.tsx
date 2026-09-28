import { ChevronRight, FileText } from 'lucide-react'
import { mockColor } from '../../types/color'
import { useNavigate } from 'react-router';

interface CardClassWideProps {
    showButton: boolean;
    showSilabus: boolean;
    division: {
        id: string;
        name: string;
        description: string;
        silabus: string;
    };
    index: number;
}

const CardClassWide = ({ division, index, showButton = false, showSilabus = false }: CardClassWideProps) => {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(`/participant/class/${division.id}`);
    };

    return (
        <div className={`relative p-6 rounded-2xl text-white shadow-lg ${mockColor[index % mockColor.length]}`} key={division.id}>
            <img src="/images/vector/class-vector.svg" alt="Class" className="absolute top-0 right-0" />
            <p className='text-4xl font-family-audiowide'>{division.name}</p>
            <div className="flex justify-between items-center mt-10">
                {showSilabus && (
                    <div className="flex items-center gap-2">
                        <span>
                            <FileText className="w-4 h-4 text-white/80" />
                        </span>
                        <span className="text-white/90 text-sm underline cursor-pointer hover:text-white transition-colors">
                            Lihat silabus
                        </span>
                    </div>
                )}
                {showButton && (
                    <button className='flex items-center gap-1 border-2 border-white rounded-full py-2 px-4 text-sm' onClick={handleButtonClick}>
                        <span className='font-medium'>Masuk Kelas</span>
                        <span><ChevronRight className="w-4 h-4 text-white/80" /></span>
                    </button>
                )}
            </div>
        </div>
    )
}

export default CardClassWide