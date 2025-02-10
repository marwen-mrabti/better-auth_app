"use client";

import { createPost } from "@/_actions/post-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Form from "next/form";
import { useActionState, useEffect, useState } from "react";

export function CreatePostForm() {
  const [state, action, isPending] = useActionState(createPost, null);
  const [addNewPost, setAddNewPost] = useState(false);

  useEffect(() => {
    if (!isPending && !state?.errors) {
      setAddNewPost(false);
    }
  }, [isPending, state]);

  return (
    <div className="mx-auto mt-8 max-w-md">
      <div className="mb-2 flex w-full items-center justify-end">
        <Button
          className=""
          disabled={isPending}
          onClick={() => setAddNewPost((prev) => !prev)}
        >
          {addNewPost ? (
            "Cancel"
          ) : (
            <span className="flex items-center gap-2">
              Add Post
              <Plus className="h-6 w-6" />
            </span>
          )}
        </Button>
      </div>
      <Card
        className={cn(
          "shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)]",
          "transition-all duration-300 ease-linear",
          "h-0 opacity-0 starting:open:h-auto starting:open:opacity-100",
          "divide-muted divide-y-2",
          {
            "h-auto opacity-100": addNewPost,
          },
        )}
      >
        <CardHeader className="mb-2 py-4">
          <CardTitle>Add Post</CardTitle>
          <CardDescription className="text-red-400">
            {state?.message ?? ""}
          </CardDescription>
        </CardHeader>
        <Form action={action} className="space-y-4">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                defaultValue={state?.inputs?.title ?? ""}
                autoComplete="title"
                required
                // minLength={5}
                maxLength={20}
              />
              {state?.errors?.title && (
                <p className="text-sm text-red-500">{state.errors.title}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                defaultValue={state?.inputs?.content ?? ""}
                required
                minLength={10}
                maxLength={1000}
              />
              {state?.errors?.content && (
                <p className="text-sm text-red-500">{state.errors.content}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
