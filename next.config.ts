import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['maps.googleapis.com', 'places.googleapis.com', 'commons.wikimedia.org', 'images.unsplash.com'],
  },
};

export default nextConfig;
