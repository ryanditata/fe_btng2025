export type ClassStatus = "Aktif" | "Nonaktif" | "Selesai"
export type ParticipantRole = "Peserta" | "Mentor" | "Asisten"
export type EnrollmentStatus = "Aktif" | "Drop Out"

export interface ClassItem {
  id: string
  name: string
  description: string
  location: string; 
  startDate: string // ISO
  endDate: string   // ISO
  status: ClassStatus
}

export interface Participant {
  id: string
  name: string
  email: string
}

export interface ClassEnrollment {
  classId: string
  participantId: string
  role: ParticipantRole
  joinedAt: string // ISO datetime
  status: EnrollmentStatus
}

export interface ClassParticipantDetail {
  participantId: string
  name: string
  email: string
  role: ParticipantRole
  joinedAt: string
  status: EnrollmentStatus
}