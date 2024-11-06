import type { Subject } from "../domain/models/subject/subject";

export interface ISubjectRepository {
  save: (subject: Subject) => Promise<Subject>;
  findMany: () => Promise<Subject[]>;
  find: (id: string) => Promise<Subject | null>;
  delete: (id: string) => Promise<string>;
  deleteMany: () => Promise<void>;
}
