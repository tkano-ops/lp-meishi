# ヒトイロ（HITOIRO）by goodcast

> **あなたの色を、一枚に。**
> 完全オーダーメイドのLP型デジタル名刺サービス

---

## サービスとは

NFCカードをスマホにかざすと、その人専用のランディングページが立ち上がる。
紙の名刺では伝わらない「ストーリー」「実績」「人柄」を一枚で伝える、
**完全オーダーメイド** のデジタル名刺。

```
カケハシ（日本語学習）
ヒトイロ（LP名刺）         ← このプロジェクト
└── by goodcast
```

---

## クイックスタート

```bash
npm install        # 初回のみ
npm run dev        # 開発サーバー起動 → http://localhost:3000
npm run build      # 本番ビルド
npm run typecheck  # 型チェック
```

開発サーバー起動後：
- `http://localhost:3000` — ヒトイロのサービス紹介LP
- `http://localhost:3000/sample` — クライアントLPのサンプル

---

## 制作フロー（Claude Codeで完結）

詳細な運用フローは **[`運用フロー.md`](./運用フロー.md)** を参照。

| ステップ | コマンド | 何をするか |
|---|---|---|
| 1 | `/hearing [slug]` | クライアントへのヒアリング進行 |
| 2 | `/writing [slug]` | LPコピーの生成 |
| 3 | `/create-lp [slug]` | LPページの生成 |
| 4 | `/review [slug]` | 品質チェック |
| 5 | `/service-lp` | サービス紹介LP（営業用）の制作 |

### クライアントに送付する書類
- **ヒアリングシート** → [`templates/ヒアリングシート.md`](./templates/ヒアリングシート.md)（PDF化して送付）
- **案件管理テンプレ** → [`templates/案件管理シート.md`](./templates/案件管理シート.md)（社内用）

カスタムコマンドの実体は `.claude/commands/` 配下にあります。

---

## ディレクトリ構成

```
lp-meishi/
├── 📘 ドキュメント
│   ├── CLAUDE.md          ← Claude Codeへの指示書
│   ├── AGENTS.md          ← エージェント役割定義
│   ├── 事業計画書.md
│   └── 運用ガイド.md
│
├── 🤖 .claude/            ← Claude Code カスタマイズ
│   └── commands/          ← /hearing, /writing, /create-lp, /review, /service-lp
│
├── 📑 templates/          ← ヒアリングシート、案件管理シート 雛形
│
├── 💼 clients/            ← 各案件の業務メモ・素材
│   └── [slug]/
│       ├── 案件管理.md    ← templatesからコピーして進捗管理
│       ├── hearing.md     ← クライアントが記入するヒアリングシート
│       └── assets/        ← 受領素材
│
└── 🛠️ src/                ← Next.js 本体
    ├── app/
    │   ├── page.tsx              ← サービス紹介LP
    │   └── [slug]/page.tsx       ← クライアントLP（動的ルート）
    ├── components/sections/      ← LP用セクション
    ├── data/clients/             ← クライアントデータ（JSON）
    ├── lib/types.ts              ← 型定義
    └── styles/themes/            ← クライアントごとのテーマ
```

---

## 技術スタック

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS v4**
- **Framer Motion**（アニメーション）
- **Vercel**（ホスティング予定）

---

## ライセンス

Private — © goodcast
