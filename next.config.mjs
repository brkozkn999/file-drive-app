import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'polished-schnauzer-371.convex.cloud',
          },
        ],
      },
};

export default nextConfig;
