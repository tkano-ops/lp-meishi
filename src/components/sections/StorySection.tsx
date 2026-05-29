"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ClientData } from "@/lib/types";

function parseCareer(item: string): { marker: string; text: string } {
  const ageMatch = item.match(/^(\d+)歳[：:]\s*(.+)$/);
  if (ageMatch) return { marker: ageMatch[1], text: ageMatch[2] };
  const labelMatch = item.match(/^(現在|事業)[：:]\s*(.+)$/);
  if (labelMatch) return { marker: labelMatch[1], text: labelMatch[2] };
  return { marker: "—", text: item };
}

export default function StorySection({ data }: { data: ClientData }) {
  const { story } = data.sections;

  return (
    <section className="relative px-6 sm:px-10 lg:px-16 py-32 sm:py-48">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-20 sm:mb-32">
          <div
            className="font-mono text-[10px] sm:text-xs tracking-[0.4em]"
            style={{ color: data.theme.accent }}
          >
            02 — STORY
          </div>
          <div className="font-mono text-[10px] sm:text-xs tracking-[0.4em] opacity-30">
            起 / ORIGIN
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.15] mb-20 sm:mb-28 max-w-5xl tracking-tight font-medium"
        >
          {story.heading}
        </motion.h2>

        <div className="grid md:grid-cols-12 gap-8 lg:gap-16 mb-24 sm:mb-32">
          <div className="md:col-span-3">
            <div
              className="font-mono text-[10px] tracking-[0.35em] opacity-50 sticky top-8"
              style={{ color: data.theme.accent }}
            >
              ESSAY — 01
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1 }}
            className="md:col-span-9 md:col-start-4 lg:col-span-8 lg:col-start-5"
          >
            <p
              className="font-serif text-lg sm:text-xl lg:text-2xl leading-[2] whitespace-pre-wrap font-light"
              style={{ color: data.theme.primary }}
            >
              {story.body}
            </p>
          </motion.div>
        </div>

        {story.breakoutImage && (
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-24 sm:mb-32 -mx-6 sm:-mx-10 lg:-mx-16"
          >
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full">
              <Image
                src={story.breakoutImage.src}
                alt={story.breakoutImage.caption ?? ""}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            {story.breakoutImage.caption && (
              <figcaption className="px-6 sm:px-10 lg:px-16 mt-4 flex items-baseline justify-between gap-6">
                <span
                  className="font-mono text-[10px] tracking-[0.3em] opacity-50"
                  style={{ color: data.theme.accent }}
                >
                  PLATE 01
                </span>
                <span className="font-mono text-[10px] sm:text-xs tracking-wider opacity-60 text-right max-w-md">
                  {story.breakoutImage.caption}
                </span>
              </figcaption>
            )}
          </motion.figure>
        )}

        {story.career && story.career.length > 0 && (
          <div className="border-t pt-16 sm:pt-20" style={{ borderColor: `${data.theme.primary}20` }}>
            <div className="flex items-baseline justify-between mb-12 sm:mb-16">
              <div
                className="font-mono text-[10px] sm:text-xs tracking-[0.4em]"
                style={{ color: data.theme.accent }}
              >
                CAREER — CHRONOLOGY
              </div>
              <div className="font-mono text-[10px] tracking-[0.3em] opacity-40">
                {String(story.career.length).padStart(2, "0")} ENTRIES
              </div>
            </div>

            <ul className="space-y-0">
              {story.career.map((item, i) => {
                const { marker, text } = parseCareer(item);
                return (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.06 }}
                    className="grid grid-cols-12 gap-4 sm:gap-8 items-baseline py-6 sm:py-8 border-b group hover:bg-current/[0.02] transition-colors"
                    style={{ borderColor: `${data.theme.primary}15` }}
                  >
                    <div className="col-span-3 sm:col-span-2 font-mono text-[10px] tracking-[0.3em] opacity-40">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div
                      className="col-span-4 sm:col-span-3 font-serif text-3xl sm:text-5xl lg:text-6xl font-light leading-none"
                      style={{ color: data.theme.accent }}
                    >
                      {marker}
                    </div>
                    <div className="col-span-12 sm:col-span-7 col-start-1 sm:col-start-6 text-base sm:text-lg leading-relaxed mt-2 sm:mt-0">
                      {text}
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
