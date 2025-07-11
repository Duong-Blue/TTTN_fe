import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
        pathname: '/**',
      },
      { // Thêm cấu hình cho CDN hostname
        protocol: 'https',
        hostname: 'cdn.dummyjson.com', // Đây là hostname bị thiếu
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;