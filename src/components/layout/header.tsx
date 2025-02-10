import Navigation from "@/components/layout/navigation";

export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-100 grid grid-cols-[auto_1fr] place-items-center gap-4 border-b-1 px-4 py-2 md:px-8">
      <h1 className="text-primary text-3xl font-bold">Auth Playground</h1>
      <Navigation />
    </header>
  );
}
