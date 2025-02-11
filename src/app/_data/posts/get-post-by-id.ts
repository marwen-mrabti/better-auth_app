import "server-only";

import type { TPost } from "@/db/schemas";
import env from "@/lib/env";
import { cookies } from "next/headers";

export const getPostById = async ({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) => {
  try {
    const apiUrl = `${env.NEXT_PUBLIC_APP_URL}/api/posts/${postId}`;

    const cookieStore = await cookies();
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      credentials: "include",
      next: { tags: ["posts", postId] },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }

    const { data: post } = await response.json();
    return post as TPost;
  } catch (error) {
    console.error("Error fetching post", error);
    return null;
  }
};
