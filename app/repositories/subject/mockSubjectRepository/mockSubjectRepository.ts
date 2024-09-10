import { subjects } from "./findMany";

import type { ISubjectRepository } from "@/domain/models";

export class MockSubjectRepository implements ISubjectRepository {
  findMany = async () => {
    return subjects;
  };
}
