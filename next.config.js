/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jyxwxdxjdshypymisxeo.supabase.co",
        pathname: "/storage/**",
      },
    ],
  },
}

module.exports = nextConfig
