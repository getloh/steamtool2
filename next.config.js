/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'media.steampowered.com/**',
      },
      {
        protocol: 'https',
        hostname: '**.steamstatic.com/**',
      },
    ],
    domains: ["steamstatic.com"],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
