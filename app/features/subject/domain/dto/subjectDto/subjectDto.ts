import type { CourseDto } from "../courseDto";

export type SubjectDto = {
  id: string;
  subjectName: string;
  classHours: number;
  courses: CourseDto[];
  progress: number;
  tag: string;
};
