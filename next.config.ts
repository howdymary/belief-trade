import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/belief-trade',
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
