import type { ClassHours, Progress, SubjectName } from "../valueObjects";
import { AbstractSubject } from "./abstractSubject";
import type { Course } from "./course";

export class UncompletedSubject extends AbstractSubject {
  private _progress: Progress;

  constructor(
    id: string,
    subjectName: SubjectName,
    classHours: ClassHours,
    courses: Course[],
    progress: Progress,
  ) {
    super(id, subjectName, classHours, courses);
    this._progress = progress;
  }

  get progress(): Progress {
    return this._progress;
  }
}
