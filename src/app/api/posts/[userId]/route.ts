import { db } from "@/db";
import { posts } from "@/db/schemas/post-schema";
import { and, desc, eq, like, or, SQL } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await params;

    const searchParams = request.nextUrl.searchParams;
    const searchQuery = searchParams.get("query")?.trim() || "";

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let whereClause: SQL | undefined = eq(posts.userId, userId);

    if (searchQuery) {
      whereClause = and(
        eq(posts.userId, userId),
        or(
          like(posts.title, `%${searchQuery}%`),
          like(posts.content, `%${searchQuery}%`),
        ),
      );
    }

    const userPosts = await db.query.posts.findMany({
      where: whereClause,
      orderBy: desc(posts.createdAt),
    });

    return NextResponse.json({ data: userPosts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Could not fetch posts" },
      { status: 500 },
    );
  }
}
