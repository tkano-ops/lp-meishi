"use client";

import { motion } from "framer-motion";
import { onPrimary, type ClientData } from "@/lib/types";

export default function AchievementSection({ data }: { data: ClientData }) {
  const { achievements } = data.sections;
  if (!achievements || achievements.length === 0) return null;

  return (
    <section
      className="relative px-6 sm:px-10 lg:px-16 py-32 sm:py-48 overflow-hidden"
      style={{ background: data.theme.primary, color: onPrimary(data.theme) }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${data.theme.accent} 1px, transparent 1px)`,
          backgroundSize: "100% 64px",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-20 sm:mb-32">
          <div
            className="font-mono text-[10px] sm:text-xs tracking-[0.4em]"
            style={{ color: data.theme.accent }}
          >
            04 — TRACK RECORD
          </div>
          <div className="font-mono text-[10px] sm:text-xs tracking-[0.4em] opacity-40">
            実 / PROOF
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.15] mb-20 sm:mb-28 max-w-4xl tracking-tight font-medium"
        >
          数字と、<br />足跡。
        </motion.h2>

        <ul className="space-y-0">
          {achievements.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="grid grid-cols-12 gap-4 sm:gap-8 items-baseline py-6 sm:py-8 border-b group transition-colors hover:bg-white/[0.03]"
              style={{ borderColor: "rgba(250,250,247,0.12)" }}
            >
              <div
                className="col-span-2 sm:col-span-1 font-mono text-[10px] sm:text-xs tracking-[0.3em] opacity-50"
                style={{ color: data.theme.accent }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="col-span-10 sm:col-span-8">
                <p className="font-serif text-lg sm:text-2xl lg:text-3xl font-light leading-snug tracking-tight">
                  {item.label}
                </p>
                {item.detail && (
                  <p className="text-sm opacity-60 mt-2 leading-relaxed">
                    {item.detail}
                  </p>
                )}
              </div>
              <div className="col-span-12 sm:col-span-3 sm:text-right text-xs opacity-40 font-mono tracking-[0.2em] mt-2 sm:mt-0">
                {item.date ?? "—"}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
