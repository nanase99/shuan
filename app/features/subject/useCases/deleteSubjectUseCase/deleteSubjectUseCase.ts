import type { ISubjectRepository } from "../../repositories/ISubjectRepository";

export type DeleteSubjectCommand = string;

export class DeleteSubjectUseCase {
  private _repository: ISubjectRepository;

  constructor(repository: ISubjectRepository) {
    this._repository = repository;
  }

  public execute = async (id: DeleteSubjectCommand) => {
    const res = await this._repository.delete(id);

    return res;
  };
}
