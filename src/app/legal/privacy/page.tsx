import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー｜ヒトイロ",
  robots: { index: false },
};

const sections: { title: string; body: string[] }[] = [
  {
    title: "1. 事業者情報",
    body: [
      "株式会社グッドキャスト（以下「当社」）は、本サービス「ヒトイロ」における個人情報を、本ポリシーに従い適切に取り扱います。",
    ],
  },
  {
    title: "2. 取得する情報",
    body: [
      "お問い合わせ・契約に際してご提供いただく氏名・連絡先・経歴・写真等。",
      "LP制作のためにお預かりする掲載用情報。",
      "サイト利用状況（アクセス解析により取得する閲覧データ。個人を特定しない統計情報を含みます）。",
    ],
  },
  {
    title: "3. 利用目的",
    body: [
      "本サービスの提供・LPの制作および保守のため。",
      "お問い合わせへの対応、ご連絡のため。",
      "サービス改善および利用状況の分析のため。",
    ],
  },
  {
    title: "4. 第三者提供",
    body: [
      "当社は、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供しません。",
    ],
  },
  {
    title: "5. 外部サービスの利用",
    body: [
      "当社は、ホスティングおよびアクセス解析のために外部サービス（Vercel 等）を利用します。これらのサービスにおけるデータ取り扱いは各社のポリシーに従います。",
    ],
  },
  {
    title: "6. Cookie・アクセス解析",
    body: [
      "本サイトは、利用状況の把握のためにCookie等を用いたアクセス解析を行う場合があります。ブラウザ設定によりCookieを無効化できます。",
    ],
  },
  {
    title: "7. 開示・訂正・削除",
    body: [
      "ご本人からの個人情報の開示・訂正・利用停止・削除のご請求には、本人確認のうえ法令に従い対応します。",
    ],
  },
  {
    title: "8. お問い合わせ窓口",
    body: ["個人情報の取り扱いに関するお問い合わせ：info@goodcast.co.jp"],
  },
  {
    title: "9. 改定",
    body: [
      "本ポリシーは、必要に応じて改定することがあります。重要な変更は本サイト上で告知します。",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <article>
      <h1 className="font-serif text-3xl sm:text-4xl font-medium mb-4">
        プライバシーポリシー
      </h1>
      <p className="text-sm text-[var(--color-hitoiro-mute)] mb-12 leading-relaxed">
        ※ 本ポリシーは雛形です。正式公開前に法務確認を受けてください。制定日：【要記入】
      </p>
      <div className="space-y-10">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-serif text-lg font-medium mb-3">{s.title}</h2>
            <div className="space-y-2">
              {s.body.map((p, i) => (
                <p
                  key={i}
                  className="text-sm leading-relaxed text-[var(--color-hitoiro-mute)]"
                >
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
