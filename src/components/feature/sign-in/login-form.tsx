"use client";

import { DividerWithText } from "@/components/feature/sign-in/divider-with-text";
import MagicLinkLogin, {
  formSchema,
} from "@/components/feature/sign-in/magic-link-login";
import { SocialLoginButton } from "@/components/feature/sign-in/social-login-btn";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { ErrorContext } from "@better-fetch/fetch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

export const LoginForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loginGithubPending, setLoginGithubPending] = useState(false);
  const [loginGooglePending, setLoginGooglePending] = useState(false);
  const [loginEmailPending, setLoginEmailPending] = useState(false);

  // handle social login with google and github
  const handleSocialLogin = async (provider: "github" | "google") => {
    await authClient.signIn.social(
      {
        provider,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          if (provider === "github") setLoginGithubPending(true);
          if (provider === "google") setLoginGooglePending(true);
        },
        onSuccess: async () => {
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
  const handleSendMagicLink = async (
    values: z.infer<typeof formSchema>,
    reset: () => void,
  ) => {
    const { email } = values;

    await authClient.signIn.magicLink(
      {
        email,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          setLoginEmailPending(true);
        },
        onSuccess: async () => {
          toast({
            title: "magic link sent",
            description:
              "Please check your email. You will receive a login link.",
            variant: "default",
            className: "bg-green-700 text-white",
            duration: 3000,
          });
          setLoginEmailPending(false);
          reset();
          router.refresh();
        },
        onError: (ctx: ErrorContext) => {
          toast({
            title: "login failed",
            description: ctx.error.message ?? "Something went wrong.",
            variant: "destructive",
            duration: 3000,
          });
        },
      },
    );
    setLoginEmailPending(false);
  };

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
            <div className="mb-8 flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground text-balance">
                Login to your account
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <SocialLoginButton
                provider="google"
                disabled={
                  loginGooglePending || loginGithubPending || loginEmailPending
                }
                isPending={loginGooglePending}
                onClick={handleSocialLogin}
              />
              <SocialLoginButton
                provider="github"
                disabled={
                  loginGithubPending || loginGooglePending || loginEmailPending
                }
                isPending={loginGithubPending}
                onClick={handleSocialLogin}
              />
            </div>

            <DividerWithText text="Or continue with" />

            <MagicLinkLogin
              disabled={
                loginGithubPending || loginGooglePending || loginEmailPending
              }
              isPending={loginEmailPending}
              onSubmit={handleSendMagicLink}
            />

            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
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
