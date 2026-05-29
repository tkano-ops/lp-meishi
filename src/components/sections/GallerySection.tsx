"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ClientData } from "@/lib/types";

export default function GallerySection({ data }: { data: ClientData }) {
  const { gallery } = data.sections;
  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="relative px-6 sm:px-10 lg:px-16 py-32 sm:py-48">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-16 sm:mb-24">
          <div
            className="font-mono text-[10px] sm:text-xs tracking-[0.4em]"
            style={{ color: data.theme.accent }}
          >
            ✱ FIELD NOTES
          </div>
          <div className="font-mono text-[10px] sm:text-xs tracking-[0.4em] opacity-30">
            場 / ON THE GROUND
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[1.2] mb-20 sm:mb-28 max-w-4xl tracking-tight font-medium"
        >
          現場の温度、<br />学びのリアル。
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-10">
          {gallery.map((item, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={i === 1 ? "md:translate-y-16 lg:translate-y-24" : ""}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.caption ?? ""}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <span
                  className="font-mono text-[10px] tracking-[0.3em] opacity-50"
                  style={{ color: data.theme.accent }}
                >
                  PLATE {String(i + 2).padStart(2, "0")}
                </span>
                {item.caption && (
                  <span className="font-mono text-[10px] tracking-wider opacity-60 text-right max-w-xs">
                    {item.caption}
                  </span>
                )}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
