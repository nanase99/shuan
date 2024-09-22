import type {
  ISubjectRepository,
  Subject,
} from "@/features/subject/domain/models";
import { SubjectDto } from "../domain/dto";

export class InMemorySubjectRepository implements ISubjectRepository {
  private _db: { [id: string]: SubjectDto } = {};

  findMany = async () => {
    const subjects = Object.values(this._db).map((dto) =>
      SubjectDto.toDomain(dto),
    );
    return { subjects };
  };

  create = async (subject: Subject) => {
    const subjectDto = SubjectDto.fromDomain(subject);
    this._db[subjectDto.id] = subjectDto;
    return SubjectDto.toDomain(this._db[subjectDto.id]);
  };

  deleteMany = async () => {
    this._db = {};
  };
}
