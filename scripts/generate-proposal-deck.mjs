// ヒトイロ 営業資料(.pptx)生成スクリプト
// 実行: node scripts/generate-proposal-deck.mjs
// 出力: templates/営業資料.pptx
//
// 料金はsrc/data/pricing.tsが単一の真実の源。改定時はこのファイルの
// ONE_TIME_PLANS / MONTHLY_PLANSも手動で追従させること（docs/料金表.mdと同様のミラー運用）。

import pptxgen from "pptxgenjs";
import QRCode from "qrcode";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const INK = "0A0A0A";
const PAPER = "FAFAF7";
const MUTE = "71717A";
const MUTE_LIGHT = "A1A1AA";
const SPECTRUM = ["E94560", "F0A500", "2EC4B6", "3A86FF", "8338EC"];

const FONT_SERIF = "游明朝";
const FONT_SANS = "游ゴシック";
const FONT_MONO = "Consolas";

const SITE_URL = "https://lp-meishi-vert.vercel.app/";

const ONE_TIME_PLANS = [
  {
    name: "スタンダード",
    price: "¥100,000〜",
    tagline: "まずは一枚、自分の色を。",
    features: ["オーダーメイドLP（全8セクション）", "NFCカード 1枚", "プロによるコピーライティング", "スマホ最適化"],
  },
  {
    name: "プレミアム",
    price: "¥200,000〜",
    tagline: "世界観まで、作り込む。",
    recommended: true,
    features: ["スタンダードの全内容", "完全オリジナルデザイン", "NFCカード 3枚", "写真ディレクション"],
  },
  {
    name: "エグゼクティブ",
    price: "¥350,000〜",
    tagline: "ブランドの、顔になる一枚。",
    features: ["プレミアムの全内容", "NFCカード 5枚", "プロカメラマン手配", "専属ディレクター伴走"],
  },
];

const MONTHLY_PLANS = [
  { name: "ベーシック", price: "¥980 / 月", features: ["ホスティング・SSL維持", "軽微な修正（年2回）"] },
  {
    name: "スタンダード",
    price: "¥2,980 / 月",
    recommended: true,
    features: ["テキスト・写真修正（月1回）", "アクセスレポート", "SNS・実績の随時追加"],
  },
  { name: "アクティブ", price: "¥5,980 / 月", features: ["構成変更（月1回）", "詳細解析＋改善提案", "優先サポート"] },
];

const pptx = new pptxgen();
pptx.defineLayout({ name: "HITOIRO", width: 13.333, height: 7.5 });
pptx.layout = "HITOIRO";

const MARGIN_X = 0.75;
const CONTENT_W = 13.333 - MARGIN_X * 2;

function newSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: PAPER };
  return slide;
}

/** 表紙・章扉以外の全スライド共通のヘッダー（no/en/jp ラベル + 見出し） */
function addHeader(slide, { no, en, jp, headline, headlineSize = 30 }) {
  slide.addText(`${no} — ${en}`, {
    x: MARGIN_X,
    y: 0.5,
    w: 6,
    h: 0.35,
    fontFace: FONT_MONO,
    fontSize: 10,
    color: INK,
    charSpacing: 2,
  });
  slide.addText(jp, {
    x: 13.333 - MARGIN_X - 6,
    y: 0.5,
    w: 6,
    h: 0.35,
    align: "right",
    fontFace: FONT_MONO,
    fontSize: 10,
    color: MUTE,
    charSpacing: 2,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: MARGIN_X,
    y: 0.95,
    w: CONTENT_W,
    h: 0,
    line: { color: INK, width: 0.5, transparency: 85 },
  });
  slide.addText(headline, {
    x: MARGIN_X,
    y: 1.2,
    w: CONTENT_W,
    h: 1.6,
    fontFace: FONT_SERIF,
    fontSize: headlineSize,
    bold: true,
    color: INK,
    lineSpacing: headlineSize * 1.25,
  });
}

function addFooter(slide, pageNo) {
  slide.addText("HITOIRO", {
    x: MARGIN_X,
    y: 7.05,
    w: 4,
    h: 0.3,
    fontFace: FONT_MONO,
    fontSize: 8,
    color: MUTE_LIGHT,
    charSpacing: 2,
  });
  slide.addText(String(pageNo).padStart(2, "0"), {
    x: 13.333 - MARGIN_X - 1,
    y: 7.05,
    w: 1,
    h: 0.3,
    align: "right",
    fontFace: FONT_MONO,
    fontSize: 8,
    color: MUTE_LIGHT,
  });
}

