# クライアント作業フォルダ

各クライアント案件の **業務メモ・素材・経過記録** を置く場所。
LPの実データ（JSON）は `src/data/clients/` に、写真は `public/clients/[slug]/` に置く。

## 1案件あたりのフォルダ構成

```
clients/
└── taro-yamada/
    ├── hearing.md       ← ヒアリングメモ（雑然OK）
    ├── writing-draft.md ← ライティング下書き
    ├── assets/          ← クライアントから受領した素材
    │   ├── 写真原本.jpg
    │   ├── ロゴ.png
    │   └── 推薦文.docx
    ├── contract.pdf     ← 契約書PDF
    └── delivery.md      ← 納品メモ・URL・NFCカード送付記録
```

## 作業フロー

1. **新規案件発生** → `clients/[slug]/` を作成
2. **ヒアリング** → `/hearing` を実行、`clients/[slug]/hearing.md` に整理
3. **コピー作成** → `/writing [slug]` で `src/data/clients/[slug].json` を生成
4. **LP制作** → `/create-lp [slug]` で `src/app/[slug]/` 配下を構築
5. **レビュー** → `/review [slug]` で品質チェック
6. **納品** → NFCカード送付、`clients/[slug]/delivery.md` に記録
