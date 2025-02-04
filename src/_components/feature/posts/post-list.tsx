import { CardSkeleton, PostCard } from "@/_components/feature/posts/post-card";
import { getUserPosts } from "@/_data/posts";
import { TPost } from "@/db/schemas";
import { type Session } from "@/lib/auth";

export default async function PostList({ session }: { session: Session }) {
  const posts = (await getUserPosts({ userId: session.user.id })) as
    | TPost[]
    | null;

  return (
    <div>
      {posts === null || posts.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-xl">You haven&apos;t created any posts yet.</p>
          <p className="mt-2 text-sm text-gray-400">
            Start by creating your first post below
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export function PostsSkeleton() {
  return (
    <div className="w-full space-y-4">
      {[1, 2, 3].map((_, index) => (
        <div key={index} className="flex w-full items-center space-x-4">
          <CardSkeleton />
        </div>
      ))}
    </div>
  );
}
