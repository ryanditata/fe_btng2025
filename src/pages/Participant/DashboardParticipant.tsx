import { useDataPeserta } from '@/context/GlobalDataPesertaContext';
import CardClassWide from '../../components/participants/CardClassWide';
import { generateFormatDate } from '@/libs/generateFormatDate';
import { Link } from 'react-router';

const DashboardParticipant = () => {
    const { users, auth } = useDataPeserta();

    if (users.loading) (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        </div>
    )

    return (
        <>
            <head>
                <title>Dashboard Peserta</title>
                <meta name="description" content="Halaman dashboard untuk peserta" />
            </head>
            <div className="">
                <div className="bg-btng-black px-10 py-16 rounded-xl shadow-md relative">
                    <div className="absolute top-0 right-0">
                        <img src="/images/vector/card-profile-dashboard.webp" alt="Dashboard" />
                    </div>
                    <div className="text-white">
                        <h2 className='text-4xl font-family-audiowide'>Hai, {auth.user?.name}!</h2>
                        <p className='mt-4'>Selamat datang kembali, siap untuk kelas selanjutnya?</p>
                    </div>
                </div>
                <div className="mt-10 lg:flex lg:gap-10">
                    <div className="lg:w-2/3">
                        <p className='font-family-audiowide text-xl mb-8'>Divisi yang diikuti</p>
                        {
                            users.userData?.class_participants && users.userData?.class_participants.length > 0 ? (
                                <div className="flex flex-col gap-4">
                                    {users.userData.class_participants.map((item: any, index: number) => (
                                        <CardClassWide division={item.class.division} index={index} showButton={true} showSilabus={true} />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <img src='/images/vector/dashboard-empty.svg' alt='Divisi yang diikuti' className='mx-auto py-5' />
                                </div>
                            )}
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="shadow-sm bg-white rounded-lg py-5 px-10">
                            <p className='font-family-audiowide text-xl'>Pengumuman</p>
                            <div className='mt-4'>
                                {users.userData?.class_participants && users.userData.class_participants.length > 0 ? (
                                    <div className="flex flex-col gap-3">
                                        {users.userData.class_participants.map((participant: any, idx: number) => {
                                            const announcements = participant.class.division?.announcements;
                                            const firstAnnouncement = announcements?.[0];

                                            return (
                                                <div key={participant.class.division?.id || idx} className="bg-btng-gray/20 p-5 rounded-lg">
                                                    {firstAnnouncement ? (
                                                        <>
                                                            <p className="font-semibold">{firstAnnouncement.title}</p>
                                                            <p className="mt-2 text-sm text-gray-600">
                                                                {generateFormatDate(firstAnnouncement.created_at)}
                                                            </p>
                                                            <div
                                                                className="text-sm mt-1 line-clamp-2"
                                                                dangerouslySetInnerHTML={{ __html: firstAnnouncement.content }}
                                                            />
                                                            <Link to="/participant/announcement">
                                                                <span className="text-sm text-blue-500 cursor-pointer">Lihat Selengkapnya</span>
                                                            </Link>
                                                        </>
                                                    ) : (
                                                        <p className="font-semibold">Tidak ada pengumuman di {participant.class.division?.name}</p>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="bg-btng-gray/20 p-5 rounded-lg">
                                        <p className="font-semibold">Tidak ada pengumuman</p>
                                    </div>
                                )}

                            </div>
                        </div>
                        <div className="shadow-sm bg-white rounded-lg py-5 px-10">
                            <p className='font-family-audiowide text-xl'>Kalender</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardParticipant