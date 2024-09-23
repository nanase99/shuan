import type { Subject } from "./subject";

export interface ISubjectRepository {
  findMany: () => Promise<Subject[]>;
  find: (id: string) => Promise<Subject | null>;
  create: (subject: Subject) => Promise<Subject>;
  update: (subject: Subject) => Promise<Subject>;
  delete: (id: string) => Promise<void>;
  deleteMany: () => Promise<void>;
}