/* ───────────── 1. 表紙 ───────────── */
{
  const slide = newSlide();

  // 右上に多色のにじみ（半透明の円を重ねる）
  const blobCenterX = 11.5;
  const blobCenterY = 1.0;
  SPECTRUM.forEach((color, i) => {
    const size = 3.2 - i * 0.35;
    slide.addShape(pptx.ShapeType.ellipse, {
      x: blobCenterX - size / 2 + i * 0.15,
      y: blobCenterY - size / 2 + i * 0.1,
      w: size,
      h: size,
      fill: { color, transparency: 78 },
      line: { type: "none" },
    });
  });

  slide.addText([{ text: "HITOIRO", options: { color: INK } }, { text: "  by goodcast", options: { color: MUTE } }], {
    x: MARGIN_X,
    y: 0.55,
    w: 8,
    h: 0.4,
    fontFace: FONT_MONO,
    fontSize: 12,
    charSpacing: 3,
  });

  slide.addText("ご提案資料", {
    x: MARGIN_X,
    y: 2.5,
    w: 6,
    h: 0.35,
    fontFace: FONT_MONO,
    fontSize: 11,
    color: MUTE,
    charSpacing: 3,
  });

  slide.addText("その日出会った10人のうち、\n本当につながれたのは、\n何人ですか。", {
    x: MARGIN_X,
    y: 2.9,
    w: 10.5,
    h: 3,
    fontFace: FONT_SERIF,
    fontSize: 44,
    bold: true,
    color: INK,
    lineSpacing: 56,
  });

  slide.addText("完全オーダーメイド LP型デジタル名刺「ヒトイロ」— ご提案資料", {
    x: MARGIN_X,
    y: 6.55,
    w: 10,
    h: 0.35,
    fontFace: FONT_SANS,
    fontSize: 11,
    color: MUTE,
  });

  addFooter(slide, 1);
}

/* ───────────── 2. インサイト ───────────── */
{
  const slide = newSlide();
  addHeader(slide, {
    no: "01",
    en: "INSIGHT",
    jp: "本質",
    headline: "名刺交換の瞬間ではなく、\nその「翌日」が、商談を決めている。",
  });

  slide.addText(
    "交流会で名刺を交換した瞬間には、まだ何も決まっていません。数日後、フォローの連絡をした時に「ああ、あの人か」と思い出してもらえるか。それとも、そこで終わるか。ほとんどの人は、その一番大事な瞬間に、名前と肩書きしか書かれていない記憶と、テキストだけのメッセージしか持っていません。",
    {
      x: MARGIN_X,
      y: 3.0,
      w: 7.6,
      h: 1.7,
      fontFace: FONT_SANS,
      fontSize: 14,
      color: MUTE,
      lineSpacing: 24,
    }
  );

  // タイムライン（出会う → フォロー(勝負) → 商談）。横幅いっぱいに使い、本文とは十分な余白をとる
  const steps = [
    { label: "出会う", sub: "名刺交換", accent: false },
    { label: "フォローの連絡", sub: "＝勝負の瞬間", accent: true },
    { label: "商談・成約", sub: "", accent: false },
  ];
  const tlY = 5.45;
  const tlX = MARGIN_X;
  const tlW = CONTENT_W;
  const stepW = tlW / 3;
  slide.addShape(pptx.ShapeType.line, {
    x: tlX + stepW / 2,
    y: tlY + 0.18,
    w: tlW - stepW,
    h: 0,
    line: { color: MUTE_LIGHT, width: 1 },
  });
  steps.forEach((s, i) => {
    const cx = tlX + stepW * i + stepW / 2;
    slide.addShape(pptx.ShapeType.ellipse, {
      x: cx - 0.18,
      y: tlY,
      w: 0.36,
      h: 0.36,
      fill: { color: s.accent ? SPECTRUM[0] : PAPER },
      line: { color: s.accent ? SPECTRUM[0] : MUTE_LIGHT, width: 1.75 },
    });
    slide.addText(s.label, {
      x: cx - stepW / 2,
      y: tlY + 0.48,
      w: stepW,
      h: 0.4,
      align: "center",
      fontFace: FONT_SANS,
      fontSize: 14,
      bold: s.accent,
      color: s.accent ? SPECTRUM[0] : INK,
    });
    slide.addText(s.sub || " ", {
      x: cx - stepW / 2,
      y: tlY + 0.88,
      w: stepW,
      h: 0.3,
      align: "center",
      fontFace: FONT_MONO,
      fontSize: 9.5,
      color: MUTE,
    });
  });

  addFooter(slide, 2);
}

