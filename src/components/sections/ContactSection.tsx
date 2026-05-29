"use client";

import { motion } from "framer-motion";
import type { ClientData, ContactLink } from "@/lib/types";

const labelByType: Record<ContactLink["type"], string> = {
  line: "LINEで連絡",
  email: "メールで連絡",
  calendly: "日程を予約",
  phone: "電話で連絡",
  form: "フォームから連絡",
};

export default function ContactSection({ data }: { data: ClientData }) {
  const { contact } = data.sections;
  if (!contact || contact.length === 0) return null;

  return (
    <section
      className="relative px-6 sm:px-10 lg:px-16 py-32 sm:py-48 overflow-hidden"
      style={{ background: data.theme.primary, color: "#fafaf7" }}
    >
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
        style={{ background: data.theme.accent }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-20 sm:mb-28">
          <div
            className="font-mono text-[10px] sm:text-xs tracking-[0.4em]"
            style={{ color: data.theme.accent }}
          >
            08 — CONTACT
          </div>
          <div className="font-mono text-[10px] sm:text-xs tracking-[0.4em] opacity-40">
            縁 / REACH OUT
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl sm:text-7xl lg:text-9xl leading-[1.05] mb-12 sm:mb-16 tracking-tight font-medium"
        >
          お話、<br />しませんか。
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-base sm:text-lg opacity-70 mb-16 sm:mb-20 max-w-xl leading-relaxed"
        >
          ご相談・ご質問・取材・登壇依頼など、お気軽にどうぞ。
        </motion.p>

        <div className="space-y-px max-w-3xl" style={{ background: "rgba(250,250,247,0.15)" }}>
          {contact.map((c, i) => (
            <motion.a
              key={i}
              href={c.url}
              target={c.type === "calendly" ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex items-center justify-between px-6 sm:px-10 py-6 sm:py-8 transition-all hover:px-8 sm:hover:px-12"
              style={{ background: data.theme.primary }}
            >
              <div className="flex items-baseline gap-4 sm:gap-8">
                <span
                  className="font-mono text-[10px] tracking-[0.3em] opacity-50"
                  style={{ color: data.theme.accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-xl sm:text-3xl font-light tracking-tight">
                  {c.label || labelByType[c.type]}
                </span>
              </div>
              <span
                className="font-mono text-sm sm:text-base tracking-widest transition-transform group-hover:translate-x-2"
                style={{ color: data.theme.accent }}
              >
                →
              </span>
            </motion.a>
          ))}
        </div>

        <footer className="mt-32 sm:mt-48 pt-12 border-t" style={{ borderColor: "rgba(250,250,247,0.15)" }}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div
                className="font-mono text-[10px] tracking-[0.4em] mb-2"
                style={{ color: data.theme.accent }}
              >
                HITOIRO by goodcast
              </div>
              <div className="font-serif text-lg sm:text-xl">
                あなたの色を、一枚に。
              </div>
            </div>
            <div className="font-mono text-[10px] tracking-[0.3em] opacity-50">
              © {new Date().getFullYear()} {data.name} — ALL RIGHTS RESERVED
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
