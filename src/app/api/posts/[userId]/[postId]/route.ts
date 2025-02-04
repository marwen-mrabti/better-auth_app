import { db } from "@/db";
import { posts } from "@/db/schemas/post-schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string; postId: string }> },
) {
  try {
    const { userId, postId } = await params;
    if (!userId || !postId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const result = await db
      .delete(posts)
      .where(and(eq(posts.id, postId), eq(posts.userId, userId)));

    if (result.rowCount === 0) {
      throw new Error("Post not found or unauthorized");
    }

    //TODO: delete comments associated with the post

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Could not delete post" },
      { status: 500 },
    );
  }
}
