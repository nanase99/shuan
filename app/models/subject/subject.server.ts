import { db } from "@/db/drizzle";
import { subject } from "@/db/schemas";

export async function getSubjects() {
  return db.select().from(subject);
}
