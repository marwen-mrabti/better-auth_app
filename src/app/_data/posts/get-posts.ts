import "server-only";

import type { TPost } from "@/db/schemas";
import { auth } from "@/lib/auth";
import env from "@/lib/env";
import { cookies, headers } from "next/headers";

export const getUserPostsBySearchQuery = async ({
  query,
}: {
  query: string | undefined;
}) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return null;
    }

    const apiUrl = `${env.NEXT_PUBLIC_APP_URL}/api/posts`;
    const urlSearchParams = new URLSearchParams();
    if (query) {
      urlSearchParams.append("query", query);
    }

    const cookieStore = await cookies();
    const response = await fetch(`${apiUrl}?${urlSearchParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      credentials: "include",
      next: { tags: ["posts"] },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const { data: posts } = await response.json();
    return posts as TPost[];
  } catch (error) {
    console.error("Error fetching posts", error);
    return null;
  }
};
