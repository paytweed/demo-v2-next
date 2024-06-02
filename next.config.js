/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@paytweed/core-react', '@paytweed/core-js'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tweed-demo.web.app',
      },
      {
        protocol: 'https',
        hostname: 's6.imgcdn.dev',
      },
    ],
  },
}

module.exports = nextConfig
