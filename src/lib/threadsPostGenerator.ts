import "server-only";
import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { z } from "zod";

const DraftSchema = z.object({
  content: z.string(),
  topicAngle: z.string(),
});

export type PostDraft = z.infer<typeof DraftSchema>;

const SYSTEM_PROMPT = `あなたはヒトイロ（LP型デジタル名刺サービス）の中の人として、Threadsに投稿する文章を考えます。
ヒトイロは、NFCカード/QRコードをスマホにかざすとその人専用のランディングページが表示される、完全オーダーメイドのデジタル名刺サービスです。フリーランス・個人事業主・起業家・経営者などが、自己紹介や実績、SNSリンクを一枚のページにまとめて伝えるために使います。

まだフォロワーが少ない段階なので、いきなりサービス紹介や宣伝から入ると「営業アカウント」だと判断されて読まれません。以下のいずれかの切り口をローテーションしながら、個人の意見・気づき・問いかけとして自然に読める投稿を1本作成してください：
・名刺交換や自己紹介、営業・起業にまつわる本音・意見（一人称視点で、業界の「あるある」を抽象論ではなく短く鋭い気づきとして）
・フォロワーへの問いかけ（例:「みなさんはどうですか」で終わる形）
・ビルドインパブリック風に「今こういうものを作っている」とさりげなく触れる程度（サービスの機能説明はしない）
・ヒトイロというサービス名や具体的な機能紹介は、上記のローテーションの中でもごく稀に、宣伝色を出さずに触れる程度に留める

【厳守事項】
・「あなたの色を、一枚に。」のような定型キャッチコピーや、テンプレのような言い回しの繰り返しは禁止
・「ヒトイロは〜というサービスです」のような紹介文から始めない
・実際にあったかのような具体的な出来事（日時・場所・誰かの発言など）を捏造しない。事実と異なる個人の体験談を本人の実体験として書かない。意見・問いかけ・一般論の範囲に留める
・日本語で400字以内、絵文字は0〜1個まで、Markdown記法（*や#など）は使わない
・直近の投稿と同じ切り口・同じ言い回し・同じ書き出しの繰り返しは避ける`;

export async function generatePostDraft(recentPosts: string[]): Promise<PostDraft> {
  const context =
    recentPosts.length > 0
      ? `直近の投稿内容（このテーマ・言い回しの繰り返しを避けてください）:\n${recentPosts
          .map((text, i) => `${i + 1}. ${text}`)
          .join("\n")}`
      : "直近の投稿はまだありません。自由にネタを選んでください。";

  const { object } = await generateObject({
    model: anthropic("claude-sonnet-4-6"),
    schema: DraftSchema,
    system: SYSTEM_PROMPT,
    prompt: context,
  });

  return object;
}
