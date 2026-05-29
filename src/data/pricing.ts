/**
 * ヒトイロ 料金定義（単一の真実の源 / SSOT）
 *
 * 料金はこのファイルを唯一の正とする。
 * 営業LP(src/app/page.tsx)・見積書テンプレ・運用フローはここを参照すること。
 * 人間向けの料金表 docs/料金表.md はこのファイルのミラー（改定時は両方を更新）。
 */

export type OneTimePlan = {
  id: "standard" | "premium" | "executive";
  name: string;
  price: number; // 円（税抜）
  priceLabel: string;
  tagline: string;
  recommended?: boolean;
  features: string[];
};

export type MonthlyPlan = {
  id: "basic" | "standard" | "active";
  name: string;
  price: number; // 円/月（税抜）
  priceLabel: string;
  tagline: string;
  recommended?: boolean;
  features: string[];
};

/** 制作費（売り切り・初期費用） */
export const oneTimePlans: OneTimePlan[] = [
  {
    id: "standard",
    name: "スタンダード",
    price: 100000,
    priceLabel: "¥100,000〜",
    tagline: "まずは一枚、自分の色を。",
    features: [
      "オーダーメイドLP（全8セクション）",
      "NFCカード 1枚（標準デザイン A/B案から選択）",
      "プロによるコピーライティング",
      "スマホ最適化・表示速度チューニング",
      "QRコード発行",
    ],
  },
  {
    id: "premium",
    name: "プレミアム",
    price: 200000,
    priceLabel: "¥200,000〜",
    tagline: "世界観まで、作り込む。",
    recommended: true,
    features: [
      "スタンダードの全内容",
      "完全オリジナルデザイン（テーマ・配色を1から設計）",
      "NFCカード 3枚（オリジナルデザイン）",
      "写真ディレクション・素材選定サポート",
      "ギャラリー／実績セクションの追加構成",
    ],
  },
  {
    id: "executive",
    name: "エグゼクティブ",
    price: 350000,
    priceLabel: "¥350,000〜",
    tagline: "ブランドの、顔になる一枚。",
    features: [
      "プレミアムの全内容",
      "NFCカード 5枚（写真入り・高級素材オプション）",
      "プロカメラマンによる撮影手配",
      "専属ディレクターによる伴走",
      "公開後の改善提案（初回ABテスト込み）",
    ],
  },
];

/**
 * 月額保守（必須）
 * LPのホスティング・更新・サポートを継続提供する。
 * 売り切りモデルの「作って終わり」を防ぎ、ストック収益の柱になる。
 */
export const monthlyPlans: MonthlyPlan[] = [
  {
    id: "basic",
    name: "ベーシック",
    price: 980,
    priceLabel: "¥980 / 月",
    tagline: "公開し続けるための、土台。",
    features: [
      "LPホスティング・独自URL維持",
      "SSL・セキュリティ更新",
      "軽微なテキスト修正（年2回まで）",
      "メールサポート",
    ],
  },
  {
    id: "standard",
    name: "スタンダード",
    price: 2980,
    priceLabel: "¥2,980 / 月",
    tagline: "育てていく名刺へ。",
    recommended: true,
    features: [
      "ベーシックの全内容",
      "テキスト・写真修正（月1回まで）",
      "アクセスレポート（月次）",
      "SNSリンク・実績の随時追加",
    ],
  },
  {
    id: "active",
    name: "アクティブ",
    price: 5980,
    priceLabel: "¥5,980 / 月",
    tagline: "成果で語る、攻めの一枚。",
    features: [
      "スタンダードの全内容",
      "セクション追加・構成変更（月1回まで）",
      "詳細アクセス解析＋改善提案",
      "優先サポート（チャット）",
    ],
  },
];

/** 修正回数などの共通ルール */
export const pricingPolicy = {
  freeRevisions: 2, // 制作中の無料修正回数
  depositRate: 0.5, // 着手時の前金率（半金）
  monthlyRequired: true, // 月額保守は必須
};
