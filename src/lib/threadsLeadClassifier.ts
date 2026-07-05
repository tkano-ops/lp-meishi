import "server-only";
import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { z } from "zod";

const ClassificationSchema = z.object({
  isLead: z.boolean(),
  reason: z.string(),
  dmDraft: z.string().nullable(),
});

export type LeadClassification = z.infer<typeof ClassificationSchema>;

const SYSTEM_PROMPT = `あなたはヒトイロ（LP型デジタル名刺サービス）の営業アシスタントです。
ヒトイロは、NFCカード/QRコードをスマホにかざすとその人専用のランディングページが表示される、完全オーダーメイドのデジタル名刺サービスです。フリーランス・個人事業主・起業家・経営者などが、自己紹介や実績、SNSリンクを一枚のページにまとめて伝えるために使います。

これから、ヒトイロの公式Threadsアカウントの投稿に対する「リプライ」または「メンション（自分をタグ付けした他人の投稿）」の本文を渡します。この発言者が、ヒトイロ（自分専用のデジタル名刺・自己紹介LP）に興味・関心を示しているかどうかを判定してください。

【isLead = trueと判定する例】
・名刺やLPが欲しい、自分も作ってほしいと言っている
・料金や作り方、申し込み方法を尋ねている
・自分の自己紹介や名刺の悩みに言及し、興味を示している

【isLead = falseと判定する例】
・単なる挨拶、絵文字だけの反応
・ヒトイロと無関係な内容
・すでに顧客/関係者として業務連絡をしているだけ

isLead = trueの場合のみ、dmDraftに送信者への短いDM下書き（日本語、2〜4文程度）を作成してください。以下を守ること：
・相手の発言内容に具体的に触れる
・売り込み臭くならないよう、まずは軽く会話を始めるトーン
・「よろしければ」「気軽に」など柔らかい言葉遣いで、返信を強要しない
・isLead = falseの場合、dmDraftはnullにする`;

export async function classifyThreadsMessage(params: {
  authorUsername: string;
  messageText: string;
  sourceType: "reply" | "mention";
  originalPostText?: string | null;
}): Promise<LeadClassification> {
  const { authorUsername, messageText, sourceType, originalPostText } = params;

  const contextLines = [
    `種別: ${sourceType === "reply" ? "自分の投稿へのリプライ" : "自分をメンションした投稿"}`,
    `発言者: @${authorUsername}`,
    originalPostText ? `元の投稿内容: ${originalPostText}` : null,
    `発言内容: ${messageText}`,
  ].filter(Boolean);

  const { object } = await generateObject({
    model: anthropic("claude-haiku-4-5-20251001"),
    schema: ClassificationSchema,
    system: SYSTEM_PROMPT,
    prompt: contextLines.join("\n"),
  });

  return object;
}
