import useSWR from "swr";
import { dataDivisionService } from "@/services/division/dataDivision";
import { Attendance } from "@/types/attendance";

export const useAttendance = (classId: string | null, weekNumber: number | null) => {
   const { data, error, isLoading } = useSWR<Attendance>(
    classId && weekNumber ? ["class-attendance", classId, weekNumber] : null,
    async () => {
        console.log("Fetching attendance for classId:", classId, "weekNumber:", weekNumber);
      const res = await dataDivisionService.getAttendance(classId as string, weekNumber as number);
      return res.data.data;
    },
    {
      revalidateOnFocus: false,
    }
  );

  return {
    data: data ?? null,
    loading: isLoading,
    error,
  };
};
