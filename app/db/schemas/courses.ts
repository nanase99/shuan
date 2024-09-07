import { relations } from "drizzle-orm";
import { integer, numeric, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { subjects } from "./subjects";

export const courses = pgTable("courses", {
  id: uuid("id").primaryKey(),
  subjectId: uuid("subject_id").references(() => subjects.id),
  courseName: varchar("course_name", { length: 10 }),
  classHours: integer("class_hours"),
  progress: numeric("progress", { precision: 4, scale: 1 }),
});

export const coursesRelations = relations(courses, ({ one }) => ({
  subject: one(subjects, {
    fields: [courses.subjectId],
    references: [subjects.id],
  }),
}));
