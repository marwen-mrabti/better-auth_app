import env from "@/lib/env";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(env.NEON_DATABASE_URL);
export const db = drizzle({ client: sql });
