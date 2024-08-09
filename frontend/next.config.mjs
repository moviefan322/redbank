/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Redirect HTTP to HTTPS for any domain
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: `https://${req.headers.host}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
