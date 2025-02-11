"use server";

import { InsertPostSchema } from "@/db/schemas";
import { auth } from "@/lib/auth";
import env from "@/lib/env";
import { revalidateTag } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createPost(prevState: unknown, formData: FormData) {
  const rawData = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  const parsedData = InsertPostSchema.omit({
    userId: true,
  }).safeParse(rawData);

  if (!parsedData.success) {
    const fieldErrors = parsedData.error.flatten().fieldErrors;
    const formattedErrors: Record<string, string> = {};
    // Format errors for each field
    for (const [field, errors] of Object.entries(fieldErrors)) {
      if (errors) {
        formattedErrors[field] = errors.join(", ");
      }
    }
    return {
      errors: formattedErrors,
      message: null,
      inputs: rawData,
    };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  const cookieStore = await cookies();
  const response = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/posts/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: cookieStore.toString(),
    },
    credentials: "include",
    body: JSON.stringify({
      userId: session.user.id,
      title: parsedData.data.title,
      content: parsedData.data.content,
    }),
  });

  if (response.status !== 201) {
    const error = await response.json();
    console.log("create post error:", error);
    return {
      errors: null,
      message: "Failed to create post",
      inputs: rawData,
    };
  }

  revalidateTag("posts");
}

export const deletePost = async (postId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  const cookieStore = await cookies();
  const response = await fetch(
    `${env.NEXT_PUBLIC_APP_URL}/api/posts/${postId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      credentials: "include",
    },
  );

  if (response.status !== 200) {
    const error = await response.json();
    console.log("delete post error:", error);
    return {
      errors: null,
      message: "Failed to delete post",
      inputs: null,
    };
  }

  revalidateTag("posts");
};