/* ───────────── 3. 課題 ───────────── */
{
  const slide = newSlide();
  addHeader(slide, { no: "02", en: "THE PROBLEM", jp: "課題 / PAIN", headline: "その名刺、\nあなたを語れていますか。" });

  const problems = [
    { title: "後で見返したら、誰だっけ。", body: "もらった名刺の束。名前と顔と仕事が、一週間で曖昧になる。" },
    { title: "紙一枚に、情報が収まらない。", body: "肩書き・実績・SNS・想い。本当に伝えたいことは、紙には載らない。" },
    { title: "印象に、残らない。", body: "みんな同じレイアウト。あなたの「らしさ」は、どこにも出ていない。" },
  ];
  const colW = CONTENT_W / 3 - 0.3;
  problems.forEach((p, i) => {
    const x = MARGIN_X + i * (colW + 0.45);
    slide.addText(String(i + 1).padStart(2, "0"), {
      x,
      y: 3.2,
      w: colW,
      h: 0.4,
      fontFace: FONT_MONO,
      fontSize: 12,
      color: SPECTRUM[i],
      charSpacing: 2,
    });
    slide.addText(p.title, {
      x,
      y: 3.65,
      w: colW,
      h: 1.0,
      fontFace: FONT_SERIF,
      fontSize: 17,
      bold: true,
      color: INK,
      lineSpacing: 22,
    });
    slide.addText(p.body, {
      x,
      y: 4.65,
      w: colW,
      h: 1.6,
      fontFace: FONT_SANS,
      fontSize: 12,
      color: MUTE,
      lineSpacing: 19,
    });
  });

  addFooter(slide, 3);
}

/* ───────────── 4. 解決策 ───────────── */
{
  const slide = newSlide();
  addHeader(slide, {
    no: "03",
    en: "THE SOLUTION",
    jp: "体験 / EXPERIENCE",
    headline: "ヒトイロは、\n「その後」を制する一枚。",
  });

  slide.addText("NFCカードをかざすだけで、あなた専用のページが開く。フォローの連絡が、最高の自己紹介になる。", {
    x: MARGIN_X,
    y: 2.95,
    w: CONTENT_W,
    h: 0.5,
    fontFace: FONT_SANS,
    fontSize: 13,
    color: MUTE,
  });

  const steps = [
    { n: "STEP 01", title: "かざす", body: "スマホにNFCカードをタッチ。アプリもQR読み取りの手間もいらない。" },
    { n: "STEP 02", title: "ひらく", body: "一瞬で、あなた専用のLPが立ち上がる。物語のように、人柄が伝わる。" },
    { n: "STEP 03", title: "つながる", body: "SNS・予約・連絡先までワンタップ。出会いが、その場でご縁になる。" },
  ];
  const colW = CONTENT_W / 3 - 0.3;
  steps.forEach((s, i) => {
    const x = MARGIN_X + i * (colW + 0.45);
    slide.addText(s.n, {
      x,
      y: 3.9,
      w: colW,
      h: 0.35,
      fontFace: FONT_MONO,
      fontSize: 10,
      color: SPECTRUM[i],
      charSpacing: 2,
    });
    slide.addText(s.title, {
      x,
      y: 4.25,
      w: colW,
      h: 0.6,
      fontFace: FONT_SERIF,
      fontSize: 24,
      bold: true,
      color: INK,
    });
    slide.addText(s.body, {
      x,
      y: 4.9,
      w: colW,
      h: 1.4,
      fontFace: FONT_SANS,
      fontSize: 12,
      color: MUTE,
      lineSpacing: 18,
    });
    slide.addShape(pptx.ShapeType.rect, {
      x,
      y: 3.75,
      w: 0.5,
      h: 0.04,
      fill: { color: SPECTRUM[i] },
      line: { type: "none" },
    });
    if (i < 2) {
      slide.addText("→", {
        x: x + colW + 0.05,
        y: 4.3,
        w: 0.35,
        h: 0.5,
        align: "center",
        fontFace: FONT_SANS,
        fontSize: 20,
        color: MUTE_LIGHT,
      });
    }
  });

  addFooter(slide, 4);
}

