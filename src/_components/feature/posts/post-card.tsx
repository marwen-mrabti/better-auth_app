import { Card, CardContent } from "@/_components/ui/card";
import { Skeleton } from "@/_components/ui/skeleton";
import { TPost } from "@/db/schemas";

export function PostCard({ post }: { post: TPost }) {
  return (
    <Card
      key={post.id}
      className="mx-auto max-w-md transition-shadow hover:shadow-sm"
    >
      <CardContent className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-800">
          {post.title}
        </h3>
        <p className="text-gray-600">{post.content}</p>
      </CardContent>
    </Card>
  );
}

export function CardSkeleton() {
  return (
    <Card className="mx-auto w-full max-w-md transition-shadow hover:shadow-sm">
      <CardContent className="space-y-2 p-4">
        <Skeleton className="mb-2 h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );
}
