import { uuidv4 } from "@/libs";
import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const subject = pgTable("subjects", {
  id: uuid("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  subjectName: varchar("subject_name", { length: 10 }).notNull(),
  classHours: integer("class_hours").notNull(),
});

export type InsertSubject = typeof subject.$inferInsert;
export type SelectSubject = typeof subject.$inferSelect;
