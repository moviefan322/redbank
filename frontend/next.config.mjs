/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        // Redirect HTTP to HTTPS for redbank.org
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://redbank.org/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
