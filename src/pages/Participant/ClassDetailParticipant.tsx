import  { useEffect, useState } from "react";
import { useParams } from "react-router";
import CardClassWide from "../../components/participants/CardClassWide";
import { FileText, FileTextIcon, Clock, MapPin } from "lucide-react";
import { useDivisionById } from "../../hooks/api/participant/useDivisionById";
import { mockColor } from "../../types/color";
import { generateFormatDate } from "../../libs/generateFormatDate";
import { useUsers } from "../../hooks/api/participant/useUsers";
import { Class } from "@/types/class";

const ClassDetailParticipant = () => {
  let params = useParams<{ id: string }>();
  const [colorIndex, setColorIndex] = useState<number | null>(null);
  const listMenuTab = [
    { name: "Materi" },
    { name: "Tugas" },
  ];
  const [activeTab, setActiveTab] = useState<number>(0);
  const { division, loading } = useDivisionById(params.id ?? null);
  const { userData, loading: loadingUsers } = useUsers();
  const [ choiceClass, setChoiceClass ] = useState<Class | null>(null);

  useEffect(() => {
  if (!params.id || !userData?.class_participants) return;

  const foundDivision = userData.class_participants.find(
    (division: any) => String(division.class.id_division) === String(params.id)
  );

  if (foundDivision) {
    setChoiceClass(foundDivision.class || null);
  } else {
    setChoiceClass(null);
  }
}, [params.id, userData?.class_participants]);

  if (loading || loadingUsers) (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
    </div>
  );
  else if (!division) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Divisi tidak ditemukan</p>
      </div>
    );
  }

  const generateRandomIndex = () => {
    if (colorIndex === null) {
      setColorIndex(Math.floor(Math.random() * mockColor.length));
    }
    return colorIndex;
  };

  return (
    <div className="">
      <h2 className="text-4xl font-family-audiowide mb-10">Kelas</h2>
      <div className="mt-10 lg:flex lg:gap-10">
        <div className="lg:w-2/3">
          <CardClassWide
            division={{
              id: params.id ?? "",
              name: division?.name ?? "",
              description: division?.description ?? "",
              silabus: division?.silabus ?? "",
            }}
            index={generateRandomIndex() ?? 0}
            showButton={false}
            showSilabus={false}
          />
          <div className="mt-10">
            <div className="flex border-b mb-5 gap-5">
              {listMenuTab.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 border-b pb-3 cursor-pointer ${activeTab === index
                    ? "border-b-btng-blue text-btng-blue"
                    : "border-b-transparent"
                    }`}
                  onClick={() => setActiveTab(index)}
                >
                  <FileText
                    className={`w-4 h-4 ${activeTab === index ? "" : "text-gray-500"
                      }`}
                  />
                  <p className="font-medium">{item.name}</p>
                  <div
                    className={`px-3 py-1 rounded-full flex items-center justify-center text-xs ${activeTab === index ? "bg-btng-blue/10" : "bg-gray-200"
                      }`}
                  >
                    {
                      listMenuTab[index].name === "Materi" ? (
                        <span className="font-semibold">{division?.materials?.length}</span>
                      ) : (
                        <span className="font-semibold">{division?.tasks?.length}</span>
                      )
                    }
                  </div>
                </div>
              ))}

            </div>
            <div className="mt-10">
              <div className="flex flex-col gap-5">
                {activeTab === 0 && (
                  <>
                    {
                      !division?.materials || division?.materials?.length === 0 ? (
                        <img src='/images/vector/dashboard-empty.svg' alt='Divisi yang diikuti' className='mx-auto py-5' />
                      ) : (
                        division?.materials?.map((material, index) => (
                          <div className="shadow-sm bg-white rounded-lg p-5" key={index}>
                            <div className="flex gap-5">
                              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                <FileTextIcon className="" />
                              </div>
                              <div className="">
                                <h3 className="">
                                  <span className="font-semibold">Admin </span>
                                  memposting materi baru: {material.title}
                                </h3>
                                <p className="">{generateFormatDate(material.created_at)}</p>
                              </div>
                            </div>
                            <hr className="mt-5" />
                            <div className="mt-5">
                              <p className="text-sm">Link : <a href="#" className="text-btng-blue">{material.content}</a></p>
                            </div>
                          </div>
                        ))
                      )
                    }
                  </>
                )}
                {activeTab === 1 && (
                  <>
                    {
                      !division?.tasks || division?.tasks?.length === 0 ? (
                        <img src='/images/vector/dashboard-empty.svg' alt='Divisi yang diikuti' className='mx-auto py-5' />
                      ) : (
                        division?.tasks?.map((task) => (
                          <div className="shadow-sm bg-white rounded-lg p-5" key={task.id}>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-5">
                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <FileTextIcon className="" />
                                </div>
                                <div className="">
                                  <h3 className="">
                                    <span className="font-semibold">Admin </span>
                                    memposting materi baru: CSS Dasar
                                  </h3>
                                  <p className="">2 Oktober 2025 </p>
                                </div>
                              </div>
                              <div className="bg-amber-100 rounded-full px-5 py-2 text-xs font-semibold">
                                <p>Submitted</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )

                    }
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 lg:mt-0 lg:w-1/3">
          <div className="shadow-sm bg-white rounded-lg py-5 px-10">
            <p className="font-family-audiowide text-4xl">Info Kelas</p>
            <div className="mt-5">
              <p className="font-semibold">Pertemuan Offline</p>
              <div className="flex items-center mt-4">
                <Clock className="w-5 h-5 mr-2 text-btng-blue" />
                <p className="text-sm">Sabtu, {choiceClass?.time_start} - {choiceClass?.time_end}</p>
              </div>
              <div className="flex items-center mt-4">
                <MapPin className="w-5 h-5 mr-2 text-btng-blue" />
                <p className="text-sm">{choiceClass?.location}</p>
              </div>
            </div>
            <div className="mt-5">
              <p className="font-semibold">Pertemuan Online</p>
              <div className="flex items-center mt-4">
                <Clock className="w-5 h-5 mr-2 text-btng-blue" />
                <p className="text-sm">-</p>
              </div>
              <div className="flex items-center mt-4">
                <MapPin className="w-5 h-5 mr-2 text-btng-blue" />
                <p className="text-sm">Meet Online/Youtube</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailParticipant;
