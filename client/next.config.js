/** @type {import('next').NextConfig} */

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "tailwindui.com", "localhost"],
  },
  experimental: {
    esmExternals: "loose",
  },
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${API_URL}/api/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
