"use client";

import SignOutBtn from "@/components/sign-out-btn";
import { Button } from "@/components/ui/button";
import type { Session } from "@/lib/auth";
import Link from "next/link";

export default function AuthBtns({ session }: { session: Session | null }) {
  return !session ? (
    <div className="flex justify-center gap-2">
      <Link href="/sign-in" prefetch={true}>
        <Button variant="default">Sign In</Button>
      </Link>
      <Link href="/sign-up" prefetch={true}>
        <Button variant="outline">Sign Up</Button>
      </Link>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <SignOutBtn />
    </div>
  );
}
