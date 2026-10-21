import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // La raíz "/" muestra el portafolio (public/index.html) sin cambiar la dirección.
  // /admin y /api siguen siendo rutas de la app Next.js.
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/index.html" }],
    };
  },
  // Enlaces antiguos a /portafolio/... llevan a la raíz
  async redirects() {
    return [
      { source: "/portafolio", destination: "/", permanent: true },
      { source: "/portafolio/index.html", destination: "/", permanent: true },
      { source: "/portafolio/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
