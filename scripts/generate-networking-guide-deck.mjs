// 「交流会 立ち回りガイド」無料配布資料(.pptx)生成スクリプト
// 実行: node scripts/generate-networking-guide-deck.mjs
// 出力: templates/交流会立ち回りガイド.pptx
//
// 位置づけ: Threads経由で公式LINE登録を促すリードマグネット。
// 冒頭〜中盤はノウハウ中心、終盤で自然にヒトイロへ接続する構成。

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

const pptx = new pptxgen();
pptx.defineLayout({ name: "HITOIRO", width: 13.333, height: 7.5 });
pptx.layout = "HITOIRO";

const MARGIN_X = 0.75;
const CONTENT_W = 13.333 - MARGIN_X * 2;

let pageNo = 0;
let contentNo = 0;

function newSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: PAPER };
  pageNo += 1;
  return slide;
}

/** 通常コンテンツスライド共通のヘッダー（no/en/jp ラベル + 見出し） */
function addHeader(slide, { en, jp, headline, headlineSize = 30 }) {
  contentNo += 1;
  const no = String(contentNo).padStart(2, "0");
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

function addFooter(slide) {
  slide.addText("HITOIRO — 交流会 立ち回りガイド", {
    x: MARGIN_X,
    y: 7.05,
    w: 6,
    h: 0.3,
    fontFace: FONT_MONO,
    fontSize: 8,
    color: MUTE_LIGHT,
    charSpacing: 1,
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

/** 章扉スライド。中央に大きな章番号 + タイトル。 */
function addDivider({ chapter, title, sub, accent }) {
  const slide = newSlide();
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 0.12,
    fill: { color: accent },
    line: { type: "none" },
  });
  slide.addText(`CHAPTER ${chapter}`, {
    x: MARGIN_X,
    y: 2.3,
    w: CONTENT_W,
    h: 0.4,
    fontFace: FONT_MONO,
    fontSize: 12,
    color: accent,
    charSpacing: 4,
  });
  slide.addText(String(chapter).padStart(2, "0"), {
    x: MARGIN_X,
    y: 2.6,
    w: 4,
    h: 1.8,
    fontFace: FONT_SERIF,
    fontSize: 110,
    bold: true,
    color: accent,
  });
  slide.addText(title, {
    x: MARGIN_X + 3.6,
    y: 3.15,
    w: CONTENT_W - 3.6,
    h: 1.3,
    fontFace: FONT_SERIF,
    fontSize: 30,
    bold: true,
    color: INK,
    lineSpacing: 38,
  });
  slide.addText(sub, {
    x: MARGIN_X + 3.6,
    y: 4.5,
    w: CONTENT_W - 3.6,
    h: 0.8,
    fontFace: FONT_SANS,
    fontSize: 13,
    color: MUTE,
    lineSpacing: 20,
  });
  addFooter(slide);
}

/* ───────────── 1. 表紙 ───────────── */
{
  const slide = newSlide();

  SPECTRUM.forEach((color, i) => {
    const size = 3.0 - i * 0.32;
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 11.6 - size / 2 + i * 0.15,
      y: 1.0 - size / 2 + i * 0.1,
      w: size,
      h: size,
      fill: { color, transparency: 80 },
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

  slide.addText("無料ガイド", {
    x: MARGIN_X,
    y: 2.35,
    w: 6,
    h: 0.35,
    fontFace: FONT_MONO,
    fontSize: 11,
    color: MUTE,
    charSpacing: 3,
  });

  slide.addText("「名刺を配って終わる人」と\n「次の商談につながる人」の\n違いとは。", {
    x: MARGIN_X,
    y: 2.75,
    w: 11,
    h: 3.0,
    fontFace: FONT_SERIF,
    fontSize: 40,
    bold: true,
    color: INK,
    lineSpacing: 52,
  });

  slide.addText("交流会で出会った10人のうち、後日ちゃんと連絡が取れるのは何人ですか。", {
    x: MARGIN_X,
    y: 6.15,
    w: 10.5,
    h: 0.4,
    fontFace: FONT_SANS,
    fontSize: 13,
    color: MUTE,
  });

  slide.addText("交流会で成果を出すための実践ガイド", {
    x: MARGIN_X,
    y: 6.6,
    w: 10,
    h: 0.35,
    fontFace: FONT_SANS,
    fontSize: 11,
    color: MUTE_LIGHT,
  });

  addFooter(slide);
}

/* ───────────── 2. 目次 ───────────── */
{
  const slide = newSlide();
  slide.addText("CONTENTS", {
    x: MARGIN_X,
    y: 0.5,
    w: 6,
    h: 0.35,
    fontFace: FONT_MONO,
    fontSize: 10,
    color: INK,
    charSpacing: 2,
  });
  slide.addText("目次", {
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
  slide.addText("この資料の構成", {
    x: MARGIN_X,
    y: 1.2,
    w: CONTENT_W,
    h: 0.9,
    fontFace: FONT_SERIF,
    fontSize: 30,
    bold: true,
    color: INK,
  });

  const items = [
    { no: "01", title: "準備篇", body: "交流会に行く前にやること" },
    { no: "02", title: "会場篇", body: "その場での立ち回り方" },
    { no: "03", title: "失敗篇", body: "成果が出ない人の共通点" },
    { no: "04", title: "事後篇", body: "本当の勝負は、交流会が終わった後" },
    { no: "05", title: "実践ワーク", body: "明日から使えるテンプレ集" },
    { no: "—", title: "おわりに", body: "なぜ、この資料を作ったか" },
  ];
  const rowH = 0.72;
  items.forEach((item, i) => {
    const y = 2.5 + i * rowH;
    slide.addText(item.no, {
      x: MARGIN_X,
      y,
      w: 1.0,
      h: rowH,
      valign: "middle",
      fontFace: FONT_MONO,
      fontSize: 16,
      color: SPECTRUM[i % SPECTRUM.length],
    });
    slide.addText(item.title, {
      x: MARGIN_X + 1.1,
      y,
      w: 3.2,
      h: rowH,
      valign: "middle",
      fontFace: FONT_SERIF,
      fontSize: 18,
      bold: true,
      color: INK,
    });
    slide.addText(item.body, {
      x: MARGIN_X + 4.4,
      y,
      w: CONTENT_W - 4.4,
      h: rowH,
      valign: "middle",
      fontFace: FONT_SANS,
      fontSize: 13,
      color: MUTE,
    });
    if (i < items.length - 1) {
      slide.addShape(pptx.ShapeType.line, {
        x: MARGIN_X,
        y: y + rowH,
        w: CONTENT_W,
        h: 0,
        line: { color: "E4E4E7", width: 0.75 },
      });
    }
  });

  addFooter(slide);
}

/* ───────────── 3. はじめに ───────────── */
{
  const slide = newSlide();
  addHeader(slide, {
    en: "INTRO",
    jp: "はじめに",
    headline: "交流会に出ているのに、\n何も変わらない人へ。",
  });

  slide.addText(
    "毎月のように交流会や異業種交流会に参加して、名刺を何十枚と交換している。それなのに、半年経っても新しい仕事や紹介につながらない——そんな相談を、これまで何度も受けてきました。\n\n原因の多くは、話し方が下手なことではありません。会場での立ち回り方と、その後のフォローの仕方を、体系立てて教わったことがないだけです。\n\nこの資料では、交流会で「ただ名刺を配って終わる人」と「次の商談につながる人」の違いを、準備・会場・事後の3つのフェーズに分けて解説します。",
    {
      x: MARGIN_X,
      y: 3.0,
      w: CONTENT_W,
      h: 3.5,
      fontFace: FONT_SANS,
      fontSize: 14,
      color: MUTE,
      lineSpacing: 25,
    }
  );

  addFooter(slide);
}

/* ───────────── 4. 章扉: 準備篇 ───────────── */
addDivider({
  chapter: 1,
  title: "交流会に行く前に、\n勝負は始まっている。",
  sub: "自己紹介の型と、当日の目標設定を決めておくだけで、\n会場での立ち回りは大きく変わります。",
  accent: SPECTRUM[0],
});

/* ───────────── 5. 自己紹介の型 ───────────── */
{
  const slide = newSlide();
  addHeader(slide, {
    en: "SELF INTRODUCTION",
    jp: "準備 / 01",
    headline: "15秒で覚えてもらう、\n自己紹介の型。",
    headlineSize: 28,
  });

  slide.addText("交流会での自己紹介は、たった15〜20秒です。この短い時間で何を伝えるかで、印象が決まります。", {
    x: MARGIN_X,
    y: 2.85,
    w: CONTENT_W,
    h: 0.5,
    fontFace: FONT_SANS,
    fontSize: 13,
    color: MUTE,
  });

  const parts = [
    { title: "① 誰の役に立つ人か", body: "「〇〇業界の経営者向けに〜」など、聞き手が自分ごとにできる一言から入る。" },
    { title: "② 数字はひとつだけ", body: "実績を並べすぎない。一番伝えたい数字を、ひとつだけ選んで添える。" },
    { title: "③ 覚えやすい一言で締める", body: "「〜な人です」で終わる、記憶に残るフレーズをひとつ用意しておく。" },
  ];
  const colW = CONTENT_W / 3 - 0.3;
  parts.forEach((p, i) => {
    const x = MARGIN_X + i * (colW + 0.45);
    slide.addShape(pptx.ShapeType.rect, {
      x,
      y: 3.65,
      w: 0.5,
      h: 0.05,
      fill: { color: SPECTRUM[i] },
      line: { type: "none" },
    });
    slide.addText(p.title, {
      x,
      y: 3.8,
      w: colW,
      h: 0.9,
      fontFace: FONT_SERIF,
      fontSize: 16,
      bold: true,
      color: INK,
      lineSpacing: 21,
    });
    slide.addText(p.body, {
      x,
      y: 4.6,
      w: colW,
      h: 1.8,
      fontFace: FONT_SANS,
      fontSize: 12,
      color: MUTE,
      lineSpacing: 18,
    });
  });

  addFooter(slide);
}

/* ───────────── 6. 目標設定と持ち物 ───────────── */
{
  const slide = newSlide();
  addHeader(slide, {
    en: "GOAL & CHECKLIST",
    jp: "準備 / 02",
    headline: "目標にすべきは、\n名刺の枚数ではない。",
    headlineSize: 28,
  });

  slide.addText(
    "交流会の目標を「何枚配ったか」にしてしまうと、その場限りの数合わせで終わります。目標にすべきは「後日、覚えてもらえた人数」。1人でも「あの人か」と思い出してもらえれば、その交流会は成功です。",
    {
      x: MARGIN_X,
      y: 2.85,
      w: 7.2,
      h: 2.0,
      fontFace: FONT_SANS,
      fontSize: 13,
      color: MUTE,
      lineSpacing: 22,
    }
  );

  slide.addShape(pptx.ShapeType.rect, {
    x: 8.35,
    y: 2.85,
    w: 3.9,
    h: 3.6,
    fill: { color: "FFFFFF" },
    line: { color: "E4E4E7", width: 1 },
  });
  slide.addText("持ち物チェック", {
    x: 8.6,
    y: 3.1,
    w: 3.4,
    h: 0.4,
    fontFace: FONT_MONO,
    fontSize: 10,
    color: MUTE,
    charSpacing: 1.5,
  });
  const items = ["名刺（多めに、切らさない枚数）", "名刺入れ", "話した内容を一言メモできる手帳かスマホ", "（あれば）NFC・QR付きのデジタル名刺"];
  items.forEach((item, i) => {
    const y = 3.6 + i * 0.65;
    slide.addShape(pptx.ShapeType.rect, {
      x: 8.6,
      y: y + 0.05,
      w: 0.18,
      h: 0.18,
      fill: { type: "none" },
      line: { color: SPECTRUM[i % SPECTRUM.length], width: 1.5 },
    });
    slide.addText(item, {
      x: 8.9,
      y,
      w: 3.15,
      h: 0.5,
      fontFace: FONT_SANS,
      fontSize: 11,
      color: INK,
      lineSpacing: 15,
    });
  });

  addFooter(slide);
}

/* ───────────── 7. 章扉: 会場篇 ───────────── */
addDivider({
  chapter: 2,
  title: "会場での90分が、\nその後を決める。",
  sub: "誰に、どう声をかけ、どのタイミングで名刺を渡すか。\nその場での立ち回り方を具体的に見ていきます。",
  accent: SPECTRUM[3],
});

/* ───────────── 8. 輪への入り方・声のかけ方 ───────────── */
{
  const slide = newSlide();
  addHeader(slide, {
    en: "HOW TO APPROACH",
    jp: "会場 / 01",
    headline: "会話の輪には、\n端から静かに入る。",
    headlineSize: 28,
  });

  const tips = [
    { title: "一人でいる人から", body: "すでに盛り上がっている輪より、一人で立っている人の方が話しかけやすく、感謝もされる。" },
    { title: "会話の切れ目を待つ", body: "話の途中で割り込まない。相槌が落ち着いたタイミングで「少しよろしいですか」と一声かける。" },
    { title: "最初の一言はイベントの話", body: "自己紹介より先に「今日はどんなきっかけで？」など、場に関する軽い質問から入る。" },
  ];
  const colW = CONTENT_W / 3 - 0.3;
  tips.forEach((p, i) => {
    const x = MARGIN_X + i * (colW + 0.45);
    slide.addText(String(i + 1).padStart(2, "0"), {
      x,
      y: 3.1,
      w: colW,
      h: 0.4,
      fontFace: FONT_MONO,
      fontSize: 12,
      color: SPECTRUM[i],
      charSpacing: 2,
    });
    slide.addText(p.title, {
      x,
      y: 3.55,
      w: colW,
      h: 0.9,
      fontFace: FONT_SERIF,
      fontSize: 16,
      bold: true,
      color: INK,
      lineSpacing: 21,
    });
    slide.addText(p.body, {
      x,
      y: 4.4,
      w: colW,
      h: 1.9,
      fontFace: FONT_SANS,
      fontSize: 12,
      color: MUTE,
      lineSpacing: 18,
    });
  });

  addFooter(slide);
}

/* ───────────── 9. 聞き役に回る技術 ───────────── */
{
  const slide = newSlide();
  addHeader(slide, {
    en: "ASK, DON'T PITCH",
    jp: "会場 / 02",
    headline: "自分の話す時間より、\n質問の質で覚えられる。",
    headlineSize: 27,
  });

  slide.addText(
    "自分の事業やサービスを長く話す人は、案外覚えてもらえません。相手が気持ちよく話せる質問を持っておくと、会話が弾み、印象にも残ります。",
    {
      x: MARGIN_X,
      y: 2.85,
      w: CONTENT_W,
      h: 0.6,
      fontFace: FONT_SANS,
      fontSize: 13,
      color: MUTE,
      lineSpacing: 20,
    }
  );

  const questions = [
    "今日はどんなきっかけでいらしたんですか？",
    "今、一番力を入れていることは何ですか？",
    "もし何か力になれそうなことがあれば、遠慮なく言ってください",
  ];
  questions.forEach((q, i) => {
    const y = 3.75 + i * 0.85;
    slide.addShape(pptx.ShapeType.rect, {
      x: MARGIN_X,
      y,
      w: CONTENT_W,
      h: 0.65,
      fill: { color: "FFFFFF" },
      line: { color: "E4E4E7", width: 1 },
    });
    slide.addText(`Q${i + 1}`, {
      x: MARGIN_X + 0.25,
      y,
      w: 0.7,
      h: 0.65,
      valign: "middle",
      fontFace: FONT_MONO,
      fontSize: 13,
      color: SPECTRUM[i],
    });
    slide.addText(q, {
      x: MARGIN_X + 1.0,
      y,
      w: CONTENT_W - 1.3,
      h: 0.65,
      valign: "middle",
      fontFace: FONT_SANS,
      fontSize: 14,
      color: INK,
    });
  });

  addFooter(slide);
}

/* ───────────── 10. 名刺交換のタイミングと一言 ───────────── */
{
  const slide = newSlide();
  addHeader(slide, {
    en: "WHEN TO EXCHANGE",
    jp: "会場 / 03",
    headline: "名刺は、\n会話の最後に渡す。",
    headlineSize: 30,
  });

  slide.addText(
    "会話の最初に名刺を渡すと、その後の会話が「営業モード」になりがちです。ある程度話してから交換すると、名刺そのものに会話の文脈が乗ります。渡すときは、会話の内容に絡めた一言を添えましょう。",
    {
      x: MARGIN_X,
      y: 2.85,
      w: CONTENT_W,
      h: 1.0,
      fontFace: FONT_SANS,
      fontSize: 13,
      color: MUTE,
      lineSpacing: 21,
    }
  );

  slide.addShape(pptx.ShapeType.rect, {
    x: MARGIN_X,
    y: 4.05,
    w: CONTENT_W,
    h: 2.1,
    fill: { color: "0A2540" },
    line: { type: "none" },
  });
  slide.addText("一言の例", {
    x: MARGIN_X + 0.4,
    y: 4.3,
    w: 4,
    h: 0.35,
    fontFace: FONT_MONO,
    fontSize: 10,
    color: "AEC6E8",
    charSpacing: 2,
  });
  const examples = [
    "「先ほどの〇〇のお話、面白かったです。またぜひ聞かせてください」",
    "「同じ課題を感じているので、今度情報交換させてもらえたら嬉しいです」",
  ];
  examples.forEach((ex, i) => {
    slide.addText(ex, {
      x: MARGIN_X + 0.4,
      y: 4.75 + i * 0.7,
      w: CONTENT_W - 0.8,
      h: 0.6,
      fontFace: FONT_SERIF,
      fontSize: 15,
      color: "FFFFFF",
      lineSpacing: 20,
    });
  });

  addFooter(slide);
}

/* ───────────── 11. 章扉: 失敗篇 ───────────── */
addDivider({
  chapter: 3,
  title: "成果が出ない人には、\n共通点がある。",
  sub: "どれも「悪気なく」やってしまいがちなことばかりです。\nまず自分に当てはまっていないか確認してみてください。",
  accent: SPECTRUM[1],
});

/* ───────────── 12. 失敗あるある3つ ───────────── */
{
  const slide = newSlide();
  addHeader(slide, {
    en: "COMMON MISTAKES",
    jp: "失敗篇",
    headline: "その名刺交換、\nどこかで見た光景かもしれません。",
    headlineSize: 25,
  });

  const problems = [
    { title: "配って満足してしまう", body: "名刺を渡した瞬間に「よし、1人増えた」と満足してしまい、会話の中身が残っていない。" },
    { title: "自己紹介が長い", body: "聞かれてもいない実績まで話してしまい、相手が「早く終わらないかな」と感じている。" },
    { title: "フォローを後回しにする", body: "「後で連絡しよう」と思ったまま、名刺の束に埋もれて数週間が過ぎてしまう。" },
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
      h: 0.9,
      fontFace: FONT_SERIF,
      fontSize: 17,
      bold: true,
      color: INK,
      lineSpacing: 22,
    });
    slide.addText(p.body, {
      x,
      y: 4.55,
      w: colW,
      h: 1.9,
      fontFace: FONT_SANS,
      fontSize: 12,
      color: MUTE,
      lineSpacing: 19,
    });
  });

  addFooter(slide);
}

/* ───────────── 13. 章扉: 事後篇 ───────────── */
addDivider({
  chapter: 4,
  title: "本当の勝負は、\n交流会が終わった後。",
  sub: "会場での印象がどれだけ良くても、フォローがなければ、\nその出会いはなかったことになります。",
  accent: SPECTRUM[2],
});

/* ───────────── 14. 24時間ルール / なぜ名刺は眠るのか ───────────── */
{
  const slide = newSlide();
  addHeader(slide, {
    en: "AFTER THE EVENT",
    jp: "事後篇",
    headline: "会ってから24時間が、\n一番覚えられている瞬間。",
    headlineSize: 26,
  });

  const colW = CONTENT_W / 2 - 0.3;

  slide.addShape(pptx.ShapeType.rect, {
    x: MARGIN_X,
    y: 3.0,
    w: 0.5,
    h: 0.05,
    fill: { color: SPECTRUM[3] },
    line: { type: "none" },
  });
  slide.addText("24時間ルール", {
    x: MARGIN_X,
    y: 3.15,
    w: colW,
    h: 0.5,
    fontFace: FONT_SERIF,
    fontSize: 18,
    bold: true,
    color: INK,
  });
  slide.addText(
    "時間が経つほど、相手の記憶の中であなたは「その他大勢」になっていきます。当日か翌日中に、会話の内容に触れた一言を送るだけで、記憶に残る確率は大きく変わります。",
    {
      x: MARGIN_X,
      y: 3.75,
      w: colW,
      h: 2.5,
      fontFace: FONT_SANS,
      fontSize: 12.5,
      color: MUTE,
      lineSpacing: 20,
    }
  );

  const x2 = MARGIN_X + colW + 0.6;
  slide.addShape(pptx.ShapeType.rect, {
    x: x2,
    y: 3.0,
    w: 0.5,
    h: 0.05,
    fill: { color: SPECTRUM[0] },
    line: { type: "none" },
  });
  slide.addText("なぜ名刺は机で眠るのか", {
    x: x2,
    y: 3.15,
    w: colW,
    h: 0.5,
    fontFace: FONT_SERIF,
    fontSize: 18,
    bold: true,
    color: INK,
  });
  slide.addText(
    "紙の名刺には、名前と肩書きしか書かれていません。数日経って見返しても、どんな人だったか、なぜ話したのかを思い出すきっかけになりません。フォローの連絡自体は正しくても、思い出してもらえなければ届かないのです。",
    {
      x: x2,
      y: 3.75,
      w: colW,
      h: 2.5,
      fontFace: FONT_SANS,
      fontSize: 12.5,
      color: MUTE,
      lineSpacing: 20,
    }
  );

  addFooter(slide);
}

/* ───────────── 15. 章扉: 実践ワーク ───────────── */
addDivider({
  chapter: 5,
  title: "読むだけで終わらせない、\n明日からのテンプレ。",
  sub: "自己紹介の型と、交流会前後のチェックリストです。\nそのままメモに写して、次の交流会で使ってみてください。",
  accent: SPECTRUM[4],
});

/* ───────────── 16. 自己紹介テンプレ ───────────── */
{
  const slide = newSlide();
  addHeader(slide, {
    en: "TEMPLATE",
    jp: "実践ワーク / 01",
    headline: "そのまま埋めるだけの、\n自己紹介テンプレート。",
    headlineSize: 27,
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: MARGIN_X,
    y: 2.95,
    w: CONTENT_W,
    h: 2.7,
    fill: { color: "FFFFFF" },
    line: { color: "E4E4E7", width: 1 },
  });
  slide.addText(
    "私は［　　　　　　］向けに［　　　　　　］をしている［　　　　　　］です。\n特に［　数字・実績を1つ　］が強みで、\n「［　覚えてもらいたい一言　］な人」だと思ってもらえたら嬉しいです。",
    {
      x: MARGIN_X + 0.5,
      y: 3.35,
      w: CONTENT_W - 1.0,
      h: 1.9,
      fontFace: FONT_SERIF,
      fontSize: 18,
      color: INK,
      lineSpacing: 36,
    }
  );

  slide.addText("※ ［　］の部分を、自分の言葉で埋めて、口に出して15秒で言えるか練習してみてください。", {
    x: MARGIN_X,
    y: 5.85,
    w: CONTENT_W,
    h: 0.4,
    fontFace: FONT_SANS,
    fontSize: 11,
    color: MUTE,
  });

  addFooter(slide);
}

/* ───────────── 17. チェックリスト ───────────── */
{
  const slide = newSlide();
  addHeader(slide, {
    en: "CHECKLIST",
    jp: "実践ワーク / 02",
    headline: "交流会の前日・当日・翌日、\nやることリスト。",
    headlineSize: 27,
  });

  const columns = [
    { label: "前日", items: ["自己紹介を声に出して練習する", "名刺を切らさない枚数に補充する", "今日の目標（覚えてもらう人数）を決める"] },
    { label: "当日", items: ["一人でいる人から声をかける", "名刺は会話の最後、一言添えて渡す", "話の内容を後でメモできるようにする"] },
    { label: "翌日", items: ["24時間以内に一言フォローを送る", "会話の内容に触れて思い出してもらう", "次に会う約束・提案を1つ添える"] },
  ];
  const colW = CONTENT_W / 3 - 0.3;
  columns.forEach((col, i) => {
    const x = MARGIN_X + i * (colW + 0.45);
    slide.addShape(pptx.ShapeType.rect, {
      x,
      y: 2.9,
      w: colW,
      h: 0.5,
      fill: { color: SPECTRUM[i * 2] },
      line: { type: "none" },
    });
    slide.addText(col.label, {
      x,
      y: 2.9,
      w: colW,
      h: 0.5,
      align: "center",
      valign: "middle",
      fontFace: FONT_SERIF,
      fontSize: 16,
      bold: true,
      color: "FFFFFF",
    });
    col.items.forEach((item, j) => {
      const y = 3.65 + j * 0.9;
      slide.addShape(pptx.ShapeType.rect, {
        x,
        y: y + 0.05,
        w: 0.16,
        h: 0.16,
        fill: { type: "none" },
        line: { color: SPECTRUM[i * 2], width: 1.5 },
      });
      slide.addText(item, {
        x: x + 0.28,
        y,
        w: colW - 0.28,
        h: 0.85,
        fontFace: FONT_SANS,
        fontSize: 11.5,
        color: INK,
        lineSpacing: 16,
      });
    });
  });

  addFooter(slide);
}

/* ───────────── 18. 創業エピソード ───────────── */
{
  const slide = newSlide();
  addHeader(slide, {
    en: "WHY WE MADE THIS",
    jp: "おわりに / 01",
    headline: "この資料は、\n自分たちの失敗から生まれました。",
    headlineSize: 26,
  });

  const people = [
    {
      name: "玉木 雄介",
      role: "ヒトイロ代表取締役",
      body: "ある交流会で、ちょうど探していた業界の方と1時間近く話し込み、良い手応えを感じて名刺を交換しました。1週間後にお礼の連絡をしたところ「すみません、どなたでしたか」と一言。話の内容は覚えていても、名前と顔が一致しなかったのです。あの日の1時間は、名刺の中には残っていませんでした。",
      accent: SPECTRUM[3],
    },
    {
      name: "加納 斗良士",
      role: "ヒトイロ共同創業",
      body: "経営者としていくつもの交流会に出る中で、同じことを何度も経験しました。渡した名刺の枚数だけを数えて満足していた時期もあります。「後から思い出してもらえるかどうか」を基準にしてから、交流会での過ごし方が変わりました。",
      accent: SPECTRUM[0],
    },
  ];
  const colW = CONTENT_W / 2 - 0.3;
  people.forEach((p, i) => {
    const x = MARGIN_X + i * (colW + 0.6);
    slide.addShape(pptx.ShapeType.rect, {
      x,
      y: 2.95,
      w: 0.5,
      h: 0.05,
      fill: { color: p.accent },
      line: { type: "none" },
    });
    slide.addText(p.name, {
      x,
      y: 3.1,
      w: colW,
      h: 0.5,
      fontFace: FONT_SERIF,
      fontSize: 19,
      bold: true,
      color: INK,
    });
    slide.addText(p.role, {
      x,
      y: 3.6,
      w: colW,
      h: 0.4,
      fontFace: FONT_SANS,
      fontSize: 10.5,
      color: p.accent,
      bold: true,
    });
    slide.addText(p.body, {
      x,
      y: 4.05,
      w: colW,
      h: 2.4,
      fontFace: FONT_SANS,
      fontSize: 11.5,
      color: MUTE,
      lineSpacing: 18,
    });
  });

  addFooter(slide);
}

/* ───────────── 19. おわりに・特典案内 ───────────── */
async function buildClosingSlide() {
  const slide = newSlide();

  slide.addText("12 — CONTACT", {
    x: MARGIN_X,
    y: 0.5,
    w: 6,
    h: 0.35,
    fontFace: FONT_MONO,
    fontSize: 10,
    color: INK,
    charSpacing: 2,
  });
  slide.addText("おわりに", {
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

  slide.addText("この資料自体も、\n「その後のフォロー」の一つです。", {
    x: MARGIN_X,
    y: 1.3,
    w: CONTENT_W,
    h: 1.3,
    fontFace: FONT_SERIF,
    fontSize: 28,
    bold: true,
    color: INK,
    lineSpacing: 36,
  });

  slide.addText(
    "私たちは、名刺交換の「その後」を良くする方法を、これからもずっと考えていきます。ヒトイロは、その一つの答えとして作った、かざすだけで自己紹介が伝わるデジタル名刺です。まずは今日の資料を、次の交流会で試してみてください。",
    {
      x: MARGIN_X,
      y: 2.7,
      w: 7.0,
      h: 1.8,
      fontFace: FONT_SANS,
      fontSize: 13,
      color: MUTE,
      lineSpacing: 21,
    }
  );

  slide.addText("もっと知りたい方へ", {
    x: MARGIN_X,
    y: 4.55,
    w: 7.0,
    h: 0.35,
    fontFace: FONT_MONO,
    fontSize: 9,
    color: MUTE,
    charSpacing: 1.5,
  });
  slide.addText("このトーク画面に、そのまま返信してください。", {
    x: MARGIN_X,
    y: 4.9,
    w: 7.0,
    h: 0.5,
    fontFace: FONT_SERIF,
    fontSize: 15,
    bold: true,
    color: INK,
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: MARGIN_X,
    y: 5.55,
    w: 6.5,
    h: 0.9,
    fill: { type: "none" },
    line: { color: "D4D4D8", width: 1, dashType: "dash" },
  });
  slide.addText("「相談したい」の一言で大丈夫です。\nあなたの名刺・自己紹介を、無料で一緒に見直します。", {
    x: MARGIN_X + 0.2,
    y: 5.55,
    w: 6.1,
    h: 0.9,
    valign: "middle",
    fontFace: FONT_SANS,
    fontSize: 11,
    color: MUTE,
    lineSpacing: 16,
  });

  const qrDataUrl = await QRCode.toDataURL(SITE_URL, {
    margin: 1,
    color: { dark: "#0A0A0A", light: "#FAFAF700" },
    width: 480,
  });
  slide.addImage({ data: qrDataUrl, x: 9.6, y: 3.1, w: 2.1, h: 2.1 });
  slide.addText("サービス詳細はこちら", {
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

  addFooter(slide);
}

const outDir = path.join(__dirname, "..", "templates");
await buildClosingSlide();
await pptx.writeFile({ fileName: path.join(outDir, "交流会立ち回りガイド.pptx") });
console.log("Generated:", path.join(outDir, "交流会立ち回りガイド.pptx"));
