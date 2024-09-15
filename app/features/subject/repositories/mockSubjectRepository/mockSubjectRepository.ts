import type { ISubjectRepository } from "@/features/subject/domain/models";
import { subjects } from "./findMany";

export class MockSubjectRepository implements ISubjectRepository {
  findMany = async () => {
    return subjects;
  };
}
