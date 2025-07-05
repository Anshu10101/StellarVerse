/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['apod.nasa.gov'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apod.nasa.gov',
        pathname: '/apod/image/**',
      },
    ],
  },
}

module.exports = nextConfig
