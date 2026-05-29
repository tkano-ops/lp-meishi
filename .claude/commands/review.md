---
description: 制作したLPの品質チェックを行う
argument-hint: <slug>
---

引数で渡されたslugのLPを品質レビューしてください。

## チェック項目

### 構成
- [ ] 全8セクションが揃っているか（Hero/Story/Services/Achievements/Testimonials/Vision/Sns/Contact）
- [ ] セクションの順番が正しいか
- [ ] CTAボタンが目立つ位置にあるか

### 表示・技術
- [ ] モバイル表示（375px）で崩れていないか
- [ ] レスポンシブ（sm/md/lg）が機能しているか
- [ ] 画像が正しく表示されるか（`/public/clients/{{slug}}/` 配置確認）
- [ ] リンク切れがないか（SNS・CTA等）
- [ ] OGP設定（title/description/og:image）が正しいか

### コンテンツ
- [ ] 誤字脱字がないか
- [ ] キャッチコピーは15文字以内か
- [ ] ストーリーは300文字以内か
- [ ] クライアントのブランドカラーが正しく反映されているか
- [ ] 「本人らしさ」が残っているか（テンプレ感が出ていないか）

### パフォーマンス
- [ ] `npm run build` が通るか
- [ ] `npm run typecheck` が通るか
- [ ] 画像が最適化されているか（next/image 使用）

## 自動検証の手順（目視に頼らない）
1. **スキーマ検証**：`npm run build` を実行。JSON が `clientDataSchema` に反していれば
   `loadClient` の safeParse がコンソールにエラーを出す（該当 slug が静的生成されない）。
2. **型チェック**：`npm run typecheck`。
3. **実機表示**：`/verify` または `/run` スキルで dev を起動し、`/{{slug}}` を
   375px / 768px / 1024px で開いてスクリーンショットを取得、表示崩れを確認する。
4. **リンク到達確認**：JSON の `sns[].url` と `contact[].url` を実際に開いて 404 がないか確認。
5. **OGP**：`/{{slug}}` の OG 画像は `opengraph-image.tsx` が動的生成する。
   `http://localhost:3000/{{slug}}/opengraph-image` を開いて画像が出ることを確認。

## 出力
- チェックリスト形式で結果を報告
- 問題があれば**修正案を具体的に**提示
- 重大な問題は即修正する（typo, リンク切れ等）
- 「本人らしさ」に関わる判断は加納さんに確認を仰ぐ
