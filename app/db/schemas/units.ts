import { uuidv4 } from "@/libs";
import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const unit = pgTable("units", {
  id: uuid("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  unitName: varchar("unit_name", { length: 10 }),
  classHours: integer("class_hours"),
});

export type InsertUnit = typeof unit.$inferInsert;
export type SelectUnit = typeof unit.$inferSelect;
