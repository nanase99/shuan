import {
  ClassHours,
  CompletedCourse,
  type Course,
  CourseName,
  CourseTag,
  Progress,
  UncompletedCourse,
} from "@/features/subject/domain/models";

export class CourseDto {
  public readonly id: string;
  public readonly subjectId: string;
  public readonly courseName: string;
  public readonly classHours: number;
  public readonly progress: number;
  public readonly tag: string;

  constructor(courseDto: CourseDto) {
    this.id = courseDto.id;
    this.subjectId = courseDto.subjectId;
    this.courseName = courseDto.courseName;
    this.classHours = courseDto.classHours;
    this.progress = courseDto.progress;
    this.tag = courseDto.tag;
  }

  public static fromDomain = (course: Course): CourseDto => {
    const propsByTag = (() => {
      switch (course.tag) {
        case CourseTag.Uncompleted: {
          return { progress: course.progress.value };
        }
        case CourseTag.Completed: {
          return { progress: course.classHours.value };
        }
        default: {
          const unreachable: never = course;
          return unreachable;
        }
      }
    })();

    return new CourseDto({
      id: course.id,
      subjectId: course.subjectId,
      courseName: course.courseName.value,
      classHours: course.classHours.value,
      tag: course.tag,
      ...propsByTag,
    });
  };

  public static toDomain = (courseDto: CourseDto): Course => {
    switch (courseDto.tag) {
      case CourseTag.Uncompleted: {
        return new UncompletedCourse({
          id: courseDto.id,
          subjectId: courseDto.subjectId,
          courseName: new CourseName(courseDto.courseName),
          classHours: new ClassHours(courseDto.classHours),
          progress: new Progress(courseDto.progress),
        });
      }
      case CourseTag.Completed: {
        return new CompletedCourse({
          id: courseDto.id,
          subjectId: courseDto.subjectId,
          courseName: new CourseName(courseDto.courseName),
          classHours: new ClassHours(courseDto.classHours),
        });
      }
      default: {
        throw new Error("invalid course.type");
      }
    }
  };
}
