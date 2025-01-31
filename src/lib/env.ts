import { z, ZodError } from "zod";

const envSchema = z.object({
  BETTER_AUTH_URL: z.string().url(),
  BETTER_AUTH_SECRET: z
    .string()
    .min(32, { message: "secret must be at least 32 characters long" }),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),

  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number().positive().int(),
  SMTP_EMAIL: z.string().email(),
  SMTP_PASSWORD: z.string(),

  TURSO_DATABASE_URL: z
    .string()
    .url()
    .refine((url) => url.startsWith("libsql://"), {
      message: "invalid database url",
    }),
  TURSO_AUTH_TOKEN: z.string(),
});

export type T_Env = z.infer<typeof envSchema>;
let env: T_Env;
try {
  env = envSchema.parse(process.env);
} catch (error: unknown) {
  if (error instanceof ZodError) {
    console.error(
      "❌ Invalid environment variables:",
      error.flatten().fieldErrors,
    );
    throw new Error("Invalid environment variables");
  }
  process.exit(1);
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends T_Env {}
  }
}

export default env;
