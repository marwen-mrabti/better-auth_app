import { LoginForm } from "@/_components/feature/sign-in/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <main className="bg-muted relative isolate flex min-h-dvh items-start justify-center p-6 md:p-12">
      <LoginForm />
    </main>
  );
}
