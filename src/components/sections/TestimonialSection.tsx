"use client";

import { motion } from "framer-motion";
import type { ClientData } from "@/lib/types";

export default function TestimonialSection({ data }: { data: ClientData }) {
  const { testimonials } = data.sections;
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="relative px-6 sm:px-10 lg:px-16 py-32 sm:py-48">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-20 sm:mb-32">
          <div
            className="font-mono text-[10px] sm:text-xs tracking-[0.4em]"
            style={{ color: data.theme.accent }}
          >
            05 — VOICES
          </div>
          <div className="font-mono text-[10px] sm:text-xs tracking-[0.4em] opacity-30">
            声 / TESTIMONY
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.15] mb-20 sm:mb-28 max-w-4xl tracking-tight font-medium"
        >
          託された、<br />ことば。
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-px" style={{ background: `${data.theme.primary}15` }}>
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="relative p-10 sm:p-14 lg:p-16"
              style={{ background: data.theme.surface ?? `${data.theme.primary}06` }}
            >
              <div
                className="font-serif text-7xl leading-none mb-6 opacity-40"
                style={{ color: data.theme.accent }}
              >
                &ldquo;
              </div>
              <blockquote
                className="font-serif text-lg sm:text-xl leading-[1.9] mb-10 font-light"
                style={{ color: data.theme.primary }}
              >
                {t.quote}
              </blockquote>
              <figcaption className="border-t pt-6" style={{ borderColor: `${data.theme.primary}20` }}>
                <div className="font-medium text-sm">{t.author}</div>
                {t.authorTitle && (
                  <div className="opacity-60 text-xs mt-1 font-mono tracking-wider">
                    {t.authorTitle}
                  </div>
                )}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
