import env from "@/lib/env";
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schemas/*.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.NEON_DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
