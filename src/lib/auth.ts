import { sendMagicLinkEmail } from "@/actions/send-magic-link-email";
import { db } from "@/db";
import { account, session, user, verification } from "@/db/schemas/auth-schema";
import env from "@/lib/env";
import { betterAuth, type BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { magicLink } from "better-auth/plugins";

export const auth = betterAuth({
  appName: "auth-playground",

  // database adapter
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user,
      account,
      session,
      verification,
    },
  }),

  // session
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },

  // social providers
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },

  plugins: [
    magicLink({
      expiresIn: 60 * 20, // the link will expire after 20 minutes
      sendMagicLink: async ({ email, token, url }, request) => {
        await sendMagicLinkEmail({ magicLink: url, email });
      },
    }),
    nextCookies(),
  ],
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;
