import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // 将来、外部ストレージ／CMS（例: Vercel Blob, Cloudinary）の画像を使う場合は
    // ここにホストを追加する。現状はローカル(/public/clients/*)のみ。
    remotePatterns: [
      // { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
