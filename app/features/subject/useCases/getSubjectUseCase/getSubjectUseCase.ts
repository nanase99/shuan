import { SubjectDto } from "@/features/subject/domain/dto";
import type { ISubjectRepository } from "@/features/subject/domain/models";

export class GetSubjectUseCase {
  private _repository: ISubjectRepository;

  constructor(repository: ISubjectRepository) {
    this._repository = repository;
  }

  public execute = async () => {
    const res = await this._repository.findMany();

    const subjectsDto = res.subjects.map((subject) =>
      SubjectDto.fromDomain(subject),
    );

    return { subjects: subjectsDto };
  };
}
