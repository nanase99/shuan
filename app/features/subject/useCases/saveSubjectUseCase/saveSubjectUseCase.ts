import type { RowState } from "@/features/common/enums";
import { SubjectDto } from "@/features/subject/domain/dto";
import type {
  CourseTag,
  ISubjectRepository,
  SubjectTag,
} from "@/features/subject/domain/models";

export type SaveSubjectCommand = {
  id: string;
  subjectName: string;
  classHours: number;
  courses: {
    id: string;
    subjectId: string;
    courseName: string;
    classHours: number;
    progress: number;
    tag: CourseTag;
    rowState: RowState;
  }[];
  progress: number;
  tag: SubjectTag;
};

export class SaveSubjectUseCase {
  private _repository: ISubjectRepository;

  constructor(repository: ISubjectRepository) {
    this._repository = repository;
  }

  public execute = async (command: SubjectDto) => {
    const subject = SubjectDto.toDomain(command);
    const res = await this._repository.save(subject);
    const subjectsDto = SubjectDto.fromDomain(res);

    return subjectsDto;
  };
}
