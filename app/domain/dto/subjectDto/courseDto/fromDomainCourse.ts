import { type Course, CourseTag } from "@/domain/models";
import type { CourseDto } from "./courseDto";

export function fromDomainCourse(course: Course): CourseDto {
  const propsByType = fromDomainPropsByType(course);
  return {
    id: course.id,
    subjectId: course.subjectId,
    courseName: course.courseName.value,
    classHours: course.classHours.value,
    tag: course.type,
    ...propsByType,
  };
}

function fromDomainPropsByType(course: Course) {
  switch (course.type) {
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
}
