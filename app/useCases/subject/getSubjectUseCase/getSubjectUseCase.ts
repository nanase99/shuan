import type { ISubjectRepository } from "@/domain/models";

export class GetSubjectUseCase {
  private _subjectRepository: ISubjectRepository;

  constructor(subjectRepository: ISubjectRepository) {
    this._subjectRepository = subjectRepository;
  }

  public execute = async () => {
    // TODO: ドメインオブジェクトからDTOへ変換して返す
    return await this._subjectRepository.findMany();
  };
}
