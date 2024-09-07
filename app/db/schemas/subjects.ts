import { relations } from "drizzle-orm";
import { integer, numeric, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { courses } from "./courses";

export const subjects = pgTable("subjects", {
  id: uuid("id").primaryKey(),
  subjectName: varchar("subject_name", { length: 10 }).notNull(),
  classHours: integer("class_hours").notNull(),
  progress: numeric("progress", { precision: 4, scale: 1 }),
});

export const subjectsRelations = relations(subjects, ({ many }) => ({
  courses: many(courses),
}));
