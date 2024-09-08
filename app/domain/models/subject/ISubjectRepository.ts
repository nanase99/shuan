import type { Subject } from "./subject";

export interface ISubjectRepository {
  findMany: () => Promise<{ subjects: Subject[] }>;
  save: (subject: Subject) => Promise<{ subject: Subject }>;
  delete: (id: string) => Promise<void>;
}
