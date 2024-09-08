import type {
  ClassHours,
  Progress,
  SubjectName,
} from "@/domain/models/valueObjects";
import { AbstractSubject, SubjectTag } from "./abstractSubject";
import type { Course } from "./course";

type Args = {
  id: string;
  subjectName: SubjectName;
  classHours: ClassHours;
  courses: Course[];
  progress: Progress;
};

export class UncompletedSubject extends AbstractSubject {
  private _progress: Progress;
  public override readonly type = SubjectTag.Uncompleted;

  constructor({ id, subjectName, classHours, courses, progress }: Args) {
    super({ id, subjectName, classHours, courses });
    this._progress = progress;
  }

  get progress(): Progress {
    return this._progress;
  }
}
