import { uuidv4 } from "@/libs";
import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const subjects = pgTable("subjects", {
  id: uuid("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  subjectName: varchar("subject_name", { length: 10 }),
  classHours: integer("class_hours"),
});

export type InsertSubjects = typeof subjects.$inferInsert;
export type SelectSubjects = typeof subjects.$inferSelect;