/* ───────────── 5. 比較 ───────────── */
{
  const slide = newSlide();
  addHeader(slide, { no: "04", en: "COMPARISON", jp: "比較 / VS.", headline: "何が違うのか、\n一目でわかるように。" });

  const rows = [
    ["", "紙の名刺", "リンク集", "ヒトイロ"],
    ["デザインの自由度", "△ 定型", "△ テンプレート", "◎ 完全オーダーメイド"],
    ["伝えられる情報量", "× 限られる", "○ リンク集", "◎ 物語として展開"],
    ["第一印象・体験", "△ ふつう", "△ 一覧表示", "◎ かざす驚き"],
    ["公開後の更新・保守", "× 刷り直し", "○ 自分で編集", "◎ 月額でプロが対応"],
    ["あなたらしさ", "× 横並び", "△ 共通UI", "◎ あなたの色"],
  ];

  const tableRows = rows.map((row, ri) =>
    row.map((cell, ci) => ({
      text: cell,
      options: {
        fontFace: ri === 0 ? FONT_MONO : FONT_SANS,
        fontSize: ri === 0 ? 10 : 12,
        color: ci === 3 && ri > 0 ? INK : ri === 0 ? MUTE : ci === 0 ? INK : MUTE,
        bold: ci === 3,
        fill: ci === 3 ? { color: "FDF4E3" } : { color: PAPER },
        align: ci === 0 ? "left" : "center",
        valign: "middle",
      },
    }))
  );

  slide.addTable(tableRows, {
    x: MARGIN_X,
    y: 3.0,
    w: CONTENT_W,
    h: 3.3,
    colW: [3.0, 2.9, 2.9, 3.033],
    border: { type: "solid", color: "E4E4E7", pt: 0.75 },
    autoPage: false,
  });

  addFooter(slide, 5);
}

/* ───────────── 6. なぜ私たちが作っているか ───────────── */
{
  const slide = newSlide();
  addHeader(slide, {
    no: "05",
    en: "WHY US",
    jp: "私たちについて",
    headline: "机上の空論ではなく、\n当事者が作っています。",
  });

  const people = [
    {
      name: "玉木 雄介",
      role: "ヒトイロ代表取締役 / 人材系スタートアップ執行役員CHRO",
      body: "トヨタ自動車で開発に携わった後、人材業界へ。交流会で名刺交換した相手を、後から思い出せないまま関係が終わっていく——それを何十回と経験し、本気でこの課題を解決したいと思い、ヒトイロを立ち上げました。",
      accent: SPECTRUM[3],
    },
    {
      name: "加納 斗良士",
      role: "共同創業 / 人材系スタートアップ代表",
      body: "17歳で学生起業、20歳で会社設立。現在4期目、年商10億規模の会社を経営しながら、自身も名刺交換・自己紹介の課題に向き合ってきた一人です。",
      accent: SPECTRUM[0],
    },
  ];

  const colW = CONTENT_W / 2 - 0.3;
  people.forEach((p, i) => {
    const x = MARGIN_X + i * (colW + 0.6);
    slide.addShape(pptx.ShapeType.rect, {
      x,
      y: 3.0,
      w: 0.5,
      h: 0.05,
      fill: { color: p.accent },
      line: { type: "none" },
    });
    slide.addText(p.name, {
      x,
      y: 3.15,
      w: colW,
      h: 0.55,
      fontFace: FONT_SERIF,
      fontSize: 22,
      bold: true,
      color: INK,
    });
    slide.addText(p.role, {
      x,
      y: 3.7,
      w: colW,
      h: 0.5,
      fontFace: FONT_SANS,
      fontSize: 11,
      color: p.accent,
      bold: true,
    });
    slide.addText(p.body, {
      x,
      y: 4.25,
      w: colW,
      h: 2.2,
      fontFace: FONT_SANS,
      fontSize: 12,
      color: MUTE,
      lineSpacing: 19,
    });
  });

  addFooter(slide, 6);
}

