import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Default locale lives at /fr. Send the bare root there.
      { source: "/", destination: "/fr", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      // Clean placeholders until real screenshots are dropped into /public/images.
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
