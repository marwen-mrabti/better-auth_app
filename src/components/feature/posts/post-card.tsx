import { DeletePostBtn } from "@/components/feature/posts/delete-post-btn";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TPost } from "@/db/schemas";

export function PostCard({ post }: { post: TPost }) {
  return (
    <Card
      key={post.id}
      className="relative mx-auto max-w-md transition-shadow hover:shadow-sm"
    >
      <CardContent className="p-4">
        <h3 className="text-foreground mb-2 text-lg font-semibold">
          {post.title}
        </h3>
        <p className="text-muted-foreground">{post.content}</p>
        {/* //TODO: add a edit button */}
        <div className="absolute top-2 right-2 flex gap-2">
          <DeletePostBtn postId={post.id} />
        </div>
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
