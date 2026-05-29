import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記｜ヒトイロ",
  robots: { index: false },
};

const rows: { label: string; value: string }[] = [
  { label: "販売事業者", value: "株式会社グッドキャスト" },
  { label: "運営責任者", value: "加納 斗良士" },
  { label: "所在地", value: "【要記入】（請求があった場合は遅滞なく開示します）" },
  { label: "電話番号", value: "【要記入】（請求があった場合は遅滞なく開示します）" },
  { label: "メールアドレス", value: "info@goodcast.co.jp" },
  { label: "販売URL", value: "【要記入】（例: https://hitoiro.co.jp）" },
  {
    label: "販売価格",
    value:
      "各プランページに表示する金額（制作費 ¥100,000〜／月額保守 ¥980/月〜、いずれも税抜）。",
  },
  {
    label: "商品代金以外の必要料金",
    value: "消費税、振込手数料（お客様負担）、追加修正費（規定回数を超える場合）。",
  },
  {
    label: "お支払い方法",
    value: "銀行振込、クレジットカード（月額保守はクレジットカードによる継続課金）。",
  },
  {
    label: "お支払い時期",
    value:
      "制作費：着手時に半金、納品時に残金。月額保守：毎月、規定日に自動課金。",
  },
  {
    label: "役務の提供時期",
    value:
      "制作費入金確認後より制作開始、原則2〜4週間で公開。月額保守は契約期間中継続提供。",
  },
  {
    label: "返品・キャンセルについて",
    value:
      "役務（オーダーメイド制作）の性質上、制作着手後の制作費返金は原則承れません。月額保守は当月分をもって解約でき、日割り返金はありません。詳細は契約書に定めます。",
  },
];

export default function TokushohoPage() {
  return (
    <article>
      <h1 className="font-serif text-3xl sm:text-4xl font-medium mb-4">
        特定商取引法に基づく表記
      </h1>
      <p className="text-sm text-[var(--color-hitoiro-mute)] mb-12 leading-relaxed">
        ※ 本ページは雛形です。正式公開前に【要記入】箇所を埋め、法務確認を受けてください。
      </p>
      <dl className="divide-y divide-black/10">
        {rows.map((r) => (
          <div key={r.label} className="grid sm:grid-cols-3 gap-2 py-5">
            <dt className="font-medium text-sm">{r.label}</dt>
            <dd className="sm:col-span-2 text-sm text-[var(--color-hitoiro-mute)] leading-relaxed">
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
