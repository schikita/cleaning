/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  productionBrowserSourceMaps: false, // ускоряет сборку
  async rewrites() {
    return [
      { source: "/favicon.ico", destination: "/api/favicon" },
      { source: "/favicon.png", destination: "/api/favicon" },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    //ppr: true,
  },
}

module.exports = nextConfig
