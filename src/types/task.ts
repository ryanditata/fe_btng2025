export interface Task {
    id: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    start_at: string;
    end_at: string;
    status: "pending" | "in_progress" | "completed";
}