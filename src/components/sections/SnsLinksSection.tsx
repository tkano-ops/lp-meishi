"use client";

import { motion } from "framer-motion";
import type { ClientData, SnsLink } from "@/lib/types";

const labelMap: Record<SnsLink["platform"], string> = {
  x: "X",
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  note: "note",
  website: "Website",
};

export default function SnsLinksSection({ data }: { data: ClientData }) {
  const { sns } = data.sections;
  if (!sns || sns.length === 0) return null;

  return (
    <section className="relative px-6 sm:px-10 lg:px-16 py-32 sm:py-48">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-20 sm:mb-28">
          <div
            className="font-mono text-[10px] sm:text-xs tracking-[0.4em]"
            style={{ color: data.theme.accent }}
          >
            07 — CONNECT
          </div>
          <div className="font-mono text-[10px] sm:text-xs tracking-[0.4em] opacity-30">
            繋 / NETWORK
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.15] mb-16 sm:mb-24 max-w-4xl tracking-tight font-medium"
        >
          各SNSで、<br />ご縁を続けよう。
        </motion.h2>

        <ul className="divide-y" style={{ borderColor: `${data.theme.primary}15` }}>
          {sns.map((link, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              style={{ borderColor: `${data.theme.primary}15` }}
              className="border-t last:border-b"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between py-6 sm:py-8 transition-colors hover:bg-current/[0.03]"
              >
                <div className="flex items-baseline gap-6 sm:gap-12">
                  <span
                    className="font-mono text-[10px] tracking-[0.3em] opacity-40 w-6"
                    style={{ color: data.theme.accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight transition-transform group-hover:translate-x-2">
                    {link.label ?? labelMap[link.platform]}
                  </span>
                </div>
                <span
                  className="font-mono text-xs sm:text-sm tracking-widest opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ color: data.theme.accent }}
                >
                  →
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
