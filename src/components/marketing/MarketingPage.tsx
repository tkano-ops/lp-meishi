"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { oneTimePlans, monthlyPlans } from "@/data/pricing";

const EASE = [0.16, 1, 0.3, 1] as const;

// 「色」を象徴する多色パレット（モノクロ基調への差し色）
const SPECTRUM = ["#e94560", "#f0a500", "#2ec4b6", "#3a86ff", "#8338ec"];

function SectionLabel({ no, en, jp }: { no: string; en: string; jp: string }) {
  return (
    <div className="flex items-start justify-between mb-12 sm:mb-20">
      <div className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-[var(--color-hitoiro-ink)]">
        {no} — {en}
      </div>
      <div className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-[var(--color-hitoiro-mute)]">
        {jp}
      </div>
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────────────── 1. Hero ───────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden px-6 sm:px-10 lg:px-16">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-hitoiro-ink) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* 多色のにじみ */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{
          background:
            "conic-gradient(from 90deg, #e94560, #f0a500, #2ec4b6, #3a86ff, #8338ec, #e94560)",
        }}
      />

      <header className="relative z-10 flex justify-between items-center pt-6 sm:pt-10">
        <div className="font-mono text-[10px] sm:text-xs tracking-[0.3em]">
          HITOIRO
          <span className="text-[var(--color-hitoiro-mute)]"> by goodcast</span>
        </div>
        <a
          href="#contact"
          className="font-mono text-[10px] sm:text-xs tracking-[0.3em] border border-current rounded-full px-4 py-2 hover:bg-[var(--color-hitoiro-ink)] hover:text-[var(--color-hitoiro-paper)] transition-colors"
        >
          相談する
        </a>
      </header>

      <div className="relative z-10 flex-1 flex items-center py-20">
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-[var(--color-hitoiro-mute)] mb-8"
          >
            完全オーダーメイド LP型デジタル名刺
          </motion.p>
          <h1 className="font-serif font-medium tracking-tight leading-[1.05] text-[15vw] sm:text-[12vw] lg:text-[9vw]">
            {["あなたの色を、", "一枚に。"].map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.25 + i * 0.15, ease: EASE }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 text-base sm:text-lg lg:text-xl leading-relaxed text-[var(--color-hitoiro-mute)] max-w-xl"
          >
            NFCカードをかざすだけで、あなた専用のランディングページが立ち上がる。
            テンプレートでは出せない「その人らしさ」を、一枚の名刺に。
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="bg-[var(--color-hitoiro-ink)] text-[var(--color-hitoiro-paper)] px-8 py-4 rounded-full text-sm tracking-wider hover:opacity-90 transition-opacity"
            >
              無料で相談する →
            </a>
            <a
              href="#showcase"
              className="border border-current px-8 py-4 rounded-full text-sm tracking-wider hover:bg-black/[0.04] transition-colors"
            >
              制作実績を見る
            </a>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 pb-8 font-mono text-[9px] tracking-[0.4em] text-[var(--color-hitoiro-mute)]">
        SCROLL ↓
      </div>
    </section>
  );
}

