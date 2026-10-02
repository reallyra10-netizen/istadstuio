import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  //disable dev indicator badge
  devIndicators: false,
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
      "pk_test_YnJhdmUtc3VuYmlyZC0yMDc1LmNsZXJrLmFjY291bnRzLmRldiQ",
    CLERK_SECRET_KEY:
      process.env.CLERK_SECRET_KEY ||
      "sk_test_OyUfBsf7truauBDUsJOdItctQh9f9zTu9t3qt6F5Kb",
  },
};

export default nextConfig;