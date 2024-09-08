import {
  ClassHours,
  CompletedCourse,
  type Course,
  CourseName,
  CourseTag,
  Progress,
  UncompletedCourse,
} from "@/domain/models";
import type { CourseDto } from "./courseDto";

export function toDomainCourse(courseDto: CourseDto): Course {
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
}
