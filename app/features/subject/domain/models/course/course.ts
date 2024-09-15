import type { CompletedCourse } from "./completedCourse";
import type { UncompletedCourse } from "./uncompletedCourse";

export type Course = UncompletedCourse | CompletedCourse;
