import { magicLinkClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  retry: {
    type: "linear",
    attempts: 3,
    delay: 1000,
  },
  plugins: [magicLinkClient()],
});
