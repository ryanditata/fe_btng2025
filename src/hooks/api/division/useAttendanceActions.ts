import { useState } from "react";
import { Attendance } from "@/types/attendance";
import { dataDivisionService } from "@/services/division/dataDivision";

export const useAttendanceActions = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const clearAfterDelay = () => {
        setTimeout(() => setSuccess(false), 3000);
        setTimeout(() => setError(null), 3000);
    };

    const createOrUpdateAttendance = async (attendanceData: Attendance) => {
        setLoading(true);
        setError(null);
        try {
            await dataDivisionService.createOrUpdateAttendance(attendanceData);
            setSuccess(true);
        } catch (err: any) {
            setError(err.response?.data?.message || "Terjadi kesalahan saat menyimpan absensi.");
        } finally {
            setLoading(false);
            clearAfterDelay();
        }
    };



    return {
        createOrUpdateAttendance,
        loading, error, success
    };
};