/* ───────────────────────── 2. Problem ───────────────────────── */
function Problem() {
  const problems = [
    {
      n: "01",
      title: "後で見返したら、誰だっけ。",
      body: "もらった名刺の束。名前と顔と仕事が、一週間で曖昧になる。",
    },
    {
      n: "02",
      title: "紙一枚に、情報が収まらない。",
      body: "肩書き・実績・SNS・想い。本当に伝えたいことは、紙には載らない。",
    },
    {
      n: "03",
      title: "印象に、残らない。",
      body: "みんな同じレイアウト。あなたの「らしさ」は、どこにも出ていない。",
    },
  ];
  return (
    <section className="px-6 sm:px-10 lg:px-16 py-32 sm:py-48">
      <div className="max-w-7xl mx-auto">
        <SectionLabel no="01" en="THE PROBLEM" jp="課題 / PAIN" />
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.15] mb-20 sm:mb-28 max-w-3xl tracking-tight font-medium">
            その名刺、
            <br />
            あなたを語れていますか。
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-px bg-black/10">
          {problems.map((p, i) => (
            <Reveal
              key={p.n}
              delay={i * 0.1}
              className="bg-[var(--color-hitoiro-paper)] p-8 sm:p-12"
            >
              <div className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-hitoiro-mute)] mb-8">
                {p.n}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-5 leading-snug">
                {p.title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[var(--color-hitoiro-mute)]">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 3. Solution ───────────────────────── */
function Solution() {
  const steps = [
    {
      n: "STEP 01",
      title: "かざす",
      body: "スマホにNFCカードをタッチ。アプリも、QR読み取りの手間もいらない。",
    },
    {
      n: "STEP 02",
      title: "ひらく",
      body: "一瞬で、あなた専用のLPが立ち上がる。物語のように、人柄が伝わる。",
    },
    {
      n: "STEP 03",
      title: "つながる",
      body: "SNS・予約・連絡先までワンタップ。出会いが、その場でご縁になる。",
    },
  ];
  return (
    <section
      className="px-6 sm:px-10 lg:px-16 py-32 sm:py-48 text-[var(--color-hitoiro-paper)]"
      style={{ background: "var(--color-hitoiro-ink)" }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionLabel no="02" en="THE SOLUTION" jp="体験 / EXPERIENCE" />
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.15] mb-20 sm:mb-28 max-w-3xl tracking-tight font-medium">
            かざせば、
            <br />
            物語がはじまる。
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-12 sm:gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12}>
              <div
                className="font-mono text-[10px] tracking-[0.35em] mb-6"
                style={{ color: SPECTRUM[i] }}
              >
                {s.n}
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-medium mb-5">
                {s.title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed opacity-70">
                {s.body}
              </p>
              <div
                className="mt-8 h-px w-12"
                style={{ background: SPECTRUM[i] }}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 4. Values ───────────────────────── */
function Values() {
  const values = [
    { jp: "出会いを、忘れない。", en: "MEMORABLE", body: "物語として記憶に残る。名前だけの名刺で終わらせない。" },
    { jp: "らしさを、伝える。", en: "AUTHENTIC", body: "完全オーダーメイド。あなたの色そのものをデザインする。" },
    { jp: "第一印象を、変える。", en: "STRIKING", body: "かざした瞬間の驚き。それ自体が話のきっかけになる。" },
    { jp: "自分を売るを、簡単に。", en: "EFFORTLESS", body: "渡すだけ。営業も自己紹介も、カード一枚に任せられる。" },
  ];
  return (
    <section className="px-6 sm:px-10 lg:px-16 py-32 sm:py-48">
      <div className="max-w-7xl mx-auto">
        <SectionLabel no="03" en="VALUE" jp="価値 / WHY HITOIRO" />
        <div className="grid sm:grid-cols-2 gap-px bg-black/10">
          {values.map((v, i) => (
            <Reveal
              key={v.en}
              delay={i * 0.08}
              className="bg-[var(--color-hitoiro-paper)] p-10 sm:p-16 group"
            >
              <div
                className="font-mono text-[10px] tracking-[0.4em] mb-8"
                style={{ color: SPECTRUM[i % SPECTRUM.length] }}
              >
                0{i + 1} — {v.en}
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium mb-6 leading-tight tracking-tight">
                {v.jp}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[var(--color-hitoiro-mute)] max-w-md">
                {v.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 5. Showcase ───────────────────────── */
function Showcase() {
  return (
    <section
      id="showcase"
      className="px-6 sm:px-10 lg:px-16 py-32 sm:py-48"
      style={{ background: "#f2f0ec" }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionLabel no="04" en="SHOWCASE" jp="実績 / WORK" />
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.15] mb-16 sm:mb-20 max-w-3xl tracking-tight font-medium">
            一人ひとり、
            <br />
            違う色になる。
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            href="/kano"
            className="group block border border-black/10 rounded-2xl overflow-hidden bg-[var(--color-hitoiro-paper)] hover:shadow-2xl transition-shadow duration-500 max-w-3xl"
          >
            <div
              className="h-48 sm:h-64 flex items-end p-8 sm:p-10"
              style={{
                background:
                  "linear-gradient(135deg, #0a2540 0%, #0a2540cc 55%, #0ea5e9 100%)",
                color: "#f8fafc",
              }}
            >
              <div>
                <div className="font-mono text-[10px] tracking-[0.35em] opacity-70 mb-2">
                  CASE 01 — FOUNDER
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-medium">
                  加納 斗良士 様
                </div>
              </div>
            </div>
            <div className="p-8 sm:p-10 flex items-center justify-between gap-6">
              <p className="text-sm sm:text-base text-[var(--color-hitoiro-mute)] leading-relaxed">
                海外人材×HRテック起業家。年商10億の事業ストーリーを、一枚のLP名刺に。
              </p>
              <span className="font-mono text-sm tracking-widest shrink-0 transition-transform group-hover:translate-x-1">
                見る →
              </span>
            </div>
          </Link>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 font-mono text-[10px] tracking-[0.3em] text-[var(--color-hitoiro-mute)]">
            ✱ 制作事例は順次公開予定。あなたが、次の一枚に。
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── 6. Pricing ───────────────────────── */
function Pricing() {
  return (
    <section id="pricing" className="px-6 sm:px-10 lg:px-16 py-32 sm:py-48">
      <div className="max-w-7xl mx-auto">
        <SectionLabel no="05" en="PRICING" jp="料金 / PLANS" />
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.15] mb-6 max-w-3xl tracking-tight font-medium">
            制作費＋月額で、
            <br />
            育てていく。
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-hitoiro-mute)] mb-16 sm:mb-24 max-w-2xl leading-relaxed">
            初期制作費（売り切り）に加え、公開後も育て続けるための月額保守。
            作って終わりにしないのが、ヒトイロの約束です。
          </p>
        </Reveal>

        {/* 制作費 */}
        <div className="font-mono text-[10px] tracking-[0.4em] text-[var(--color-hitoiro-mute)] mb-8">
          INITIAL — 制作費（売り切り）
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {oneTimePlans.map((plan, i) => (
            <Reveal
              key={plan.id}
              delay={i * 0.08}
              className={`relative rounded-2xl p-8 sm:p-10 flex flex-col ${
                plan.recommended
                  ? "text-[var(--color-hitoiro-paper)]"
                  : "border border-black/10 bg-[var(--color-hitoiro-paper)]"
              }`}
            >
              {plan.recommended && (
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-2xl -z-10"
                  style={{ background: "var(--color-hitoiro-ink)" }}
                />
              )}
              {plan.recommended && (
                <div
                  className="absolute -top-3 left-8 px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.2em] text-[var(--color-hitoiro-ink)]"
                  style={{ background: SPECTRUM[1] }}
                >
                  人気
                </div>
              )}
              <div className="font-serif text-2xl font-medium mb-1">
                {plan.name}
              </div>
              <div
                className={`text-sm mb-6 ${
                  plan.recommended
                    ? "opacity-70"
                    : "text-[var(--color-hitoiro-mute)]"
                }`}
              >
                {plan.tagline}
              </div>
              <div className="font-serif text-4xl font-medium mb-8 tracking-tight">
                {plan.priceLabel}
              </div>
              <ul className="space-y-3 text-sm leading-relaxed flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span style={{ color: SPECTRUM[i % SPECTRUM.length] }}>—</span>
                    <span
                      className={plan.recommended ? "opacity-90" : ""}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* 月額保守 */}
        <div className="font-mono text-[10px] tracking-[0.4em] text-[var(--color-hitoiro-mute)] mb-8">
          MONTHLY — 月額保守（必須）
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {monthlyPlans.map((plan, i) => (
            <Reveal
              key={plan.id}
              delay={i * 0.08}
              className="rounded-2xl border border-black/10 bg-[var(--color-hitoiro-paper)] p-8 flex flex-col"
            >
              <div className="flex items-baseline justify-between mb-1">
                <div className="font-serif text-xl font-medium">{plan.name}</div>
                {plan.recommended && (
                  <span
                    className="text-[10px] font-mono tracking-[0.2em]"
                    style={{ color: SPECTRUM[3] }}
                  >
                    おすすめ
                  </span>
                )}
              </div>
              <div className="text-xs text-[var(--color-hitoiro-mute)] mb-5">
                {plan.tagline}
              </div>
              <div className="font-serif text-2xl font-medium mb-6 tracking-tight">
                {plan.priceLabel}
              </div>
              <ul className="space-y-2.5 text-sm leading-relaxed flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3 text-[var(--color-hitoiro-mute)]">
                    <span style={{ color: SPECTRUM[(i + 2) % SPECTRUM.length] }}>
                      ＋
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-xs text-[var(--color-hitoiro-mute)] leading-relaxed">
          ※ 表示価格は税抜。制作中の修正は2回まで無料。着手時に半金、納品時に残金をお支払いいただきます。
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────── 7. Comparison ───────────────────────── */
function Comparison() {
  const rows = [
    { label: "デザインの自由度", paper: "△ 定型", link: "△ テンプレート", hitoiro: "◎ 完全オーダーメイド" },
    { label: "伝えられる情報量", paper: "× 限られる", link: "○ リンク集", hitoiro: "◎ 物語として展開" },
    { label: "第一印象・体験", paper: "△ ふつう", link: "△ 一覧表示", hitoiro: "◎ かざす驚き" },
    { label: "公開後の更新・保守", paper: "× 刷り直し", link: "○ 自分で編集", hitoiro: "◎ 月額でプロが対応" },
    { label: "あなたらしさ", paper: "× 横並び", link: "△ 共通UI", hitoiro: "◎ あなたの色" },
  ];
  return (
    <section
      className="px-6 sm:px-10 lg:px-16 py-32 sm:py-48"
      style={{ background: "#f2f0ec" }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionLabel no="06" en="COMPARISON" jp="比較 / VS" />
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-6xl leading-[1.15] mb-16 sm:mb-20 tracking-tight font-medium">
            なぜ、ヒトイロか。
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b-2 border-black/15 text-left">
                <th className="py-5 pr-4 font-mono text-[10px] tracking-[0.2em] text-[var(--color-hitoiro-mute)] font-normal"></th>
                <th className="py-5 px-4 font-normal text-sm text-[var(--color-hitoiro-mute)]">紙の名刺</th>
                <th className="py-5 px-4 font-normal text-sm text-[var(--color-hitoiro-mute)]">リンク集サービス</th>
                <th
                  className="py-5 px-4 font-serif text-base font-medium rounded-t-lg"
                  style={{ background: "var(--color-hitoiro-ink)", color: "var(--color-hitoiro-paper)" }}
                >
                  ヒトイロ
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-black/10">
                  <td className="py-5 pr-4 text-sm font-medium">{r.label}</td>
                  <td className="py-5 px-4 text-sm text-[var(--color-hitoiro-mute)]">{r.paper}</td>
                  <td className="py-5 px-4 text-sm text-[var(--color-hitoiro-mute)]">{r.link}</td>
                  <td
                    className="py-5 px-4 text-sm font-medium"
                    style={{ background: "rgba(10,10,10,0.04)" }}
                  >
                    {r.hitoiro}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── 8. FAQ ───────────────────────── */
function Faq() {
  const faqs = [
    {
      q: "NFCカードはどんなスマホでも使えますか？",
      a: "近年のiPhone・AndroidのほとんどがNFC対応です。読み取れない端末向けにQRコードも標準で発行するため、どなたにも確実にLPをお渡しできます。",
    },
    {
      q: "制作期間はどのくらいですか？",
      a: "ヒアリングから公開まで、標準で2〜4週間ほどです。素材（写真・実績）のご準備状況により前後します。",
    },
    {
      q: "自分で文章や写真を用意できません。",
      a: "ご安心ください。プロによるヒアリングとコピーライティングが含まれます。話していただいた内容から、私たちが「らしさ」を言葉にします。",
    },
    {
      q: "月額保守は必須ですか？",
      a: "はい。LPの公開・URL維持・セキュリティ更新を継続するため、月額保守をお願いしています。作って終わりにせず、育て続けるためのプランです。",
    },
    {
      q: "公開後に内容を変更できますか？",
      a: "可能です。月額プランに応じて、テキスト修正・写真差し替え・セクション追加などに対応します。",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-6 sm:px-10 lg:px-16 py-32 sm:py-48">
      <div className="max-w-3xl mx-auto">
        <SectionLabel no="07" en="FAQ" jp="疑問 / Q&A" />
        <div className="border-t border-black/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-black/10">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 sm:py-8 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl font-medium leading-snug">
                    {f.q}
                  </span>
                  <span
                    className="font-mono text-xl shrink-0 transition-transform duration-300"
                    style={{
                      color: SPECTRUM[i % SPECTRUM.length],
                      transform: isOpen ? "rotate(45deg)" : "none",
                    }}
                  >
                    ＋
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 sm:pb-8 text-sm sm:text-base leading-relaxed text-[var(--color-hitoiro-mute)]">
                    {f.a}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 9. CTA / Footer ───────────────────────── */
function Cta() {
  const links = [
    { label: "LINEで相談する", url: "https://line.me/", primary: true },
    { label: "メールで問い合わせ", url: "mailto:info@goodcast.co.jp", primary: false },
    { label: "オンラインで日程を予約", url: "https://calendly.com/", primary: false },
  ];
  return (
    <section
      id="contact"
      className="relative px-6 sm:px-10 lg:px-16 py-32 sm:py-48 overflow-hidden text-[var(--color-hitoiro-paper)]"
      style={{ background: "var(--color-hitoiro-ink)" }}
    >
      <div
        aria-hidden
        className="absolute -bottom-40 -left-20 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{
          background:
            "conic-gradient(from 0deg, #8338ec, #3a86ff, #2ec4b6, #f0a500, #e94560, #8338ec)",
        }}
      />
      <div className="relative max-w-5xl mx-auto">
        <Reveal>
          <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[1.05] mb-12 tracking-tight font-medium">
            あなたの色は、
            <br />
            何色ですか。
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base sm:text-lg opacity-70 mb-16 max-w-xl leading-relaxed">
            まずは無料相談から。あなたの想いを聞かせてください。
            一枚に込める「色」を、一緒に見つけます。
          </p>
        </Reveal>
        <div className="space-y-px max-w-2xl" style={{ background: "rgba(250,250,247,0.15)" }}>
          {links.map((l, i) => (
            <Reveal key={l.label} delay={i * 0.08}>
              <a
                href={l.url}
                target={l.url.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center justify-between px-6 sm:px-10 py-6 sm:py-8 transition-all hover:px-8 sm:hover:px-12"
                style={{
                  background: l.primary ? SPECTRUM[0] : "var(--color-hitoiro-ink)",
                  color: l.primary ? "#fff" : "var(--color-hitoiro-paper)",
                }}
              >
                <span className="flex items-baseline gap-4 sm:gap-8">
                  <span
                    className="font-mono text-[10px] tracking-[0.3em] opacity-60"
                    style={{ color: l.primary ? "#fff" : SPECTRUM[i % SPECTRUM.length] }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-light">
                    {l.label}
                  </span>
                </span>
                <span className="font-mono text-sm tracking-widest transition-transform group-hover:translate-x-2">
                  →
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <footer className="mt-32 pt-12 border-t" style={{ borderColor: "rgba(250,250,247,0.15)" }}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            <div>
              <div className="font-mono text-[10px] tracking-[0.4em] mb-3 opacity-70">
                HITOIRO by goodcast
              </div>
              <div className="font-serif text-2xl">あなたの色を、一枚に。</div>
            </div>
            <nav className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] tracking-[0.2em] opacity-70">
              <a href="#pricing" className="hover:opacity-100">料金</a>
              <a href="#showcase" className="hover:opacity-100">実績</a>
              <Link href="/legal/terms" className="hover:opacity-100">利用規約</Link>
              <Link href="/legal/privacy" className="hover:opacity-100">プライバシー</Link>
              <Link href="/legal/tokushoho" className="hover:opacity-100">特商法表記</Link>
            </nav>
          </div>
          <div className="mt-10 font-mono text-[10px] tracking-[0.3em] opacity-50">
            © {new Date().getFullYear()} 株式会社グッドキャスト — ALL RIGHTS RESERVED
          </div>
        </footer>
      </div>
    </section>
  );
}

export default function MarketingPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Problem />
      <Solution />
      <Values />
      <Showcase />
      <Pricing />
      <Comparison />
      <Faq />
      <Cta />
    </main>
  );
}
