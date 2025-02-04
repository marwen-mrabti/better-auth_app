import { CreatePostForm } from "@/_components/feature/posts/create-post-form";
import PostsList, {
  PostsSkeleton,
} from "@/_components/feature/posts/post-list";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return redirect("/sign-in");
  }

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto max-w-screen-lg px-4">
        <Card className="w-full overflow-clip shadow-lg">
          <CardHeader className="bg-secondary text-secondary-foreground">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">
                Welcome back {session.user?.name}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="py-6">
            <div className="mb-6">
              <CreatePostForm />
            </div>
            <Suspense fallback={<PostsSkeleton />}>
              <PostsList session={session} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
