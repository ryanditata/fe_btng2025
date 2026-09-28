import React, { useMemo } from 'react'
import Select from '../../components/form/Select'
import { generateFormatDateWithDays } from '../../libs/generateFormatDateWithDay'
import { useDataPeserta } from '@/context/GlobalDataPesertaContext'

const PengumumanParticipant: React.FC = () => {
    const listSort = [
        { value: 'terbaru', label: 'Terbaru' },
        { value: 'terlama', label: 'Terlama' },
    ]

    const [selectedSort, setSelectedSort] = React.useState<string>(listSort[0].value);

    const { users } = useDataPeserta();


    const handleSortChange = (value: string) => {
        if (value !== selectedSort) {
            setSelectedSort(value);
        }
    };


    const sortedAnnouncements = useMemo(() => {
        if (!users.userData?.class_participants) return [];

        // ambil semua announcement dari semua divisi
        const announcements = users.userData.class_participants.flatMap(
            (p: any) => p.class.division?.announcements || []
        );

        // sort sesuai pilihan user
        if (selectedSort === "terbaru") {
            return announcements.sort(
                (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
        } else if (selectedSort === "terlama") {
            return announcements.sort(
                (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            );
        }

        return announcements;
    }, [users, selectedSort]);


    if (users.loading) {
        return <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        </div>;
    }

    return (
        <>
            <head>
                <title>Pengumuman</title>
            </head>
            <div className="mb-8">
                <h1 className="text-4xl mb-4 font-family-audiowide">
                    Pengumuman
                </h1>
            </div>
            <div className="flex max-w-xs">
                <Select
                    options={listSort}
                    placeholder="Sortir Pengumuman"
                    defaultValue={listSort[0].value}
                    onChange={handleSortChange}
                    className=""
                />
            </div>
            <div className="mt-8 lg:flex lg:gap-10">
                <div className="lg:w-2/3">
                    <div className="flex flex-col gap-5">
                        {
                            !sortedAnnouncements || sortedAnnouncements.length === 0 ? (
                                <img
                                    src="/images/vector/dashboard-empty.svg"
                                    alt="Divisi yang diikuti"
                                    className="mx-auto py-5"
                                />
                            ) : (
                                sortedAnnouncements.map((announcement: any) => (
                                    <div className="shadow-sm bg-white rounded-lg py-5 px-10" key={announcement.id}>
                                        <p className="font-medium text-2xl">{announcement.title}</p>
                                        <p className="mt-2 text-gray-600 text-sm">
                                            {generateFormatDateWithDays(announcement.created_at)}
                                        </p>
                                        <hr className="my-4 border-gray-300" />
                                        <div
                                            className="prose max-w-full"
                                            dangerouslySetInnerHTML={{ __html: announcement.content }}
                                        />
                                    </div>
                                ))
                            )
                        }

                    </div>
                </div>
                <div className="flex-1">
                    <div className="shadow-sm bg-white rounded-lg py-5 px-10">
                        <p className='font-family-audiowide text-xl'>Sertifikat</p>
                        <p>Selesaikan tugas  akhir untuk
                            mendapatkan sertifikat.</p>
                        <button className="mt-4 bg-btng-gray/40 py-2 px-4 rounded-lg cursor-not-allowed" disabled>
                            Belum Tersedia
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PengumumanParticipant