/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['todo.mathieuhoyer.fr', 'localhost:3001'],
    },
  },
};

export default nextConfig;
