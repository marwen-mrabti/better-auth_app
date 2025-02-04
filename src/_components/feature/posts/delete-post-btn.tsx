"use client";

import { deletePost } from "@/_actions/post-actions";
import { Button } from "@/_components/ui/button";
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
        <Trash2 className="text-destructive h-4 w-4" />
      </Button>
    </Form>
  );
}