/* ───────────── 7. 導入事例 ───────────── */
{
  const slide = newSlide();
  addHeader(slide, { no: "06", en: "CASE STUDY", jp: "実績 / WORK", headline: "一人ひとり、\n違う色になる。" });

  const caseH = 2.6;
  slide.addShape(pptx.ShapeType.rect, {
    x: MARGIN_X,
    y: 3.0,
    w: CONTENT_W,
    h: caseH,
    fill: { color: "0A2540" },
    line: { type: "none" },
  });
  SPECTRUM.forEach((color, i) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: MARGIN_X + i * (CONTENT_W / 5),
      y: 3.0 + caseH - 0.07,
      w: CONTENT_W / 5,
      h: 0.07,
      fill: { color },
      line: { type: "none" },
    });
  });
  slide.addText("CASE 01 — FOUNDER", {
    x: MARGIN_X + 0.6,
    y: 3.35,
    w: 6,
    h: 0.35,
    fontFace: FONT_MONO,
    fontSize: 10,
    color: "AEC6E8",
    charSpacing: 2,
  });
  slide.addText("加納 斗良士 様", {
    x: MARGIN_X + 0.6,
    y: 3.75,
    w: 8,
    h: 0.6,
    fontFace: FONT_SERIF,
    fontSize: 28,
    bold: true,
    color: "FFFFFF",
  });
  slide.addText("海外人材×HRテック起業家。年商10億の事業ストーリーを、一枚のLP名刺に。", {
    x: MARGIN_X + 0.6,
    y: 4.5,
    w: 9.5,
    h: 0.5,
    fontFace: FONT_SANS,
    fontSize: 13,
    color: "D8E4F0",
  });
  // 事例カードの下、余白を活かして「ヒトイロで実現できること」を3点補強
  const facts = [
    { title: "完全オーダーメイド", body: "全8セクションを、経歴・実績に合わせて設計" },
    { title: "NFC / QR両対応", body: "かざす・読み取る、どちらの導線も用意" },
    { title: "公開後も育てる", body: "月額保守で、内容を継続的にアップデート" },
  ];
  const factColW = CONTENT_W / 3 - 0.3;
  facts.forEach((f, i) => {
    const x = MARGIN_X + i * (factColW + 0.45);
    const y = 3.0 + caseH + 0.4;
    slide.addShape(pptx.ShapeType.rect, {
      x,
      y,
      w: 0.35,
      h: 0.035,
      fill: { color: SPECTRUM[i % SPECTRUM.length] },
      line: { type: "none" },
    });
    slide.addText(f.title, {
      x,
      y: y + 0.12,
      w: factColW,
      h: 0.35,
      fontFace: FONT_SERIF,
      fontSize: 14,
      bold: true,
      color: INK,
    });
    slide.addText(f.body, {
      x,
      y: y + 0.5,
      w: factColW,
      h: 0.5,
      fontFace: FONT_SANS,
      fontSize: 10.5,
      color: MUTE,
      lineSpacing: 15,
    });
  });

  slide.addText("※ 制作事例は順次公開予定。あなたが、次の一枚に。", {
    x: MARGIN_X,
    y: 6.55,
    w: CONTENT_W,
    h: 0.35,
    fontFace: FONT_MONO,
    fontSize: 9,
    color: MUTE,
    charSpacing: 1,
  });

  addFooter(slide, 7);
}

