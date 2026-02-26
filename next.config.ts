import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/:path*`,
      },
      {
        source: "/api/user/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/user/:path*`,
      },
      {
        source: "/api/tutor/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/tutor/:path*`,
      },
      {
        source: "/api/bookings/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/:path*`,
      },
      {
        source: "/api/reviews/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/:path*`,
      },
      {
        source: "/api/admin/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/admin/:path*`,
      },
    ];
  },
};
export default nextConfig;
