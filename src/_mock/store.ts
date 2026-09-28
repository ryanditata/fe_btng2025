import {
  ClassItem,
  Participant,
  ClassEnrollment,
  ParticipantRole,
  EnrollmentStatus,
  ClassParticipantDetail,
} from "./types";

let classes: ClassItem[] = [
  {
    id: "KLS-001",
    name: "Kelas Pagi",
    description: "Pengenalan HTML, CSS, JS",
    location: "Gedung A, Lantai 2",     
    startDate: "2025-09-01",
    endDate: "2025-10-01",
    status: "Aktif",
  },
  {
    id: "KLS-002",
    name: "Kelas Siang",
    description: "Pengenalan HTML, CSS, JS",
    location: "Gedung B, Lantai 3",    
    startDate: "2025-10-10",
    endDate: "2025-12-10",
    status: "Aktif",
  },
];

let participants: Participant[] = [
  { id: "P-001", name: "Alya Putri", email: "alya@example.com" },
  { id: "P-002", name: "Bima Pratama", email: "bima@example.com" },
  { id: "P-003", name: "Citra Dewi", email: "citra@example.com" },
  { id: "P-004", name: "Doni Saputra", email: "doni@example.com" },
];

let enrollments: ClassEnrollment[] = [
  {
    classId: "KLS-001",
    participantId: "P-001",
    role: "Peserta",
    joinedAt: new Date().toISOString(),
    status: "Aktif",
  },
  {
    classId: "KLS-001",
    participantId: "P-002",
    role: "Mentor",
    joinedAt: new Date().toISOString(),
    status: "Aktif",
  },
];

const genId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

export const store = {
  // Classes
  getClasses(): ClassItem[] {
    return [...classes];
  },
  getClassById(id: string): ClassItem | undefined {
    return classes.find((c) => c.id === id);
  },
  createClass(data: Omit<ClassItem, "id">): ClassItem {
    const item: ClassItem = { ...data, id: genId("KLS") };
    classes = [item, ...classes];
    return item;
  },
  updateClass(id: string, data: Partial<Omit<ClassItem, "id">>): ClassItem | undefined {
    const idx = classes.findIndex((c) => c.id === id);
    if (idx === -1) return;
    classes[idx] = { ...classes[idx], ...data };
    return classes[idx];
  },
  deleteClass(id: string): void {
    classes = classes.filter((c) => c.id !== id);
    enrollments = enrollments.filter((e) => e.classId !== id);
  },

  // Participants directory
  getAllParticipants(): Participant[] {
    return [...participants];
  },

  // Enrollment
  getEnrollmentsByClassId(classId: string): ClassEnrollment[] {
    return enrollments.filter((e) => e.classId === classId);
  },
  getParticipantDetailsByClassId(classId: string): ClassParticipantDetail[] {
    const list = enrollments
      .filter((e) => e.classId === classId)
      .map((e) => {
        const p = participants.find((x) => x.id === e.participantId)!;
        return {
          participantId: p.id,
          name: p.name,
          email: p.email,
          role: e.role,
          joinedAt: e.joinedAt,
          status: e.status,
        };
      });
    return list;
  },
  assignParticipants(
    classId: string,
    participantIds: string[],
    role: ParticipantRole
  ): void {
    const already = new Set(
      enrollments.filter((e) => e.classId === classId).map((e) => e.participantId)
    );
    const newOnes: ClassEnrollment[] = participantIds
      .filter((pid) => !already.has(pid))
      .map((pid) => ({
        classId,
        participantId: pid,
        role,
        joinedAt: new Date().toISOString(),
        status: "Aktif",
      }));
    enrollments = [...newOnes, ...enrollments];
  },
  removeParticipantFromClass(classId: string, participantId: string): void {
    enrollments = enrollments.filter(
      (e) => !(e.classId === classId && e.participantId === participantId)
    );
  },
  updateRole(
    classId: string,
    participantId: string,
    role: ParticipantRole
  ): void {
    const e = enrollments.find(
      (x) => x.classId === classId && x.participantId === participantId
    );
    if (e) e.role = role;
  },
  updateEnrollmentStatus(
    classId: string,
    participantId: string,
    status: EnrollmentStatus
  ): void {
    const e = enrollments.find(
      (x) => x.classId === classId && x.participantId === participantId
    );
    if (e) e.status = status;
  },
};
