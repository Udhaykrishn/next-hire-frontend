import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async headers() {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";
    let apiOrigin = "http://localhost:3001";
    try {
      apiOrigin = new URL(apiUrl).origin;
    } catch {
      // Fallback to default if NEXT_PUBLIC_API_URL is relative or invalid
    }

    const wsOrigin = apiOrigin.replace(/^http/, "ws");

    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com/gsi/client https://maps.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://accounts.google.com/gsi/style https://fonts.googleapis.com https://api.fontshare.com",
      "img-src 'self' blob: data: https://images.unsplash.com https://i.pravatar.cc https://*.pravatar.cc https://lh3.googleusercontent.com https://*.googleusercontent.com https://maps.googleapis.com https://*.googleapis.com https://*.gstatic.com https://*.google.com https://*.ggpht.com https://*.amazonaws.com",
      "font-src 'self' data: https://fonts.gstatic.com https://cdn.fontshare.com",
      `connect-src 'self' ${apiOrigin} ${wsOrigin} https://accounts.google.com/gsi/ https://maps.googleapis.com https://*.googleapis.com https://*.gstatic.com https://*.amazonaws.com`,
      "frame-src 'self' https://accounts.google.com/gsi/ https://accounts.google.com/o/oauth2/ https://*.google.com",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: cspDirectives,
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
