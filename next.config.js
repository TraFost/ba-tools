/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  images: {
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
