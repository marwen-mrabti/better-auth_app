"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ErrorContext } from "@better-fetch/fetch";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "../../lib/auth-client";

export default function SignOutBtn() {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, setPending] = useState(false);

  const handleOnSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          setPending(true);
        },
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
        onError: (ctx: ErrorContext) => {
          toast({
            title: "logout failed",
            description: ctx.error.message ?? "Something went wrong.",
            variant: "destructive",
          });
        },
      },
    });
    setPending(false);
  };

  return (
    <Button
      variant="destructive"
      disabled={pending}
      className="bg-destructive/90 text-destructive-foreground hover:bg-destructive/80 disabled:cursor-not-allowed disabled:opacity-50"
      onClick={handleOnSignOut}
    >
      {pending ? "logging out..." : "logout"}
    </Button>
  );
}
