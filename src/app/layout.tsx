import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "auth-playground",
  description: "better auth app",
  openGraph: {
    title: "auth-playground",
    description: "auth playground app for better-auth",
    type: "website",
    locale: "en_US",
    siteName: "Better Auth app",
    url: "https://better-auth.vercel.app",
  },
  keywords: ["better auth", "auth", "nextjs", "react", "typescript"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scheme-light dark:scheme-dark">
      <body className={`bg-background text-foreground relative antialiased`}>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
