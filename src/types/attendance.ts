import { Class } from "./class";
import { User } from "./user";

export interface Attendance {
    id?: string;
    id_class: string;
    week_number: number;
    attendees: AttendanceRecord[];
    created_at?: string;
    updated_at?: string;
    class?: Class;
}

export interface AttendanceRecord {
    id?: string;
    id_attendance: string;
    id_user: string;
    status: "present" | "absent" | "excused";
    note?: string;
    user?: User;
    created_at?: string;
    updated_at?: string;
}