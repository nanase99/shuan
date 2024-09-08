import type { ClassHours, CourseName } from "@/domain/models/valueObjects";

export abstract class AbstractCourse {
  protected readonly _id: string;
  protected _subjectId: string;
  protected _courseName: CourseName;
  protected _classHours: ClassHours;

  constructor(
    id: string,
    subjectId: string,
    courseName: CourseName,
    classHours: ClassHours,
  ) {
    this._id = id;
    this._subjectId = subjectId;
    this._courseName = courseName;
    this._classHours = classHours;
  }

  get id(): string {
    return this._id;
  }

  get subjectId(): string {
    return this._subjectId;
  }

  get courseName(): CourseName {
    return this._courseName;
  }

  get classHours(): ClassHours {
    return this._classHours;
  }
}
