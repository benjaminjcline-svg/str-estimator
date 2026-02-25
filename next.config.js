/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_PAYMENTS_MODE: process.env.PAYMENTS_MODE || "waitlist",
  },
};

module.exports = nextConfig;
