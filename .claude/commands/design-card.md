---
description: クライアント別にNFCカードのデザイン3案＋SVGモックを生成する
argument-hint: <slug>
---

引数 `{{slug}}` のクライアント用NFCカードをデザインしてください。

## 実行ルール
**必ず `card-designer` エージェントに委譲してください**（Agentツールで `subagent_type: "card-designer"`）。
このコマンドの本体はエージェントが持っているので、ここでは委譲だけ行うこと。

エージェントへの依頼内容：
```
slug = {{slug}}

src/data/clients/{{slug}}.json と clients/{{slug}}/hearing.md（存在すれば）を読み込み、ヒトイロのカード3バリアント（A:漢字一文字 / B:タイポ / C:写真）を設計してください。

成果物：
- clients/{{slug}}/cards/brief.md
- clients/{{slug}}/cards/variant-{a,b,c}-{front,back}.svg

完了したらユーザーに「どこを開けば確認できるか」と「印刷時の注意点」を報告。
```

## 完了報告
エージェントの成果物パスを伝えて、SVGをブラウザで開いて確認するよう案内してください。
