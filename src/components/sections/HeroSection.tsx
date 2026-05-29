"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ClientData } from "@/lib/types";

export default function HeroSection({ data }: { data: ClientData }) {
  const titleLines = data.title.split("、");
  const year = new Date().getFullYear();
  const photo = data.sections.hero.photo;

  return (
    <section
      className="min-h-screen relative overflow-hidden flex flex-col justify-between"
      style={{ background: data.theme.primary, color: "#fafaf7" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${data.theme.accent} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {photo && (
        <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src={photo}
              alt={data.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right, ${data.theme.primary} 0%, ${data.theme.primary}cc 25%, ${data.theme.primary}40 60%, transparent 100%)`,
              }}
            />
            <div className="absolute inset-0 lg:hidden" style={{ background: `${data.theme.primary}80` }} />
          </motion.div>
        </div>
      )}

      <header className="relative z-10 flex justify-between items-start px-6 sm:px-10 lg:px-16 pt-6 sm:pt-10">
        <div className="font-mono text-[10px] sm:text-xs tracking-[0.3em]">
          <div style={{ color: data.theme.accent }}>HITOIRO — ISSUE 01</div>
          <div className="mt-2 opacity-50">FOUNDER PROFILE / {year}</div>
        </div>
        <div className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-right opacity-50">
          <div>{data.slug.toUpperCase()}</div>
          <div className="mt-2">VOL.01</div>
        </div>
      </header>

      <div className="relative z-10 px-6 sm:px-10 lg:px-16 flex-1 flex items-center py-16">
        <div className="max-w-7xl w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-[10px] sm:text-xs tracking-[0.4em] mb-8 opacity-60"
            style={{ color: data.theme.accent }}
          >
            01 — COVER STORY
          </motion.div>
          <h1 className="font-serif font-medium tracking-tight leading-[1.02] text-[14vw] sm:text-[11vw] lg:text-[8.5vw]">
            {titleLines.map((line, i, arr) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.3 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block"
              >
                {line}
                {i < arr.length - 1 ? "、" : ""}
              </motion.span>
            ))}
          </h1>
        </div>
      </div>

      <footer className="relative z-10 px-6 sm:px-10 lg:px-16 pb-8 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="border-t pt-6 sm:pt-8 flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-12"
          style={{ borderColor: "rgba(250,250,247,0.15)" }}
        >
          <div className="flex-1">
            <div
              className="font-mono text-[10px] tracking-[0.35em] mb-3 opacity-60"
              style={{ color: data.theme.accent }}
            >
              FOUNDER & CEO
            </div>
            <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-none">
              {data.name}
            </div>
            {data.nameKana && (
              <div className="font-mono text-[10px] sm:text-xs tracking-[0.3em] mt-3 opacity-50 uppercase">
                {data.nameKana}
              </div>
            )}
          </div>
          <div className="sm:max-w-md sm:text-right text-sm sm:text-base opacity-80 leading-relaxed font-light">
            {data.subtitle}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.4em]"
        >
          SCROLL ↓
        </motion.div>
      </footer>
    </section>
  );
}
