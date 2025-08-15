/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  // Enable React Strict Mode for better error detection
  reactStrictMode: true,
  // Enable SWC minification for faster builds
  swcMinify: true,
}

module.exports = nextConfig