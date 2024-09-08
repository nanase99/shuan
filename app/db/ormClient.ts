import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schemas";

const sql = neon(process.env.DATABASE_URL!);
export const ormClient = drizzle(sql, { schema });
