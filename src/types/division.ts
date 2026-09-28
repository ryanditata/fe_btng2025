import { Announcement } from "./announcements";
import { Class } from "./class";
import { Material } from "./material";
import { Task } from "./task";

export interface ClassAmount {
    amount_morning: number | 0;
    amount_afternoon: number | 0;
}

export interface Division {
    id: string;
    name: string;
    description: string;
    max_participants?: number;
    silabus: string;
    classes?: Class[];
    classes_amount?: ClassAmount;
    amount_week?: number;
    amount_participants?: number;
    announcements?: Announcement[];
    created_at?: string;
    updated_at?: string;
    materials?: Material[];
    tasks?: Task[];

}