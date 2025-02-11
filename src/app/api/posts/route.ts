import { db } from "@/db";
import { posts } from "@/db/schemas/post-schema";
import { auth } from "@/lib/auth";
import { and, desc, eq, like, or, SQL } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized from api" },
        { status: 401 },
      );
    }

    const userId = session.user.id;
    const searchParams = request.nextUrl.searchParams;
    const searchQuery = searchParams.get("query")?.trim() || "";

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
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "Could not fetch posts" },
      { status: 500 },
    );
  }
}
