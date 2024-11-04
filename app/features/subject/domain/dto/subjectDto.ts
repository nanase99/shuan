import {
  ClassHours,
  CompletedSubject,
  Progress,
  type Subject,
  SubjectName,
  SubjectTag,
  UncompletedSubject,
} from "../models";
import { CourseDto } from "./courseDto";

export class SubjectDto {
  public readonly id: string;
  public readonly subjectName: string;
  public readonly classHours: number;
  public readonly courses: CourseDto[];
  public readonly progress: number;
  public readonly tag: string;

  private constructor(subjectDto: SubjectDto) {
    this.id = subjectDto.id;
    this.subjectName = subjectDto.subjectName;
    this.classHours = subjectDto.classHours;
    this.courses = subjectDto.courses;
    this.progress = subjectDto.progress;
    this.tag = subjectDto.tag;
  }

  public static fromDomain(subject: Subject): SubjectDto {
    const propsByTag = (() => {
      switch (subject.tag) {
        case SubjectTag.Uncompleted: {
          return { progress: subject.progress.value };
        }
        case SubjectTag.Completed: {
          return { progress: subject.classHours.value };
        }
        default: {
          const unreachable: never = subject;
          return unreachable;
        }
      }
    })();

    return new SubjectDto({
      id: subject.id,
      subjectName: subject.subjectName.value,
      classHours: subject.classHours.value,
      courses: subject.courses.map((course) => CourseDto.fromDomain(course)),
      tag: subject.tag,
      ...propsByTag,
    });
  }

  public static toDomain(subjectDto: SubjectDto): Subject {
    switch (subjectDto.tag) {
      case SubjectTag.Uncompleted: {
        return new UncompletedSubject({
          id: subjectDto.id,
          subjectName: new SubjectName(subjectDto.subjectName),
          classHours: new ClassHours(subjectDto.classHours),
          progress: new Progress(subjectDto.progress),
          courses: subjectDto.courses.map((course) =>
            CourseDto.toDomain(course),
          ),
        });
      }
      case SubjectTag.Completed: {
        return new CompletedSubject({
          id: subjectDto.id,
          subjectName: new SubjectName(subjectDto.subjectName),
          classHours: new ClassHours(subjectDto.classHours),
          courses: subjectDto.courses.map((course) =>
            CourseDto.toDomain(course),
          ),
        });
      }
      default: {
        throw new Error("invalid course.type");
      }
    }
  }
}
