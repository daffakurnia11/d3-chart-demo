/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "https://ecologies-api.staging.iavtest.com/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
