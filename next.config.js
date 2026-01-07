/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Config for GitHub Pages (only applies during 'npm run build')
  output: isProd ? 'export' : undefined,
   basePath: '/PathVision-PathVision-IMAS', : undefined,
  assetPrefix: '/PathVision-PathVision-IMAS/',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
}

module.exports = nextConfig