/* ───────────── 8. 料金 ───────────── */
{
  const slide = newSlide();
  addHeader(slide, {
    no: "07",
    en: "PRICING",
    jp: "料金 / PLANS",
    headline: "制作費＋月額で、育てていく。",
    headlineSize: 26,
  });

  slide.addText("INITIAL — 制作費（売り切り）", {
    x: MARGIN_X,
    y: 2.55,
    w: 6,
    h: 0.3,
    fontFace: FONT_MONO,
    fontSize: 9,
    color: MUTE,
    charSpacing: 1.5,
  });

  const colW1 = CONTENT_W / 3 - 0.25;
  ONE_TIME_PLANS.forEach((plan, i) => {
    const x = MARGIN_X + i * (colW1 + 0.375);
    const y = 2.9;
    const h = 2.0;
    slide.addShape(pptx.ShapeType.roundRect, {
      x,
      y,
      w: colW1,
      h,
      rectRadius: 0.06,
      fill: { color: plan.recommended ? INK : PAPER },
      line: { color: plan.recommended ? INK : "E4E4E7", width: 1 },
    });
    const textColor = plan.recommended ? PAPER : INK;
    slide.addText(plan.name, {
      x: x + 0.25,
      y: y + 0.2,
      w: colW1 - 0.5,
      h: 0.35,
      fontFace: FONT_SERIF,
      fontSize: 15,
      bold: true,
      color: textColor,
    });
    slide.addText(plan.tagline, {
      x: x + 0.25,
      y: y + 0.55,
      w: colW1 - 0.5,
      h: 0.3,
      fontFace: FONT_SANS,
      fontSize: 9,
      color: plan.recommended ? "C9C9C9" : MUTE,
    });
    slide.addText(plan.price, {
      x: x + 0.25,
      y: y + 0.85,
      w: colW1 - 0.5,
      h: 0.4,
      fontFace: FONT_SERIF,
      fontSize: 19,
      bold: true,
      color: textColor,
    });
    slide.addText(plan.features.map((f) => `— ${f}`).join("\n"), {
      x: x + 0.25,
      y: y + 1.3,
      w: colW1 - 0.5,
      h: 0.65,
      fontFace: FONT_SANS,
      fontSize: 8,
      color: plan.recommended ? "D9D9D9" : MUTE,
      lineSpacing: 11,
    });
  });

  slide.addText("MONTHLY — 月額保守（必須）", {
    x: MARGIN_X,
    y: 5.15,
    w: 6,
    h: 0.3,
    fontFace: FONT_MONO,
    fontSize: 9,
    color: MUTE,
    charSpacing: 1.5,
  });

  MONTHLY_PLANS.forEach((plan, i) => {
    const x = MARGIN_X + i * (colW1 + 0.375);
    const y = 5.5;
    const h = 1.35;
    slide.addShape(pptx.ShapeType.roundRect, {
      x,
      y,
      w: colW1,
      h,
      rectRadius: 0.06,
      fill: { color: PAPER },
      line: { color: "E4E4E7", width: 1 },
    });
    slide.addText(
      [
        { text: plan.name, options: { fontFace: FONT_SERIF, fontSize: 13, bold: true, color: INK } },
        plan.recommended
          ? { text: "  おすすめ", options: { fontFace: FONT_MONO, fontSize: 8, color: SPECTRUM[3] } }
          : { text: "", options: {} },
      ],
      { x: x + 0.22, y: y + 0.15, w: colW1 - 0.44, h: 0.3 }
    );
    slide.addText(plan.price, {
      x: x + 0.22,
      y: y + 0.45,
      w: colW1 - 0.44,
      h: 0.35,
      fontFace: FONT_SERIF,
      fontSize: 15,
      bold: true,
      color: INK,
    });
    slide.addText(plan.features.map((f) => `＋ ${f}`).join("\n"), {
      x: x + 0.22,
      y: y + 0.82,
      w: colW1 - 0.44,
      h: 0.5,
      fontFace: FONT_SANS,
      fontSize: 8,
      color: MUTE,
      lineSpacing: 11,
    });
  });

  addFooter(slide, 8);
}

/* ───────────── 9. 導入の流れ ───────────── */
{
  const slide = newSlide();
  addHeader(slide, { no: "08", en: "PROCESS", jp: "流れ / FLOW", headline: "ご依頼から、\n納品まで。" });

  const steps = [
    { title: "ヒアリング", body: "経歴・実績・想い・デザインの好みを丁寧にお伺いします。" },
    { title: "仮組みの確認", body: "構成・コピー・配色を仮組みしてご確認いただきます。" },
    { title: "本仕上げ", body: "承認後、実写真への差し替えと演出まで作り込みます。" },
    { title: "納品", body: "NFCカード・QRコードを発行し、LPを公開します。" },
    { title: "保守・運用", body: "月額保守プランで、公開後も内容を育てていきます。" },
  ];
  const stepW = CONTENT_W / 5 - 0.2;
  const rowY = 3.75;
  steps.forEach((s, i) => {
    const x = MARGIN_X + i * (stepW + 0.25);
    slide.addShape(pptx.ShapeType.ellipse, {
      x,
      y: rowY,
      w: 0.55,
      h: 0.55,
      fill: { color: PAPER },
      line: { color: SPECTRUM[i % SPECTRUM.length], width: 1.75 },
    });
    slide.addText(String(i + 1), {
      x,
      y: rowY,
      w: 0.55,
      h: 0.55,
      align: "center",
      valign: "middle",
      fontFace: FONT_MONO,
      fontSize: 16,
      bold: true,
      color: SPECTRUM[i % SPECTRUM.length],
    });
    slide.addText(s.title, {
      x,
      y: rowY + 0.75,
      w: stepW,
      h: 0.6,
      fontFace: FONT_SERIF,
      fontSize: 15,
      bold: true,
      color: INK,
      lineSpacing: 18,
    });
    slide.addText(s.body, {
      x,
      y: rowY + 1.4,
      w: stepW,
      h: 1.8,
      fontFace: FONT_SANS,
      fontSize: 10,
      color: MUTE,
      lineSpacing: 15,
    });
    if (i < steps.length - 1) {
      slide.addShape(pptx.ShapeType.line, {
        x: x + 0.55,
        y: rowY + 0.28,
        w: stepW - 0.3,
        h: 0,
        line: { color: MUTE_LIGHT, width: 1, dashType: "dash" },
      });
    }
  });

  addFooter(slide, 9);
}

