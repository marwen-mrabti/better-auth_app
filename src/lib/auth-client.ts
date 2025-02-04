import env from "@/lib/env";
import { magicLinkClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_APP_URL,
  retry: {
    type: "linear",
    attempts: 3,
    delay: 1000,
  },
  plugins: [magicLinkClient()],
});
