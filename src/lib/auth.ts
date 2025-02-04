import { db } from "@/db";
import * as schema from "@/db/schemas/auth-schema";
import { RenderedMagicLinkEmail } from "@/email-templates/magic-link-template";
import env from "@/lib/env";
import { betterAuth, type BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { magicLink } from "better-auth/plugins";

export const auth = betterAuth({
  appName: "auth-playground",

  // database adapter
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
    usePlural: true,
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

  account: {
    accountLinking: {
      enabled: true,
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
        //? render email body
        const htmlEmailBody = await RenderedMagicLinkEmail({ magicLink: url });
        //! send email using server action
        // await sendMagicLinkEmail({ email, mailBody: htmlEmailBody });
        //! send email using api route
        const response = await fetch(env.NEXT_PUBLIC_APP_URL + "/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "noreply@auth-playground.com",
            to: email,
            subject: "Login link to your Better-Auth account",
            mailBody: htmlEmailBody,
          }),
        });
        if (response.status !== 200) {
          throw new Error("Failed to send magic link");
        }
      },
    }),
    nextCookies(),
  ],
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;
