import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "cdn.pixabay.com",
      "images.pexels.com",
      "picsum.photos",
      "via.placeholder.com",
      "placehold.co",
      "source.unsplash.com",
      "raw.githubusercontent.com",
      "github.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
      "storage.googleapis.com",
      "imgur.com",
      "i.imgur.com",
      "cdn.jsdelivr.net",
      "assets.vercel.com",
      "vercel.com"
    ],
  },
};

export default nextConfig;
