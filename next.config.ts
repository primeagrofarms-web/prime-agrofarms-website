import type { NextConfig } from "next";
import path from "node:path";

// Cache the loader path to prevent repeated restarts
const LOADER_PATH = (() => {
  try {
    return require.resolve('orchids-visual-edits/loader.js');
  } catch {
    return '';
  }
})();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  ...(LOADER_PATH ? {
    turbopack: {
      rules: {
        "*.{jsx,tsx}": {
          loaders: [LOADER_PATH]
        }
      }
    }
  } : {})
} as NextConfig;

export default nextConfig;