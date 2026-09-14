/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  experimental: {
    forceSwcTransforms: false
  },
  images: {
    domains: ['images.unsplash.com']
  }
};

module.exports = nextConfig; 