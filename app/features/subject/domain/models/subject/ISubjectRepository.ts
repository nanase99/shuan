import type { Subject } from "./subject";

export interface ISubjectRepository {
  findMany: () => Promise<{ subjects: Subject[] }>;
}
