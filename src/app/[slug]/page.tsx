import { notFound } from "next/navigation";
import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import type { ClientData } from "@/lib/types";
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
  try {
    const file = path.join(
      process.cwd(),
      "src",
      "data",
      "clients",
      `${slug}.json`
    );
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw) as ClientData;
  } catch {
    return null;
  }
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
  return {
    title: `${client.name}｜${client.title}`,
    description: client.sections.story?.body?.slice(0, 120) ?? client.subtitle,
    openGraph: {
      title: `${client.name}｜${client.title}`,
      description: client.subtitle,
      images: [`/clients/${slug}/og.png`],
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
