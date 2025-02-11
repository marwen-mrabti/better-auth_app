import { CreatePostForm } from "@/components/feature/posts/create-post-form";
import PostsList, {
  PostsSkeleton,
  type SearchParams,
} from "@/components/feature/posts/post-list";
import SearchBox, {
  SearchBoxSkeleton,
} from "@/components/feature/posts/search-box";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto max-w-screen-lg px-4">
        <Card className="w-full overflow-clip shadow-lg">
          <CardHeader className="bg-secondary text-secondary-foreground">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="py-6">
            <div className="mb-6">
              <Suspense fallback={<SearchBoxSkeleton />}>
                <SearchBox />
              </Suspense>
            </div>
            <div className="mb-6">
              <CreatePostForm />
            </div>
            <Suspense fallback={<PostsSkeleton />}>
              <PostsList searchParams={searchParams} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
