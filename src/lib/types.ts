import { z } from "zod";

/**
 * クライアントデータのスキーマ（単一の真実の源 / SSOT）
 *
 * 型(ClientData)はこの Zod スキーマから z.infer で導出する。
 * 実行時のバリデーションは loadClient（src/app/[slug]/page.tsx）で safeParse により行い、
 * 手書き JSON の事故をビルド／本番前に止める。
 */

// 画像の共通型。caption は表示用、alt はアクセシビリティ／SEO用（無ければ caption を使う）
export const imageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().optional(),
  caption: z.string().optional(),
});

export const themeStyleSchema = z.enum(["light", "dark", "warm", "cool", "mono"]);

export const themeSchema = z.object({
  /** ブランドの主色。Hero/Achievement/Contact など濃色セクションの背景に使う */
  primary: z.string(),
  /** アクセント色。番号・ラベル・下線・CTA の差し色 */
  accent: z.string(),
  /** ページ全体の背景色 */
  background: z.string(),
  /** 本文の基本文字色（省略時は primary） */
  text: z.string().optional(),
  /** 濃色（primary 背景）セクション上の文字色。淡色 primary でも破綻しないよう明示できる（省略時 #fafaf7） */
  onPrimary: z.string().optional(),
  /** 帯セクション（Services 等）の背景色（省略時は primary の極薄） */
  surface: z.string().optional(),
  /** Vision セクションの背景色（省略時 #0a0a0a） */
  visionBackground: z.string().optional(),
  style: themeStyleSchema,
  fontHeading: z.string().optional(),
  fontBody: z.string().optional(),
});

export const heroSectionSchema = z.object({
  photo: z.string(),
  catchphrase: z.string(),
  subtitle: z.string(),
});

export const storySectionSchema = z.object({
  heading: z.string(),
  body: z.string(),
  career: z.array(z.string()).optional(),
  breakoutImage: imageSchema.optional(),
});

export const serviceSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

export const achievementSchema = z.object({
  label: z.string(),
  detail: z.string().optional(),
  date: z.string().optional(),
});

export const testimonialSchema = z.object({
  quote: z.string(),
  author: z.string(),
  authorTitle: z.string().optional(),
  photo: z.string().optional(),
});

export const snsLinkSchema = z.object({
  platform: z.enum([
    "x",
    "instagram",
    "youtube",
    "note",
    "linkedin",
    "tiktok",
    "facebook",
    "website",
  ]),
  url: z.string().url(),
  label: z.string().optional(),
});

export const contactLinkSchema = z.object({
  type: z.enum(["line", "email", "calendly", "phone", "form"]),
  url: z.string(),
  label: z.string(),
  /** 主たる導線を1つ強調するためのフラグ（true の連絡先を目立たせる） */
  primary: z.boolean().optional(),
});

export const visionSectionSchema = z.object({
  heading: z.string(),
  body: z.string(),
  backgroundImage: z.string().optional(),
});

/** SNS共有・SEO用のメタ情報。クライアントごとに最適化する */
export const metaSchema = z.object({
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

export const clientDataSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  nameKana: z.string().optional(),
  title: z.string(),
  subtitle: z.string(),
  meta: metaSchema.optional(),
  theme: themeSchema,
  sections: z.object({
    hero: heroSectionSchema,
    story: storySectionSchema,
    services: z.array(serviceSchema),
    achievements: z.array(achievementSchema),
    testimonials: z.array(testimonialSchema),
    vision: visionSectionSchema,
    gallery: z.array(imageSchema).optional(),
    sns: z.array(snsLinkSchema),
    contact: z.array(contactLinkSchema),
  }),
});

// ───────────────────────────────────────────────
// 型は全てスキーマから導出（型とランタイム検証を単一ソース化）
// ───────────────────────────────────────────────
export type ClientImage = z.infer<typeof imageSchema>;
export type ThemeStyle = z.infer<typeof themeStyleSchema>;
export type Theme = z.infer<typeof themeSchema>;
export type HeroSection = z.infer<typeof heroSectionSchema>;
export type StorySection = z.infer<typeof storySectionSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type Achievement = z.infer<typeof achievementSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type SnsLink = z.infer<typeof snsLinkSchema>;
export type ContactLink = z.infer<typeof contactLinkSchema>;
export type Meta = z.infer<typeof metaSchema>;
export type ClientData = z.infer<typeof clientDataSchema>;

/** primary 背景セクション上の文字色を返すヘルパ（テーマで上書き可、既定は紙色） */
export const onPrimary = (theme: Theme): string => theme.onPrimary ?? "#fafaf7";
