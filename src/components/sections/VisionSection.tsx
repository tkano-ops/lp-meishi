"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ClientData } from "@/lib/types";

export default function VisionSection({ data }: { data: ClientData }) {
  const { vision } = data.sections;
  if (!vision) return null;

  return (
    <section
      className="relative px-6 sm:px-10 lg:px-16 py-32 sm:py-56 overflow-hidden"
      style={{ background: "#0a0a0a", color: "#fafaf7" }}
    >
      {vision.backgroundImage && (
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={vision.backgroundImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, #0a0a0aee 0%, #0a0a0acc 50%, ${data.theme.primary}aa 100%)`,
            }}
          />
        </div>
      )}

      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 70% 30%, ${data.theme.accent}40 0%, transparent 50%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-20 sm:mb-32">
          <div
            className="font-mono text-[10px] sm:text-xs tracking-[0.4em]"
            style={{ color: data.theme.accent }}
          >
            06 — VISION
          </div>
          <div className="font-mono text-[10px] sm:text-xs tracking-[0.4em] opacity-40">
            未 / FUTURE
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-xs tracking-[0.4em] opacity-50 mb-8"
          style={{ color: data.theme.accent }}
        >
          MANIFESTO
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[1.1] mb-16 sm:mb-24 max-w-5xl tracking-tight font-medium"
        >
          {vision.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-serif text-xl sm:text-2xl lg:text-3xl leading-[1.9] whitespace-pre-wrap font-light max-w-4xl opacity-95"
        >
          {vision.body}
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="h-px mt-20 sm:mt-32 max-w-md"
          style={{ background: data.theme.accent }}
        />

        <div className="mt-8 font-mono text-[10px] tracking-[0.4em] opacity-60">
          — {data.name.toUpperCase()}
        </div>
      </div>
    </section>
  );
}
