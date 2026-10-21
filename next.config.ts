import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // "/" lo sirve src/app/route.ts (portafolio + configuración del panel /admin).
  // Enlaces antiguos a /portafolio/... llevan a la raíz.
  async redirects() {
    return [
      { source: "/portafolio", destination: "/", permanent: true },
      { source: "/portafolio/index.html", destination: "/", permanent: true },
      { source: "/portafolio/:path*", destination: "/:path*", permanent: true },
      { source: "/index.html", destination: "/", permanent: false, has: [{ type: "header", key: "accept", value: "(?<a>.*text/html.*)" }] },
    ];
  },
};

export default nextConfig;
