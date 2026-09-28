import { Class } from "./class";
import { Division } from "./division";

export interface User {
    id: string;
    name: string;
    email: string;
    nim: string;
    phone: string;
    prodi: string;
    semester: string;
    role?: "admin_divisi" | "peserta" | "administrator";
    id_divisi_managed?: string | null;
    link_tiktok: String | null;
    link_instagram: String | null;
    link_twibon: File | String | null;
    division?: Division | null;
    class_participants: ClassParticipant[] | null;
    division_participants: DivisionParticipant[] | null;
    password?: string;
    password_confirmation?: string;
}

export interface Authorization {
    token: string;
    type: string;
}

export interface ClassParticipant {
    id_user: string;
    id_class: string;
    class: Class
}

export interface DivisionParticipant {
    id_user: string;
    id_division: string;
    division: Division
}

export interface ResponseLogin {
    user: User;
    token?: string;
    authorization?: Authorization;
}