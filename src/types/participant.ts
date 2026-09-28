
import { User } from "./user";

export interface Participant {
    id_user: string;
    id_class?: string;
    id_division?: string;
    user: User;
    created_at: string;
    updated_at: string;
}