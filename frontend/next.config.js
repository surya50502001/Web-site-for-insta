/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "images.unsplash.com",
      "instagram.com",
      "cdn.instagram.com",
      "scontent.cdninstagram.com",
    ],
  },
};

module.exports = nextConfig;
