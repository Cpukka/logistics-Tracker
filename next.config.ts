/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.openstreetmap.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.mapbox.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: true,
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig