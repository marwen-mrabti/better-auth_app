"use client";

import { deletePost } from "@/app/_actions/post-actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Form from "next/form";
import { useActionState } from "react";

export function DeletePostBtn({ postId }: { postId: string }) {
  const [state, action, isPending] = useActionState(
    () => deletePost(postId),
    null,
  );

  return (
    <Form action={action}>
      <Button variant="ghost" type="submit" disabled={isPending}>
        {isPending ? (
          <span className="border-accent border-t-accent-foreground h-4 w-4 animate-spin rounded-full border-2 bg-transparent" />
        ) : (
          <Trash2 className="text-destructive h-4 w-4" />
        )}
        <span className="sr-only">Delete post</span>
      </Button>
    </Form>
  );
}
