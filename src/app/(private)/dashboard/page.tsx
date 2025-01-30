import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }

  return (
    <main className="container mx-auto flex flex-col items-center justify-center gap-4 py-4">
      <h2 className="text-2xl">Welcome to the dashboard</h2>
      <div className="flex flex-col items-center justify-center gap-4">
        <h3 className="text-xl font-semibold">Welcome {session?.user?.name}</h3>
        <Avatar>
          <AvatarImage
            src={session?.user?.image || ""}
            alt={session?.user?.name}
          />
          <AvatarFallback>
            {session?.user?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </main>
  );
}
