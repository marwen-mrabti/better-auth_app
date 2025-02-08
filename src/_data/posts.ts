import type { TPost } from "@/db/schemas";
import env from "@/lib/env";

export const getUserPosts = async ({ userId }: { userId: string }) => {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_APP_URL}/api/posts/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["posts"] },
      },
    );

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

export const getUserPostsBySearchQuery = async ({
  userId,
  query,
}: {
  userId: string;
  query: string | undefined;
}) => {
  try {
    const apiUrl = `${env.NEXT_PUBLIC_APP_URL}/api/posts/${userId}`;
    const urlSearchParams = new URLSearchParams();
    if (query) {
      urlSearchParams.append("query", query);
    }

    const response = await fetch(`${apiUrl}?${urlSearchParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
