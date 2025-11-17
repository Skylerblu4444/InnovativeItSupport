/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images: {
    // allow images from common CDN if you add any
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com']
  }
};

module.exports = nextConfig;
