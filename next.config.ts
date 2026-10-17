import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // La raíz del sitio abre el portafolio (HTML estático en public/portafolio)
  async redirects() {
    return [
      { source: "/", destination: "/portafolio/index.html", permanent: false },
      { source: "/portafolio", destination: "/portafolio/index.html", permanent: false },
    ];
  },
};

export default nextConfig;
