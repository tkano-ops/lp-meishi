import QRCode from "qrcode";
import { oneTimePlans, monthlyPlans } from "@/data/pricing";

const SITE_URL = "https://lp-meishi-vert.vercel.app/";
const SPECTRUM = ["#e94560", "#f0a500", "#2ec4b6", "#3a86ff", "#8338ec"];

function Sheet({ children }: { children: React.ReactNode }) {
  return <section className="proposal-sheet">{children}</section>;
}

function Label({ no, en, jp }: { no: string; en: string; jp: string }) {
  return (
    <div className="flex items-start justify-between mb-10">
      <div className="font-mono text-[10px] tracking-[0.35em] text-[var(--color-hitoiro-ink)]">
        {no} — {en}
      </div>
      <div className="font-mono text-[10px] tracking-[0.35em] text-[var(--color-hitoiro-mute)]">
        {jp}
      </div>
    </div>
  );
}

export default async function ProposalPage() {
  const qrSvg = await QRCode.toString(SITE_URL, {
    type: "svg",
    margin: 1,
    color: { dark: "#0a0a0a", light: "#00000000" },
  });

  return (
    <div className="proposal-page py-10">
      <p className="proposal-no-print text-center text-xs text-[var(--color-hitoiro-mute)] mb-6">
        この資料は印刷（Ctrl+P / Cmd+P）でA4サイズに最適化されて出力されます
      </p>

      {/* 1. 表紙 */}
      <Sheet>
        <div className="h-full flex flex-col justify-between">
          <div className="font-mono text-xs tracking-[0.3em]">
            HITOIRO <span className="text-[var(--color-hitoiro-mute)]">by goodcast</span>
          </div>
          <div>
            <p className="font-mono text-xs tracking-[0.4em] text-[var(--color-hitoiro-mute)] mb-6">
              完全オーダーメイド LP型デジタル名刺
            </p>
            <h1 className="font-serif font-medium text-6xl leading-[1.15] tracking-tight">
              あなたの色を、
              <br />
              一枚に。
            </h1>
            <p className="mt-8 text-base leading-relaxed text-[var(--color-hitoiro-mute)] max-w-md">
              NFCカードをかざすだけで、あなた専用のランディングページが立ち上がる。
              テンプレートでは出せない「その人らしさ」を、一枚の名刺に。
            </p>
          </div>
          <div className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-hitoiro-mute)]">
            ご提案資料
          </div>
        </div>
      </Sheet>

      {/* 2. 課題提起 */}
      <Sheet>
        <Label no="01" en="THE PROBLEM" jp="課題 / PAIN" />
        <h2 className="font-serif text-4xl font-medium leading-[1.2] mb-16 tracking-tight">
          その名刺、
          <br />
          あなたを語れていますか。
        </h2>
        <div className="space-y-10">
          {[
            {
              n: "01",
              title: "後で見返したら、誰だっけ。",
              body: "もらった名刺の束。名前と顔と仕事が、一週間で曖昧になる。",
            },
            {
              n: "02",
              title: "紙一枚に、情報が収まらない。",
              body: "肩書き・実績・SNS・想い。本当に伝えたいことは、紙には載らない。",
            },
            {
              n: "03",
              title: "印象に、残らない。",
              body: "みんな同じレイアウト。あなたの「らしさ」は、どこにも出ていない。",
            },
          ].map((p) => (
            <div key={p.n} className="flex gap-8">
              <div className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-hitoiro-mute)] pt-1 w-8 flex-shrink-0">
                {p.n}
              </div>
              <div>
                <h3 className="font-serif text-2xl font-medium mb-2">{p.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-hitoiro-mute)]">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Sheet>

      {/* 3. 解決策・仕組み */}
      <Sheet>
        <Label no="02" en="THE SOLUTION" jp="体験 / EXPERIENCE" />
        <h2 className="font-serif text-4xl font-medium leading-[1.2] mb-16 tracking-tight">
          かざせば、
          <br />
          物語がはじまる。
        </h2>
        <div className="grid grid-cols-3 gap-8">
          {[
            { n: "STEP 01", title: "かざす", body: "スマホにNFCカードをタッチ。アプリも、QR読み取りの手間もいらない。" },
            { n: "STEP 02", title: "ひらく", body: "一瞬で、あなた専用のLPが立ち上がる。物語のように、人柄が伝わる。" },
            { n: "STEP 03", title: "つながる", body: "SNS・予約・連絡先までワンタップ。出会いが、その場でご縁になる。" },
          ].map((s, i) => (
            <div key={s.n}>
              <div className="font-mono text-[10px] tracking-[0.3em] mb-4" style={{ color: SPECTRUM[i] }}>
                {s.n}
              </div>
              <h3 className="font-serif text-2xl font-medium mb-3">{s.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-hitoiro-mute)]">{s.body}</p>
            </div>
          ))}
        </div>
      </Sheet>

      {/* 4. 選ばれる理由 */}
      <Sheet>
        <Label no="03" en="VALUE" jp="価値 / WHY HITOIRO" />
        <h2 className="font-serif text-4xl font-medium leading-[1.2] mb-16 tracking-tight">
          選ばれる、4つの理由。
        </h2>
        <div className="grid grid-cols-2 gap-x-10 gap-y-12">
          {[
            { jp: "出会いを、忘れない。", en: "MEMORABLE", body: "物語として記憶に残る。名前だけの名刺で終わらせない。" },
            { jp: "らしさを、伝える。", en: "AUTHENTIC", body: "完全オーダーメイド。あなたの色そのものをデザインする。" },
            { jp: "第一印象を、変える。", en: "STRIKING", body: "かざした瞬間の驚き。それ自体が話のきっかけになる。" },
            { jp: "自分を売るを、簡単に。", en: "EFFORTLESS", body: "渡すだけ。営業も自己紹介も、カード一枚に任せられる。" },
          ].map((v, i) => (
            <div key={v.en}>
              <div className="font-mono text-[10px] tracking-[0.35em] mb-4" style={{ color: SPECTRUM[i % SPECTRUM.length] }}>
                0{i + 1} — {v.en}
              </div>
              <h3 className="font-serif text-2xl font-medium mb-3 leading-snug">{v.jp}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-hitoiro-mute)]">{v.body}</p>
            </div>
          ))}
        </div>
      </Sheet>

      {/* 5. 導入事例 */}
      <Sheet>
        <Label no="04" en="SHOWCASE" jp="実績 / WORK" />
        <h2 className="font-serif text-4xl font-medium leading-[1.2] mb-16 tracking-tight">
          一人ひとり、
          <br />
          違う色になる。
        </h2>
        <div className="border border-black/10 rounded-2xl overflow-hidden max-w-2xl">
          <div
            className="h-40 flex items-end p-8"
            style={{
              background: "linear-gradient(135deg, #0a2540 0%, #0a2540cc 55%, #0ea5e9 100%)",
              color: "#f8fafc",
            }}
          >
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] opacity-70 mb-2">CASE 01 — FOUNDER</div>
              <div className="font-serif text-2xl font-medium">加納 斗良士 様</div>
            </div>
          </div>
          <div className="p-8">
            <p className="text-sm leading-relaxed text-[var(--color-hitoiro-mute)]">
              海外人材×HRテック起業家。年商10億の事業ストーリーを、一枚のLP名刺に。
            </p>
          </div>
        </div>
        <p className="mt-8 font-mono text-[10px] tracking-[0.3em] text-[var(--color-hitoiro-mute)]">
          ✱ 制作事例は順次公開予定。あなたが、次の一枚に。
        </p>
      </Sheet>

      {/* 6. 料金プラン */}
      <Sheet>
        <Label no="05" en="PRICING" jp="料金 / PLANS" />
        <h2 className="font-serif text-4xl font-medium leading-[1.2] mb-3 tracking-tight">
          制作費＋月額で、
          <br />
          育てていく。
        </h2>
        <p className="text-sm text-[var(--color-hitoiro-mute)] mb-10 max-w-xl leading-relaxed">
          初期制作費（売り切り）に加え、公開後も育て続けるための月額保守。作って終わりにしないのが、ヒトイロの約束です。
        </p>

        <div className="font-mono text-[10px] tracking-[0.35em] text-[var(--color-hitoiro-mute)] mb-4">
          INITIAL — 制作費（売り切り）
        </div>
        <div className="grid grid-cols-3 gap-4 mb-10">
          {oneTimePlans.map((plan) => (
            <div key={plan.id} className="border border-black/10 rounded-xl p-5">
              <div className="font-serif text-lg font-medium">{plan.name}</div>
              <div className="text-xs text-[var(--color-hitoiro-mute)] mb-3">{plan.tagline}</div>
              <div className="font-serif text-2xl font-medium mb-3">{plan.priceLabel}</div>
              <ul className="space-y-1.5 text-xs leading-relaxed">
                {plan.features.map((f) => (
                  <li key={f}>— {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="font-mono text-[10px] tracking-[0.35em] text-[var(--color-hitoiro-mute)] mb-4">
          MONTHLY — 月額保守（必須）
        </div>
        <div className="grid grid-cols-3 gap-4">
          {monthlyPlans.map((plan) => (
            <div key={plan.id} className="border border-black/10 rounded-xl p-5">
              <div className="font-serif text-lg font-medium">{plan.name}</div>
              <div className="text-xs text-[var(--color-hitoiro-mute)] mb-3">{plan.tagline}</div>
              <div className="font-serif text-xl font-medium mb-3">{plan.priceLabel}</div>
              <ul className="space-y-1.5 text-xs leading-relaxed">
                {plan.features.map((f) => (
                  <li key={f}>＋ {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[10px] text-[var(--color-hitoiro-mute)] leading-relaxed">
          ※ 表示価格は税抜。制作中の修正は2回まで無料。着手時に半金、納品時に残金をお支払いいただきます。
        </p>
      </Sheet>

      {/* 7. 導入の流れ */}
      <Sheet>
        <Label no="06" en="PROCESS" jp="流れ / FLOW" />
        <h2 className="font-serif text-4xl font-medium leading-[1.2] mb-16 tracking-tight">
          ご依頼から、
          <br />
          納品まで。
        </h2>
        <div className="space-y-8">
          {[
            { n: "01", title: "ヒアリング", body: "経歴・実績・想い・デザインの好みなどを丁寧にお伺いします。" },
            { n: "02", title: "仮組みの確認", body: "構成・コピー・配色を仮組みしてご確認いただきます（写真は仮でOK）。" },
            { n: "03", title: "本仕上げ", body: "承認後、実写真への差し替えとアニメーション演出まで作り込みます。" },
            { n: "04", title: "納品", body: "NFCカード・QRコードを発行し、LPを公開します。" },
            { n: "05", title: "保守・運用", body: "月額保守プランで、公開後も内容を育てていきます。" },
          ].map((s) => (
            <div key={s.n} className="flex gap-8 items-baseline">
              <div className="font-mono text-xs tracking-[0.3em] text-[var(--color-hitoiro-mute)] w-8 flex-shrink-0">
                {s.n}
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium mb-1">{s.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-hitoiro-mute)]">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Sheet>

      {/* 8. お問い合わせ */}
      <Sheet>
        <div className="h-full flex flex-col justify-between">
          <div>
            <Label no="07" en="CONTACT" jp="お問い合わせ" />
            <h2 className="font-serif text-4xl font-medium leading-[1.2] mb-6 tracking-tight">
              まずは、
              <br />
              無料相談から。
            </h2>
            <p className="text-sm leading-relaxed text-[var(--color-hitoiro-mute)] max-w-md">
              あなたの経歴・想い・実績をお伺いしながら、どんなLP名刺が作れるかご提案します。
              まずはお気軽にご相談ください。
            </p>
          </div>

          <div className="flex items-end justify-between">
            <div className="space-y-1 text-sm">
              <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-hitoiro-mute)] mb-3">
                お問い合わせ先
              </p>
              <p className="text-[var(--color-hitoiro-mute)]">（ここにご連絡先をご記入ください）</p>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="w-28 h-28"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
              <p className="mt-2 font-mono text-[9px] tracking-[0.2em] text-[var(--color-hitoiro-mute)]">
                サービス紹介はこちら
              </p>
            </div>
          </div>
        </div>
      </Sheet>
    </div>
  );
}
