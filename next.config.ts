import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. Without it, Next infers the root
  // from the nearest lockfile and walks up into the home directory (which on
  // this machine also holds a lockfile), producing a build warning.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
