---
description: クライアントデータから実際のLPページを生成する
argument-hint: <slug>
---

引数で渡された slug のLPを生成します。

> **重要：このプロジェクトは完全データ駆動です。**
> LPは `src/data/clients/{slug}.json` を1枚用意するだけで、`src/app/[slug]/page.tsx` が
> 自動的に描画します（`generateStaticParams` が JSON を走査してSSG化）。
> **slug別の分岐コードや `src/styles/themes/{slug}.ts` は作りません。**
> テーマ（色・フォント）は JSON の `theme` オブジェクトで完結します。
> 新規コンポーネントは原則作らず、共通セクション（`src/components/sections/`）を使ってください。

## 手順
1. ヒアリング内容（`clients/{slug}/hearing.md` 等）を確認する
2. `src/lib/types.ts` の `clientDataSchema` に**完全準拠**した JSON を
   `src/data/clients/{slug}.json` に作成する（記入済み正解例 → `src/data/clients/sample.json`）
3. 画像を `public/clients/{slug}/` に配置する（hero / breakout / gallery / og.png）
4. `npm run dev` を起動し `http://localhost:3000/{slug}` で表示確認する
5. `npm run build` でスキーマ検証＆ビルドが通ることを確認する
   （JSON が型に反していると `loadClient` の safeParse がエラーを出します）

## JSON 作成のポイント
- **theme**：`primary`（濃色背景）/`accent`（差し色）/`background`（全体背景）は必須。
  淡色・白系の primary を使う場合は `onPrimary`（濃色背景上の文字色）を明示する。
  必要に応じ `surface`（帯セクション背景）・`visionBackground`（Vision背景）も指定可。
- **meta**：`ogTitle`/`ogDescription`/`ogImage`/`keywords` を埋め、SNS共有時の見え方を最適化する（集客の生命線）。
- **contact**：主たる導線1つに `"primary": true` を付けて強調する。
- **画像**：`gallery` / `breakoutImage` は `{ src, alt, caption }`。`alt` を必ず入れる（SEO/アクセシビリティ）。
- 空でよいセクションは空配列 `[]` にする（コンポーネント側で自動的に非表示になる）。

## 制作ルール
- **モバイルファースト**（375px基準）。レスポンシブ（sm:640 / md:768 / lg:1024）。
- 画像は `next/image` で最適化（共通セクションが対応済み）。
- OGP は JSON の `meta` を埋めれば `generateMetadata` が自動反映する。

## セクション順（共通レイアウトで固定）
Hero → Story → Services → Gallery → Achievements → Testimonials → Vision → SnsLinks → Contact

## 出力
- `src/data/clients/{slug}.json`（メイン成果物）
- `public/clients/{slug}/` 配下の画像
- 原則、コードファイルは新規作成しない（共通セクションで表現できないデザイン要望が出た場合のみ、
  共通コンポーネントの拡張を検討する）
