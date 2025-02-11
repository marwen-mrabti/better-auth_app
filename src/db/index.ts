import env from "@/lib/env";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schemas";

const sql = neon(env.NEON_DATABASE_URL);
export const db = drizzle(sql, { schema });
