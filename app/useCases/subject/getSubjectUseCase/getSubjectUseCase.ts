import type { ISubjectRepository, Subject } from "@/domain/models";

export class GetSubjectUseCase {
  private _subjectRepository: ISubjectRepository;

  constructor(subjectRepository: ISubjectRepository) {
    this._subjectRepository = subjectRepository;
  }

  public getSubjects = async () => {
    return await this._subjectRepository.findMany();
  };
}
