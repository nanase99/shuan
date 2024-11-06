import { SubjectDto } from "@/features/subject/domain/dto";
import type { ISubjectRepository } from "../../repositories/ISubjectRepository";

export class GetSubjectUseCase {
  private _repository: ISubjectRepository;

  constructor(repository: ISubjectRepository) {
    this._repository = repository;
  }

  public execute = async () => {
    const res = await this._repository.findMany();

    const subjectsDto = res.map((subject) => SubjectDto.fromDomain(subject));

    return subjectsDto;
  };
}
