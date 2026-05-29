import { notFound } from "next/navigation";
import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import { clientDataSchema, type ClientData } from "@/lib/types";
import HeroSection from "@/components/sections/HeroSection";
import StorySection from "@/components/sections/StorySection";
import ServiceSection from "@/components/sections/ServiceSection";
import AchievementSection from "@/components/sections/AchievementSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import VisionSection from "@/components/sections/VisionSection";
import GallerySection from "@/components/sections/GallerySection";
import SnsLinksSection from "@/components/sections/SnsLinksSection";
import ContactSection from "@/components/sections/ContactSection";

async function loadClient(slug: string): Promise<ClientData | null> {
  let raw: string;
  try {
    const file = path.join(
      process.cwd(),
      "src",
      "data",
      "clients",
      `${slug}.json`
    );
    raw = await fs.readFile(file, "utf-8");
  } catch {
    // ファイルが無い → 404 扱い
    return null;
  }

  // 実行時バリデーション：型に反する手書きJSONはここで弾く
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.error(`[loadClient] ${slug}.json の JSON 構文が不正です`);
    return null;
  }

  const result = clientDataSchema.safeParse(parsed);
  if (!result.success) {
    console.error(
      `[loadClient] ${slug}.json がスキーマに違反しています:\n` +
        JSON.stringify(result.error.flatten(), null, 2)
    );
    return null;
  }
  return result.data;
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "src", "data", "clients");
  try {
    const files = await fs.readdir(dir);
    return files
      .filter((f) => f.endsWith(".json"))
      .map((f) => ({ slug: f.replace(/\.json$/, "") }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const client = await loadClient(slug);
  if (!client) return { title: "Not Found" };

  const m = client.meta;
  const title = m?.ogTitle ?? `${client.name}｜${client.title}`;
  const description =
    m?.ogDescription ??
    client.sections.story?.body?.slice(0, 120) ??
    client.subtitle;

  // meta.ogImage を JSON に明示した場合はそれを優先。
  // 未指定なら opengraph-image.tsx（動的生成）が自動で使われる。
  const explicitImages = m?.ogImage ? [m.ogImage] : undefined;

  return {
    title: `${client.name}｜${client.title}`,
    description,
    keywords: m?.keywords,
    openGraph: {
      title,
      description,
      type: "profile",
      ...(explicitImages ? { images: explicitImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(explicitImages ? { images: explicitImages } : {}),
    },
  };
}

export default async function ClientLPPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const client = await loadClient(slug);
  if (!client) notFound();

  return (
    <main
      style={{
        background: client.theme.background,
        color: client.theme.text ?? client.theme.primary,
      }}
      className="min-h-screen"
    >
      <HeroSection data={client} />
      <StorySection data={client} />
      <ServiceSection data={client} />
      <GallerySection data={client} />
      <AchievementSection data={client} />
      <TestimonialSection data={client} />
      <VisionSection data={client} />
      <SnsLinksSection data={client} />
      <ContactSection data={client} />
    </main>
  );
}
