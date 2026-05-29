# ヒトイロ（LP名刺）— Claude Code 指示書

## サービス概要
- **サービス名**: ヒトイロ（HITOIRO / 人色） by goodcast
- **キャッチコピー**: あなたの色を、一枚に。
- **事業内容**: 完全オーダーメイドのLP型デジタル名刺サービス
- **仕組み**: NFCカード/QRコードをスマホにかざすと、その人専用のランディングページが表示される
- **運営**: 株式会社グッドキャスト（カケハシと同ブランドファミリー）

## 技術スタック
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Vercel（ホスティング）
- Framer Motion（アニメーション）

## プロジェクト構成
```
src/
├── app/
│   ├── [slug]/           ← 各クライアントのLPページ（動的ルート）
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx          ← サービス紹介トップページ
├── components/
│   ├── sections/         ← LP用セクションコンポーネント
│   │   ├── HeroSection.tsx
│   │   ├── StorySection.tsx
│   │   ├── ServiceSection.tsx
│   │   ├── AchievementSection.tsx
│   │   ├── TestimonialSection.tsx
│   │   ├── VisionSection.tsx
│   │   ├── SnsLinksSection.tsx
│   │   └── ContactSection.tsx
│   ├── marketing/        ← サービス紹介LP（営業用 / src/app/page.tsx が使用）
│   └── ui/               ← 共通UIコンポーネント
├── data/
│   ├── clients/          ← クライアントごとのデータ（JSON）
│   └── pricing.ts        ← 料金の単一ソース（SSOT）
├── lib/
│   └── types.ts          ← 型定義＋Zodスキーマ（clientDataSchema）
└── app/
    └── globals.css       ← Tailwind v4 のテーマ変数（ブランド共通色・フォント）
```

> **テーマはデータ駆動**：クライアント別の色・フォントは各 JSON の `theme` オブジェクトで
> 完結する。`src/styles/themes/` のような slug 別ファイルや slug 分岐コードは**作らない**。

## LP制作ルール

### デザイン原則
- クライアントごとにブランディング・好みに合わせて完全カスタマイズ
- モバイルファースト（スマホで見ることが前提）
- スクロールで自然にストーリーが展開される構成
- アニメーションは控えめだが印象に残るものを

### LPの必須セクション（順番通り）
1. ヒーロー（写真 + キャッチコピー + 肩書き）
2. 自己紹介・ストーリー（経歴、なぜこの仕事をしているか）
3. 事業内容・サービス一覧
4. 実績・メディア出演（権威性）
5. お客様の声・推薦（信頼性）
6. ビジョン・今後の展望（共感）
7. SNSリンク集
8. お問い合わせ・予約ボタン（CTA）

### コーディング規約
- コンポーネントは再利用可能に設計する（共通セクションを使い、slug別の分岐は作らない）
- クライアントデータは `src/data/clients/` にJSON形式で管理（`clientDataSchema` に準拠）
- テーマ（色・フォント）は各 JSON の `theme` オブジェクトで管理（データ駆動）
- 料金は `src/data/pricing.ts` を単一ソースに（`docs/料金表.md` はミラー）
- 日本語コメントOK
- 画像は `/public/clients/[slug]/` に格納

## クライアントデータの形式
新しいクライアントのLPを作る際は、以下の形式のJSONを作成する：

```json
{
  "slug": "taro-yamada",
  "name": "山田 太郎",
  "title": "キャッチコピー",
  "subtitle": "肩書き・職業",
  "meta": {
    "ogTitle": "山田 太郎｜キャッチコピー",
    "ogDescription": "SNS共有時の説明文",
    "ogImage": "/clients/taro-yamada/og.png",
    "keywords": ["キーワード1", "キーワード2"]
  },
  "theme": {
    "primary": "#1a1a2e",
    "accent": "#e94560",
    "background": "#ffffff",
    "onPrimary": "#fafaf7",
    "style": "dark"
  },
  "sections": {
    "hero": { ... },
    "story": { ... },
    "services": [ ... ],
    "achievements": [ ... ],
    "testimonials": [ ... ],
    "vision": { ... },
    "gallery": [ ... ],
    "sns": [ ... ],
    "contact": [ ... ]
  }
}
```

> 厳密な定義は `src/lib/types.ts` の `clientDataSchema`、記入済みの正解例は
> `src/data/clients/sample.json`、各項目の変換ルールは `docs/ヒアリング項目マッピング.md` を参照。

## 作業フロー
1. `/hearing` でクライアントからヒアリング
2. `/writing` でLP用のコピーライティング
3. `/create-lp` でLPページを生成
4. `/review` で最終チェック
