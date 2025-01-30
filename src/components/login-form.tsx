"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { ErrorContext } from "@better-fetch/fetch";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LoginForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const router = useRouter();
  const { toast } = useToast();
  const [LoginGithubPending, setLoginGithubPending] = useState(false);
  const [LoginGooglePending, setLoginGooglePending] = useState(false);

  // handle social login with google and github
  const handleSocialLogin = async (provider: "github" | "google") => {
    await authClient.signIn.social(
      {
        provider,
      },
      {
        onRequest: () => {
          if (provider === "github") setLoginGithubPending(true);
          if (provider === "google") setLoginGooglePending(true);
        },
        onSuccess: async () => {
          router.push("/dashboard");
          router.refresh();
        },
        onError: (ctx: ErrorContext) => {
          toast({
            title: "login failed",
            description: ctx.error.message ?? "Something went wrong.",
            variant: "destructive",
          });
        },
      },
    );
    if (provider === "github") setLoginGithubPending(false);
    if (provider === "google") setLoginGooglePending(false);
  };

  // handle sign in with email

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6",
        className,
      )}
      {...props}
    >
      <Card className="w-full max-w-sm overflow-hidden">
        <CardContent className="grid grid-cols-1 px-2 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground text-balance">
                Login to your account
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Button
                variant="outline"
                className="flex w-full items-center disabled:cursor-not-allowed disabled:opacity-80"
                onClick={() => handleSocialLogin("google")}
                disabled={LoginGooglePending || LoginGithubPending}
              >
                <Image
                  src="./google.svg"
                  alt="Image"
                  width={40}
                  height={40}
                  className="size-6"
                />
                <span className="">Login with Google</span>
                {LoginGooglePending && (
                  <span className="border-t-primary border-muted-foreground size-6 animate-spin rounded-full border-2 bg-transparent"></span>
                )}
              </Button>
              <Button
                variant="outline"
                className="flex w-full items-center disabled:cursor-not-allowed disabled:opacity-80"
                onClick={() => handleSocialLogin("github")}
                disabled={LoginGithubPending || LoginGooglePending}
              >
                <Image
                  src="./github.svg"
                  alt="Image"
                  width={40}
                  height={40}
                  className="size-6"
                />
                <span className="">Login with Github</span>
                {LoginGithubPending && (
                  <span className="border-t-primary border-muted-foreground size-6 animate-spin rounded-full border-2 bg-transparent"></span>
                )}
              </Button>
            </div>

            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>

            <form className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={LoginGooglePending || LoginGithubPending}
              >
                send magic link
              </Button>
            </form>

            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground hover:[&_a]:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};
