import { Division } from "./division";
import { Participant } from "./participant";

export interface Class {      // Catatan
  id: string;           // UUID → string
  id_division: string;        // UUID → string
  name: string;               // varchar → string
  quota: number;              // int → number
  time_start: string;         // time → string (format "HH:mm:ss")
  time_end: string;           // time → string (format "HH:mm:ss")
  location: string;           // varchar → string
  type: string
  participants_count?: number; 
  division?: Division | null;
  created_at: string;
  updated_at: string;
  participants?: Participant[]
}