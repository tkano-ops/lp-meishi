"use client";

import { motion } from "framer-motion";
import type { ClientData } from "@/lib/types";

export default function ServiceSection({ data }: { data: ClientData }) {
  const { services } = data.sections;
  if (!services || services.length === 0) return null;

  return (
    <section
      className="relative px-6 sm:px-10 lg:px-16 py-32 sm:py-48"
      style={{ background: data.theme.surface ?? `${data.theme.primary}06` }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-20 sm:mb-32">
          <div
            className="font-mono text-[10px] sm:text-xs tracking-[0.4em]"
            style={{ color: data.theme.accent }}
          >
            03 — SERVICES
          </div>
          <div className="font-mono text-[10px] sm:text-xs tracking-[0.4em] opacity-30">
            事 / BUSINESS
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.15] mb-20 sm:mb-28 max-w-4xl tracking-tight font-medium"
        >
          手がける、<br />仕事のかたち。
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-px" style={{ background: `${data.theme.primary}15` }}>
          {services.map((service, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="relative p-8 sm:p-12 lg:p-16 group transition-colors duration-500"
              style={{ background: data.theme.background }}
            >
              <div className="flex items-baseline justify-between mb-8 sm:mb-12">
                <div
                  className="font-mono text-[10px] tracking-[0.4em] opacity-50"
                  style={{ color: data.theme.accent }}
                >
                  SERVICE / {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  className="font-serif text-6xl sm:text-7xl lg:text-8xl font-light opacity-10 leading-none group-hover:opacity-30 transition-opacity duration-500"
                  style={{ color: data.theme.accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <h3
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium mb-6 leading-tight tracking-tight"
                style={{ color: data.theme.primary }}
              >
                {service.title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed opacity-75 max-w-md">
                {service.description}
              </p>
              <div
                className="mt-8 sm:mt-12 h-px w-12 transition-all duration-500 group-hover:w-24"
                style={{ background: data.theme.accent }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
