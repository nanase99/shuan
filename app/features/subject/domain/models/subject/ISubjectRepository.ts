import type { Subject } from "./subject";

export interface ISubjectRepository {
  findMany: () => Promise<{ subjects: Subject[] }>;
  create: (subject: Subject) => Promise<Subject>;
  deleteMany: () => Promise<void>;
}
