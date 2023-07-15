/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/account",
        destination: "/account/login",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
