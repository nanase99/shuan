import type { ISubjectRepository, Subject } from "@/domain/models";

export class InMemorySubjectRepository implements ISubjectRepository {
  private _db: { [id: string]: Subject } = {};

  findMany = async () => {
    return { subjects: Object.values(this._db) };
  };
}
