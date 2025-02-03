import type { NextConfig } from "next";

import "@/lib/env";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
