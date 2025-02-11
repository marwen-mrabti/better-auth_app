import { db } from "@/db";
import { InsertPostSchema, posts, TInsertPost } from "@/db/schemas/post-schema";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const postBody = (await request.json()) as TInsertPost;
    const parsedData = InsertPostSchema.safeParse(postBody);
    if (!parsedData.success) {
      return NextResponse.json(
        {
          message: null,
          error: parsedData.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    await db.insert(posts).values(parsedData.data);

    return NextResponse.json(
      { message: "Post created successfully", error: null },
      { status: 201 },
    );
  } catch (error: unknown) {
    return NextResponse.json({ message: null, error: error }, { status: 500 });
  }
}
