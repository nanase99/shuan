import type { ClassHours, CourseName, Progress } from "@/models/valueObjects";

export type Course = {
  id: string;
  subjectId: string;
  courseName: CourseName;
  classHours: ClassHours;
  progress: Progress;
};
