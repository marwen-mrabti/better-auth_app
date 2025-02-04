"use client";

import { createPost } from "@/_actions/post-actions";
import { Button } from "@/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Textarea } from "@/_components/ui/textarea";
import Form from "next/form";
import { useActionState } from "react";

export function CreatePostForm() {
  const [state, action, isPending] = useActionState(createPost, null);

  return (
    <div className="mx-auto mt-8 max-w-md">
      <Card className="shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)]">
        <CardHeader>
          <CardTitle>Add Post</CardTitle>
          <CardDescription className="text-red-400">
            {state?.message ?? ""}
          </CardDescription>
        </CardHeader>
        <Form action={action} className="space-y-4">
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                defaultValue={state?.inputs?.title ?? ""}
                autoComplete="title"
                required
                minLength={5}
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
