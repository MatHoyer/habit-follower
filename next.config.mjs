/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['todo.mathieuhoyer.fr', 'localhost:3000'],
    },
  },
};

export default nextConfig;
