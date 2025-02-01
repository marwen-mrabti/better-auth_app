import Navigation from "@/components/navigation";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative antialiased`}
      >
        <Navigation />
        {children}

        <Toaster />
      </body>
    </html>
  );
}
