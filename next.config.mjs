/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    return config;
  },
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
