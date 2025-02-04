"use client";

import AuthBtns from "@/_components/layout/auth-btns";
import { Avatar, AvatarFallback, AvatarImage } from "@/_components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Navigation() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="bg-background sticky top-0 z-100 grid grid-cols-[auto_1fr] place-items-center gap-4 border-b-1 px-4 py-2 md:px-8">
      <h1 className="text-primary text-3xl font-bold">Auth Playground</h1>
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
        {session ? (
          <Avatar className="size-8">
            <AvatarImage
              src={session?.user?.image || ""}
              alt={session?.user?.name}
            />
            <AvatarFallback>
              {session?.user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ) : null}
        <AuthBtns session={session} />
      </nav>
    </header>
  );
}