/* ───────────── 10. CTA ───────────── */
async function buildClosingSlide() {
  const slide = newSlide();

  slide.addText("09 — CONTACT", {
    x: MARGIN_X,
    y: 0.5,
    w: 6,
    h: 0.35,
    fontFace: FONT_MONO,
    fontSize: 10,
    color: INK,
    charSpacing: 2,
  });
  slide.addText("お問い合わせ", {
    x: 13.333 - MARGIN_X - 6,
    y: 0.5,
    w: 6,
    h: 0.35,
    align: "right",
    fontFace: FONT_MONO,
    fontSize: 10,
    color: MUTE,
    charSpacing: 2,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: MARGIN_X,
    y: 0.95,
    w: CONTENT_W,
    h: 0,
    line: { color: INK, width: 0.5, transparency: 85 },
  });

  slide.addText("このメッセージ自体が、証明です。", {
    x: MARGIN_X,
    y: 1.3,
    w: CONTENT_W,
    h: 0.9,
    fontFace: FONT_SERIF,
    fontSize: 32,
    bold: true,
    color: INK,
  });

  slide.addText(
    "今読んでいただいているこの資料も、「その後のフォロー」の一つです。もしあの日の名刺交換が、ただの名刺交換で終わっていたら、この提案は届いていません。ヒトイロは、これと同じことを、あなたが交わすすべての名刺交換に起こします。",
    {
      x: MARGIN_X,
      y: 2.3,
      w: 7.0,
      h: 1.8,
      fontFace: FONT_SANS,
      fontSize: 13,
      color: MUTE,
      lineSpacing: 22,
    }
  );

  slide.addText("まずは無料相談から。", {
    x: MARGIN_X,
    y: 4.3,
    w: 7.0,
    h: 0.5,
    fontFace: FONT_SERIF,
    fontSize: 18,
    bold: true,
    color: INK,
  });

  slide.addText("お問い合わせ先", {
    x: MARGIN_X,
    y: 5.1,
    w: 4,
    h: 0.3,
    fontFace: FONT_MONO,
    fontSize: 9,
    color: MUTE,
    charSpacing: 1.5,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: MARGIN_X,
    y: 5.5,
    w: 6.5,
    h: 1.0,
    fill: { type: "none" },
    line: { color: "D4D4D8", width: 1, dashType: "dash" },
  });
  slide.addText("（ご連絡先をご記入ください）", {
    x: MARGIN_X + 0.2,
    y: 5.5,
    w: 6.1,
    h: 1.0,
    valign: "middle",
    fontFace: FONT_SANS,
    fontSize: 11,
    color: MUTE_LIGHT,
  });

  const qrDataUrl = await QRCode.toDataURL(SITE_URL, {
    margin: 1,
    color: { dark: "#0A0A0A", light: "#FAFAF700" },
    width: 480,
  });
  slide.addImage({ data: qrDataUrl, x: 9.6, y: 3.1, w: 2.1, h: 2.1 });
  slide.addText("サービス紹介はこちら", {
    x: 9.4,
    y: 5.25,
    w: 2.5,
    h: 0.3,
    align: "center",
    fontFace: FONT_MONO,
    fontSize: 8,
    color: MUTE,
    charSpacing: 1,
  });

  addFooter(slide, 10);
}

const outDir = path.join(__dirname, "..", "templates");
await buildClosingSlide();
await pptx.writeFile({ fileName: path.join(outDir, "営業資料.pptx") });
console.log("Generated:", path.join(outDir, "営業資料.pptx"));
