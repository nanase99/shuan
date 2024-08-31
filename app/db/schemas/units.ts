import { uuidv4 } from "@/libs";
import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const units = pgTable("units", {
  id: uuid("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  unitName: varchar("unit_name", { length: 10 }),
  classHours: integer("class_hours"),
});

export type InsertUnits = typeof units.$inferInsert;
export type SelectUnits = typeof units.$inferSelect;
