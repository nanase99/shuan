import type { RowState } from "@/features/common/enums";
import type { ClassHours, CourseName } from "@/features/subject/domain/models";

type Args = {
  id: string;
  subjectId: string;
  courseName: CourseName;
  classHours: ClassHours;
  rowState: RowState;
};

export enum CourseTag {
  Uncompleted = "Uncompleted",
  Completed = "Completed",
}

export abstract class AbstractCourse {
  protected readonly _id: string;
  protected _subjectId: string;
  protected _courseName: CourseName;
  protected _classHours: ClassHours;
  protected abstract readonly tag: CourseTag;
  protected _rowState: RowState;

  constructor({ id, subjectId, courseName, classHours, rowState }: Args) {
    this._id = id;
    this._subjectId = subjectId;
    this._courseName = courseName;
    this._classHours = classHours;
    this._rowState = rowState;
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

  get rowState(): RowState {
    return this._rowState;
  }
}
