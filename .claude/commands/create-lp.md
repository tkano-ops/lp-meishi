---
description: クライアントデータから実際のLPページを生成する
argument-hint: <slug>
---

引数で渡されたslugのLPページを生成してください。

## 手順
1. `src/data/clients/{{slug}}.json` を読み込む
2. テーマ設定を元に `src/styles/themes/{{slug}}.ts` を作成
3. `src/app/[slug]/page.tsx` でslugを判定してこのデータを使う実装にする
4. 必要に応じて `src/components/sections/` の共通セクションを使う or カスタム

## 制作ルール
- **モバイルファースト**（375px基準でデザイン）
- レスポンシブ（sm: 640 / md: 768 / lg: 1024）
- ページ速度重視：next/image で画像最適化、遅延読み込み
- **OGP（SNSシェア用）を必ず設定** — metadata で title/description/og:image
- Google Fonts は `next/font` で読み込み
- セクション切替に Framer Motion で控えめなアニメーション

## 必須セクション（順番厳守）
1. Hero — 写真 + キャッチコピー + 肩書き
2. Story — 自己紹介・ストーリー
3. Services — 事業内容・サービス一覧
4. Achievements — 実績・メディア出演
5. Testimonials — お客様の声・推薦
6. Vision — ビジョン・今後の展望
7. SnsLinks — SNSリンク集
8. Contact — お問い合わせ・予約ボタン（CTA）

## 出力
- `src/app/[slug]/page.tsx` を更新（slug別の分岐 or generateStaticParams）
- `src/styles/themes/{{slug}}.ts` を作成
- 必要に応じてカスタムコンポーネント
- 完了後、`npm run dev` で確認するよう案内する
