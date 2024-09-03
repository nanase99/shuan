import type { Unit } from "../unit";

export type Subject = {
  id: string;
  subjectName: string;
  timeHours: number;
  units: Unit[];
};
