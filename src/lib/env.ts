import { createEnv } from "@t3-oss/env-nextjs";
import { StandardSchemaV1 } from "node_modules/zod/lib/standard-schema";
import { z } from "zod";

const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: z
      .string()
      .min(32, { message: "secret must be at least 32 characters long" }),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),

    SMTP_HOST: z.string(),
    SMTP_PORT: z.coerce.number().positive().int(),
    SMTP_USER: z.string(),
    SMTP_PASS: z.string(),

    NEON_DATABASE_URL: z
      .string()
      .url()
      .refine((url) => url.startsWith("postgresql://neondb"), {
        message: "invalid database url",
      }),
  },

  client: {
    NEXT_PUBLIC_BETTER_AUTH_URL: z.string().url(),
  },

  runtimeEnv: {
    NEON_DATABASE_URL: process.env.NEON_DATABASE_URL,
    NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,

    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
  },

  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,

  onValidationError: (issues: readonly StandardSchemaV1.Issue[]) => {
    console.error(
      "❌ Invalid environment variables:",
      Object.fromEntries(
        issues.map((issue) => [issue?.path?.join(".") ?? "", issue.message]),
      ),
    );
    process.exit(1);
  },
  // Called when server variables are accessed on the client.
  onInvalidAccess: (variable: string) => {
    throw new Error(
      "❌ Attempted to access a server-side environment variable on the client",
    );
  },
});

export default env;
