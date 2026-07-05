import { notFound } from "next/navigation";
import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import { loadClient } from "@/lib/loadClient";
import HeroSection from "@/components/sections/HeroSection";
import StorySection from "@/components/sections/StorySection";
import ServiceSection from "@/components/sections/ServiceSection";
import AchievementSection from "@/components/sections/AchievementSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import VisionSection from "@/components/sections/VisionSection";
import GallerySection from "@/components/sections/GallerySection";
import SnsLinksSection from "@/components/sections/SnsLinksSection";
import ContactSection from "@/components/sections/ContactSection";

// セルフ編集の保存時に revalidatePath で即時更新するので、これは保険としての定期再生成
export const revalidate = 3600;

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
