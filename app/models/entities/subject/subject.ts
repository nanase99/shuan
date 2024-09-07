import type { ClassHours, Progress, SubjectName } from "@/models/valueObjects";
import type { Course } from "./course";

export type Subject = {
  id: string;
  subjectName: SubjectName;
  classHours: ClassHours;
  progress: Progress;
  units: Course[];
};
