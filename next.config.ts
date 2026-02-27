import type { NextConfig } from "next";

const API_URL =
  process.env.API_URL || "https://skill-server-application.vercel.app";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/api/auth/:path*", destination: `${API_URL}/api/auth/:path*` },
      { source: "/api/user/:path*", destination: `${API_URL}/api/user/:path*` },
      {
        source: "/api/tutor/:path*",
        destination: `${API_URL}/api/tutor/:path*`,
      },
      {
        source: "/api/bookings/:path*",
        destination: `${API_URL}/api/bookings/:path*`,
      },
      {
        source: "/api/reviews/:path*",
        destination: `${API_URL}/api/reviews/:path*`,
      },
      {
        source: "/api/admin/:path*",
        destination: `${API_URL}/api/admin/:path*`,
      },
    ];
  },
};

export default nextConfig;
