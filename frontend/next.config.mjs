/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  async redirects() {
    return [
      // Redirect HTTP to HTTPS for redbank.org
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
          {
            type: 'host',
            value: 'redbank.org',
          },
        ],
        destination: 'https://redbank.org/:path*',
        permanent: true,
      },
      // Redirect HTTP to HTTPS for www.redbank.org
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
          {
            type: 'host',
            value: 'www.redbank.org',
          },
        ],
        destination: 'https://www.redbank.org/:path*',
        permanent: true,
      },
      // Redirect HTTP to HTTPS for redbankoktoberfest.com
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
          {
            type: 'host',
            value: 'redbankoktoberfest.com',
          },
        ],
        destination: 'https://redbankoktoberfest.com/:path*',
        permanent: true,
      },
      // Redirect HTTP to HTTPS for www.redbankoktoberfest.com
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
          {
            type: 'host',
            value: 'www.redbankoktoberfest.com',
          },
        ],
        destination: 'https://www.redbankoktoberfest.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
