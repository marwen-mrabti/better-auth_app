"use client";

import AuthBtns from "@/components/auth-btns";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Navigation() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="grid grid-cols-[auto_1fr] place-items-center gap-4 border-b-1 px-4 py-2">
      <h1 className="text-primary text-3xl font-bold">Better-Auth</h1>
      <nav className="flex w-full items-center justify-end gap-4">
        <Link
          href="/"
          prefetch={true}
          className="text-secondary-foreground font-semibold"
        >
          Home
        </Link>
        {isPending ? null : session ? (
          <>
            <Link
              href="/dashboard"
              prefetch={true}
              className="text-secondary-foreground font-semibold"
            >
              Dashboard
            </Link>
          </>
        ) : null}
        <AuthBtns session={session} />
      </nav>
    </header>
  );
}
