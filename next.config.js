/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["books.google.pl", "i.gr-assets.com"],
  },
};

module.exports = nextConfig;
