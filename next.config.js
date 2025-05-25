/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    // Optimize for development
    optimizePackageImports: ['lucide-react'],
  },
  // Disable source maps in development to reduce overlay errors
  productionBrowserSourceMaps: false,
  // Suppress hydration warnings in development
  compiler: {
    removeConsole: false,
  },
}

module.exports = nextConfig 