import env from "@/lib/env";
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schemas/*.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.NEON_DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
