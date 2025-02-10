"use client";

import AuthBtns from "@/components/layout/auth-btns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Navigation() {
  const { data: session, isPending } = authClient.useSession();

  return (
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
  );
}
