import { TPost } from "@/db/schemas";
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
