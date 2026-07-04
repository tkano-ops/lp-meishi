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

> **制作は「仮組み」→「本仕上げ」の2段階で行う。** 一度に完成品まで作り込まず、
> 先に構成・コピー・配色を固めた仮組みをクライアントに見せて承認を取ってから、
> 実写真とアニメーションを加える本仕上げに進むこと（詳細は下記）。

## 手順（仮組み）
1. ヒアリング内容（`clients/{slug}/hearing.md` 等）を確認する
2. `src/lib/types.ts` の `clientDataSchema` に**完全準拠**した JSON を
   `src/data/clients/{slug}.json` に作成する（記入済み正解例 → `src/data/clients/sample.json`）
3. 写真フィールド（`hero.photo` / `breakoutImage` / `gallery` など）は**空でよい**。
   各セクションは photo が空なら自動的に非表示になるので、壊れた画像は表示されない
4. `npm run dev` を起動し `http://localhost:3000/{slug}` で構成・コピー・配色を確認する
5. `npm run build` でスキーマ検証＆ビルドが通ることを確認する
   （JSON が型に反していると `loadClient` の safeParse がエラーを出します）
6. このURLをクライアントに共有し、構成・コピー・デザインの大枠を確認してもらう
   （無料修正は2回まで。`docs/料金表.md` 参照）

## 手順（本仕上げ・仮組み承認後）
1. クライアントから受け取った実写真を `public/clients/{slug}/` に配置する
   （hero / breakout / gallery / og.png）
2. JSON の写真フィールドに実際のパスを入れる
3. スクロール演出・ホバーなど、Framer Motionによる控えめだが印象に残る動きを加える
   （既存の共通セクションで表現できる範囲に留め、slug別の分岐コードは作らない）
4. `npm run dev` / `npm run build` で再度表示・ビルドを確認する

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
