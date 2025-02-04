import { db } from "@/db";
import { posts } from "@/db/schemas/post-schema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

/**
 * @route GET /api/posts
 * @description Fetches all posts for the authenticated user
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await params;
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userPosts = await db.query.posts.findMany({
      where: eq(posts.userId, userId),
      orderBy: desc(posts.createdAt),
    });

    return NextResponse.json({ data: userPosts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not fetch posts" },
      { status: 500 },
    );
  }
}
