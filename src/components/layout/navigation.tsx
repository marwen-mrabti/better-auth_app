"use client";

import AuthBtns from "@/components/layout/auth-btns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Navigation() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <nav className="flex w-full items-center justify-end gap-4">
        <Link
          href="/"
          prefetch={true}
          className="text-secondary-foreground font-semibold"
        >
          Home
        </Link>
        {/* Skeleton for possible dashboard link */}
        <Skeleton className="h-6 w-20" />
        {/* Skeleton for avatar */}
        <Skeleton className="size-8 rounded-full" />
        {/* Skeleton for auth buttons */}
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[70px]" />{" "}
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex w-full items-center justify-end gap-4">
      <Link
        href="/"
        prefetch={true}
        className="text-secondary-foreground font-semibold"
      >
        Home
      </Link>

      {session && (
        <Link
          href="/dashboard"
          prefetch={true}
          className="text-secondary-foreground font-semibold"
        >
          Dashboard
        </Link>
      )}

      {session && (
        <Avatar className="size-8">
          <AvatarImage
            src={session.user?.image || ""}
            alt={session.user?.name || "User avatar"}
          />
          <AvatarFallback>
            {session.user?.name?.charAt(0).toUpperCase() || ""}
          </AvatarFallback>
        </Avatar>
      )}

      <AuthBtns session={session} />
    </nav>
  );
}
