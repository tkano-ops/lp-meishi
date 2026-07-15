"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ClientData } from "@/lib/types";

const concerns = ["肩こり・首こりが続いている", "腰のつらさを繰り返している", "猫背や反り腰が気になる", "どこへ行っても変化を感じにくい"];
const reasons = [
  ["01", "国家資格者が対応", "柔道整復師が身体の状態を確認し、根拠のある施術をご提案します。"],
  ["02", "一人ひとりに合わせる", "同じ症状でも原因はさまざま。生活習慣や姿勢まで丁寧に伺います。"],
  ["03", "通いやすい完全予約制", "11時から23時まで営業。待ち時間を抑え、仕事帰りにも通えます。"],
];
const flow = ["公式LINEからご予約", "カウンセリング・状態確認", "お身体に合わせた施術", "状態の説明・セルフケア提案"];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.65 }} className={className}>{children}</motion.div>;
}

export default function TunadeLandingPage({ data }: { data: ClientData }) {
  const services = data.sections.services;
  const testimonials = data.sections.testimonials;
  return (
    <main className="min-h-screen bg-[#fbfaf5] text-[#26372e] [font-family:Arial,'Noto_Sans_JP',sans-serif]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d9e7d4] bg-[#fbfaf5]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-3">
            <Image src="/clients/tunade/logo.png" alt="整体院繋手-つなで- ロゴ" width={42} height={42} className="rounded-full" />
            <span className="text-sm font-bold tracking-wide sm:text-base">整体院 繋手<span className="text-xs font-normal"> -つなで-</span></span>
          </a>
          <a href="#line" className="rounded-full bg-[#38664f] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#294b3b]">LINEで予約</a>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden bg-[#eef5e9] pt-16">
        <div className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-[#bcdba9]/50 blur-3xl" />
        <div className="mx-auto grid min-h-[720px] max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-[1.1fr_.9fr] md:px-8">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative z-10">
            <p className="mb-5 inline-flex rounded-full border border-[#91bd7c] bg-white/70 px-4 py-2 text-xs font-bold tracking-wider text-[#38664f]">岡崎市上里｜慢性痛・姿勢矯正に特化</p>
            <h1 className="text-[clamp(2.4rem,7vw,5.2rem)] font-bold leading-[1.18] tracking-tight [font-family:Georgia,'Noto_Serif_JP',serif]">慢性的な痛みを、<br /><span className="text-[#4f8064]">「仕方ない」</span>で<br />終わらせない。</h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-[#52665a] sm:text-lg">肩こり・首こり・腰痛、猫背・反り腰に。国家資格を持つ柔道整復師が、あなたの身体と丁寧に向き合います。</p>
            <div className="mt-8 flex flex-wrap gap-3 text-xs font-bold"><span className="rounded-full bg-white px-4 py-2">完全予約制</span><span className="rounded-full bg-white px-4 py-2">23時まで営業</span><span className="rounded-full bg-white px-4 py-2">駐車場2台</span></div>
            <a href="#line" className="mt-9 inline-flex w-full max-w-sm items-center justify-center rounded-full bg-[#38664f] px-7 py-4 font-bold text-white shadow-lg shadow-[#38664f]/20 transition hover:-translate-y-0.5">公式LINEで予約・相談する</a>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-square rounded-[42%_58%_48%_52%] bg-white p-8 shadow-xl shadow-[#38664f]/10"><Image src="/clients/tunade/logo.png" alt="手とつながりを表した整体院繋手のロゴ" fill className="object-contain p-10" priority /></div>
            <div className="absolute -bottom-5 -left-3 rounded-2xl bg-white p-4 text-sm font-bold shadow-lg">国家資格<br /><span className="text-[#4f8064]">柔道整復師 在籍</span></div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-20 sm:py-28">
        <Reveal className="mx-auto max-w-4xl text-center"><p className="text-xs font-bold tracking-[.25em] text-[#6b966d]">YOUR CONCERNS</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl [font-family:Georgia,'Noto_Serif_JP',serif]">こんなお悩みはありませんか？</h2></Reveal>
        <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">{concerns.map((item) => <Reveal key={item} className="flex items-center gap-3 rounded-2xl border border-[#dce8d7] bg-white p-5 shadow-sm"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#dcebd3] text-[#38664f]">✓</span><span className="font-bold">{item}</span></Reveal>)}</div>
        <p className="mx-auto mt-10 max-w-2xl text-center leading-8 text-[#52665a]">痛みの場所だけを見るのではなく、姿勢や身体全体のバランスから原因を探ります。</p>
      </section>

      <section className="bg-[#38664f] px-5 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-6xl"><Reveal><p className="text-xs font-bold tracking-[.25em] text-[#cbe2be]">WHY TUNADE</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl [font-family:Georgia,'Noto_Serif_JP',serif]">繋手が大切にしていること</h2></Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">{reasons.map(([num,title,body]) => <Reveal key={num} className="rounded-3xl bg-white/10 p-7 ring-1 ring-white/15"><span className="text-sm font-bold text-[#cbe2be]">{num}</span><h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-white/75">{body}</p></Reveal>)}</div>
        </div>
      </section>

      <section id="menu" className="px-5 py-20 sm:py-28"><div className="mx-auto max-w-5xl"><Reveal className="text-center"><p className="text-xs font-bold tracking-[.25em] text-[#6b966d]">MENU</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl [font-family:Georgia,'Noto_Serif_JP',serif]">施術メニュー</h2><p className="mt-4 text-[#627268]">その日の状態と目的に合わせてご提案します。</p></Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">{services.map((s) => { const [name, price] = s.title.split("｜"); return <Reveal key={s.title} className="rounded-3xl border border-[#dce8d7] bg-white p-6 shadow-sm"><div className="flex items-start justify-between gap-4"><h3 className="font-bold">{name}</h3><span className="whitespace-nowrap text-lg font-bold text-[#38664f]">{price}</span></div><p className="mt-4 text-sm leading-7 text-[#627268]">{s.description}</p></Reveal>;})}</div>
        <p className="mt-6 text-center text-xs text-[#708078]">各メニューに継続的なケアのための回数券もご用意しています。</p></div></section>

      <section className="bg-[#eef5e9] px-5 py-20 sm:py-28"><div className="mx-auto max-w-5xl"><Reveal className="text-center"><p className="text-xs font-bold tracking-[.25em] text-[#6b966d]">FLOW</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl [font-family:Georgia,'Noto_Serif_JP',serif]">初めての方へ</h2></Reveal><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{flow.map((item,i) => <Reveal key={item} className="rounded-2xl bg-white p-6 text-center shadow-sm"><span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[#38664f] text-sm font-bold text-white">{i+1}</span><h3 className="mt-4 font-bold">{item}</h3></Reveal>)}</div></div></section>

      <section className="px-5 py-20 sm:py-28"><div className="mx-auto max-w-6xl"><Reveal className="text-center"><p className="text-xs font-bold tracking-[.25em] text-[#6b966d]">VOICE</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl [font-family:Georgia,'Noto_Serif_JP',serif]">お客様の声</h2></Reveal><div className="mt-12 grid gap-6 md:grid-cols-3">{testimonials.map((voice) => <Reveal key={voice.author} className="overflow-hidden rounded-3xl border border-[#dce8d7] bg-white shadow-sm"><div className="relative aspect-[3/4]"><Image src={voice.photo!} alt={`${voice.author}の施術後の感想`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" /></div><div className="p-6"><p className="leading-7">「{voice.quote}」</p><p className="mt-4 text-xs font-bold text-[#6b7d71]">{voice.author}</p></div></Reveal>)}</div><p className="mt-6 text-center text-xs text-[#708078]">※個人の感想であり、感じ方には個人差があります。</p></div></section>

      <section className="bg-[#f4eee1] px-5 py-20 sm:py-28"><div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[.8fr_1.2fr]"><Reveal className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2rem] bg-white shadow-lg"><Image src="/clients/tunade/profile-story.png" alt="整体院繋手代表 丹羽章一郎" fill className="object-cover object-bottom" sizes="400px" /></Reveal><Reveal><p className="text-xs font-bold tracking-[.25em] text-[#6b966d]">MESSAGE</p><h2 className="mt-3 text-3xl font-bold leading-snug sm:text-4xl [font-family:Georgia,'Noto_Serif_JP',serif]">手から、笑顔の未来へ繋ぐ。</h2><p className="mt-6 leading-8 text-[#52665a]">{data.sections.story.body}</p><div className="mt-7 border-l-2 border-[#91bd7c] pl-5"><p className="text-sm text-[#6c7c72]">整体院繋手-つなで- 代表／柔道整復師</p><p className="mt-1 text-xl font-bold">丹羽 章一郎</p></div></Reveal></div></section>

      <section className="bg-[#294b3b] px-5 py-20 text-white sm:py-28"><Reveal className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold tracking-[.25em] text-[#cbe2be]">VISION</p><h2 className="mt-4 text-3xl font-bold leading-snug sm:text-5xl [font-family:Georgia,'Noto_Serif_JP',serif]">{data.sections.vision.heading}</h2><p className="mx-auto mt-7 max-w-2xl leading-8 text-white/75">{data.sections.vision.body}</p></Reveal></section>

      <section id="line" className="px-5 py-20 sm:py-28"><div className="mx-auto grid max-w-5xl gap-10 rounded-[2rem] bg-[#eef5e9] p-7 sm:p-12 md:grid-cols-[1.2fr_.8fr] md:items-center"><Reveal><p className="text-xs font-bold tracking-[.25em] text-[#6b966d]">RESERVATION</p><h2 className="mt-3 text-3xl font-bold leading-snug sm:text-4xl [font-family:Georgia,'Noto_Serif_JP',serif]">まずは公式LINEから<br />お気軽にご相談ください。</h2><p className="mt-5 leading-8 text-[#52665a]">完全予約制です。QRコードを読み取り、お名前・希望日時・お悩みをご送信ください。</p><a href="https://www.instagram.com/okazaki_seitai.tunade/" target="_blank" rel="noreferrer" className="mt-7 inline-block border-b border-[#38664f] pb-1 font-bold text-[#38664f]">Instagramで院の様子を見る →</a></Reveal><Reveal className="mx-auto rounded-3xl bg-white p-5 text-center shadow-sm"><Image src="/clients/tunade/line-qr.png" alt="整体院繋手 公式LINE QRコード" width={260} height={260} className="mx-auto" /><p className="mt-2 text-sm font-bold">QRコードを読み取って予約</p></Reveal></div></section>

      <section className="border-t border-[#dce8d7] px-5 py-16"><div className="mx-auto max-w-5xl"><h2 className="text-2xl font-bold [font-family:Georgia,'Noto_Serif_JP',serif]">店舗情報</h2><dl className="mt-7 grid gap-y-4 text-sm sm:grid-cols-[9rem_1fr]"><dt className="font-bold">院名</dt><dd>整体院繋手-つなで-</dd><dt className="font-bold">住所</dt><dd>〒444-2136 愛知県岡崎市上里2丁目20-8<br />上里ガーデンビル2階 中東</dd><dt className="font-bold">営業時間</dt><dd>11:00〜23:00</dd><dt className="font-bold">定休日</dt><dd>不定休</dd><dt className="font-bold">駐車場</dt><dd>2台あり</dd><dt className="font-bold">予約</dt><dd>完全予約制</dd></dl></div></section>

      <footer className="bg-[#203a2e] px-5 py-10 text-center text-xs text-white/60"><Image src="/clients/tunade/logo.png" alt="整体院繋手" width={64} height={64} className="mx-auto mb-4 rounded-full" /><p>整体院繋手-つなで-</p><p className="mt-2">© {new Date().getFullYear()} TUNADE</p></footer>
      <a href="#line" className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-full bg-[#38664f] px-6 py-4 text-center text-sm font-bold text-white shadow-xl md:hidden">公式LINEで予約・相談</a>
    </main>
  );
}
