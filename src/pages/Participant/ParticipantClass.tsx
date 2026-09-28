import React, { useEffect, useState } from "react";
import CardClass from "../../components/participants/CardClass";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";
import { X, Clock } from "lucide-react";
import { Class } from "@/types/class";
import { Division } from "../../types/division";
import { mockColor } from "../../types/color";
import AlertCompleteProfile from "../../components/participants/AlertCompleteProfile";
import { useDataPeserta } from "@/context/GlobalDataPesertaContext";
import { useUserActions } from "@/hooks/api/participant/useUserAction";
import Alert from "@/components/ui/alert/Alert";

const ParticipantClass: React.FC = () => {
    const { isOpen, openModal, closeModal } = useModal();
    const { closeModal: closeLoadingModal } = useModal();
    const { registerClass, error, loading, success } = useUserActions();
    const [alreadyRegistered, setAlreadyRegistered] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [closedRegister, setClosedRegister] = useState(false);

    const [formData, setFormData] = useState({
        class_id: "",
        division_id: "",
    });

    const [selectedClass, setSelectedClass] = useState<number | null>(null);
    const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);
    const { divisions, users, auth } = useDataPeserta();

    useEffect(() => {
        if (!auth.user?.prodi || !auth.user?.phone || !auth.user?.semester || !auth.user?.nim || !auth.user?.link_tiktok || !auth.user?.link_instagram || !auth.user?.link_twibon) {
            setClosedRegister(true);
        } else {
            setClosedRegister(false);
        }
        if (users.userData?.class_participants == null) {
            setShowInfo(true);
            setTimeout(() => {
                setShowInfo(false);
            }, 5000);
        }
    }, [users.userData?.class_participants, auth.user]);

    const handleClassSelect = (index: number, id: string) => {
        setFormData({
            ...formData,
            class_id: id
        });
        setSelectedClass(index);
    };

    const handleDivisionSelect = (division: Division) => {
        if (users.userData?.class_participants != null && users.userData?.class_participants.length > 2) {
            setAlreadyRegistered(true);
            setTimeout(() => {
                setAlreadyRegistered(false);
            }, 3000);
            return;
        }
        setFormData({
            ...formData,
            division_id: division.id
        });
        openModal();
        setSelectedDivision(division);
    };

    const closeModalWithReset = () => {
        setSelectedClass(null);
        setFormData({
            class_id: "",
            division_id: "",
        });
        closeModal();
    };

    const handleSubmitClass = () => {
        if (!formData.class_id || !formData.division_id) {
            return;
        }
        registerClass(formData.division_id, formData.class_id);
        closeModalWithReset();
    };

    if (divisions.loading || users.loading || auth.loading) {
        return <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        </div>;
    }


    return (
        <>
            <head>
                <title>Participant Class</title>
            </head>
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4 font-family-raleway">
                    Divisi
                </h1>
            </div>
            {
                showInfo && <div className="mb-4">
                    <Alert
                        variant="warning"
                        title="Perhatian"
                        message="Anda hanya bisa mendaftar di dua kelas. Anda tidak dapat mengubah kelas setelah mendaftar."
                    />
                </div>
            }
            {
                error && <div className="mb-4">
                    <Alert
                        variant="error"
                        title="Gagal Mendaftar Kelas"
                        message={error?.toString() || ""}
                    />
                </div>
            }

            {
                success && <div className="mb-4">
                    <Alert
                        variant="success"
                        title="Berhasil Mendaftar Kelas"
                        message="Anda telah berhasil mendaftar kelas."
                    />
                </div>
            }
            {closedRegister ? (
                <AlertCompleteProfile />
            ) : null}
            {
                users.userData?.class_participants && (
                    <>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {users.userData?.class_participants.map((item: any, index: number) => (
                                <CardClass
                                    key={index}
                                    uuid={item.class?.division?.id}
                                    isJoined={true}
                                    title={item.class?.division?.name ?? ""}
                                    silabus={item.class?.division?.silabus ?? ""}
                                    color={mockColor[0]}
                                    availableMorning={item.class?.division?.classes_amount?.amount_morning !== 0}
                                    availableAfternoon={item.class?.division?.classes_amount?.amount_afternoon !== 0}
                                />
                            ))}
                        </div>

                        <hr className="my-8" />

                        <div className="mb-4">
                            {alreadyRegistered && <Alert
                                variant="info"
                                title="Anda Sudah Terdaftar"
                                message="Anda hanya bisa mendaftar di satu kelas."
                            />}
                        </div>
                    </>

                )

            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {divisions.divisionData?.map((division: Division, index: number) => {
                    const isRegistered = users.userData?.division_participants?.some(dp => dp.id_division === division.id);
                    if (isRegistered) {
                        return null; 
                    }
                    return (
                        <CardClass
                            uuid={division.id}
                            key={index}
                            title={division.name}
                            silabus={division.silabus}
                            color={mockColor[index]}
                            availableMorning={division.classes_amount?.amount_morning !== 0}
                            availableAfternoon={division.classes_amount?.amount_afternoon !== 0}
                            openModal={() => handleDivisionSelect(division)}
                            isClosed={true
                            }
                        />
                    )
                })}
            </div>
            <Modal isOpen={isOpen} onClose={closeModalWithReset} className="max-w-md">
                <div className="">
                    <div className="flex items-center justify-between px-6 py-4 border-b">
                        <h2 className="text-2xl font-family-audiowide">{selectedDivision?.name}</h2>
                        <X
                            className="cursor-pointer w-4 h-4"
                            onClick={closeModal}
                        />
                    </div>
                    <div className="p-6">
                        <p>Pilih waktu dan sesi kelas</p>
                        {selectedDivision?.classes?.map((classItem: Class, index: number) => (
                            <div key={index} className={`p-3 flex justify-between items-center border rounded-lg mt-4  ${classItem.quota < 1 ? 'border-gray-100 cursor-not-allowed' : 'cursor-pointer'} ${selectedClass === index ? 'border-btng-blue bg-btng-blue/10' : ''}`}
                                onClick={() => selectedClass !== index && classItem.quota > 0 ? handleClassSelect(index, classItem.id) : null}>
                                <div className={classItem.quota < 1 ? 'text-gray-400' : ''}>
                                    <p className="font-medium text-sm">{classItem.name}</p>
                                    <div className="flex items-center text-xs gap-2 mt-1">
                                        <Clock className="w-3 h-3 " />
                                        <span>{classItem.time_start} - {classItem.time_end}</span>
                                    </div>
                                </div>
                                <div className={`w-4 h-4 border rounded-full ${selectedClass === index ? 'border-4 border-btng-blue' : 'border-btng-gray'}`}>

                                </div>
                            </div>
                        ))}
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                className="border border-btng-gray px-4 py-2 rounded-full text-xs"
                                onClick={closeModalWithReset}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-btng-black text-white font-medium px-4 py-2 rounded-full text-xs"
                                onClick={handleSubmitClass}
                            >
                                Join
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={loading} onClose={closeLoadingModal} className="max-w-sm">
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
        </>
    );
};

export default ParticipantClass;
